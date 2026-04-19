import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Address parameter is required' },
      { status: 400 }
    );
  }

  const rapidHost = process.env.RAPIDAPI_HOST;
  const rapidKey = process.env.RAPIDAPI_KEY;

  if (!rapidKey || !rapidHost) {
    return NextResponse.json(
      { error: 'API keys are not all configured. Please ensure RAPIDAPI_HOST and RAPIDAPI_KEY are configured.' },
      { status: 500 }
    );
  }

  try {
    const valueUrl = `https://${rapidHost}/v1/properties`;

    // 1. Start the search job
    const searchRes = await fetch(valueUrl, { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidKey, 
        'X-RapidAPI-Host': rapidHost 
      },
      body: JSON.stringify({
        search: address,
        type: "sale",
        max_items: 1
      })
    });

    if (!searchRes.ok) {
      const errorText = await searchRes.text();
      throw new Error(`Zillow Search Error: ${searchRes.status} - ${errorText}`);
    }

    const searchJson = await searchRes.json();
    const jobId = searchJson.job_id || searchJson.request_id;

    if (!jobId) {
      throw new Error('Failed to initiate Zillow search (No Job ID returned)');
    }

    // 2. Poll for results (up to 5 attempts, every 2.5 seconds)
    let property = null;
    const resultsUrl = `https://${rapidHost}/v1/results/${jobId}`;

    for (let i = 0; i < 6; i++) {
        // Wait 2.5 seconds before each check
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        const res = await fetch(resultsUrl, {
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': rapidHost
            }
        });

        if (!res.ok) continue;

        const data = await res.json();
        
        if (data.status === 'finished' || data.status === 'complete' || (data.results && data.results.length > 0)) {
            const resultObj = data.results?.[0];
            property = resultObj?.property || resultObj;
            break;
        }

        if (data.status === 'failed') {
            throw new Error('Zillow search job failed on the server.');
        }
    }

    if (!property) {
      return NextResponse.json(
        { error: 'Zillow lookup timed out or property not found. Please try again in a moment.' },
        { status: 404 }
      );
    }

    // Map the deep data from Zillow Property Data API
    const payload = {
      address: property.street_address || property.address?.streetAddress || address,
      propertyType: property.home_type || property.propertyType || property.homeType || 'Single Family',
      squareFootage: property.living_area || property.livingArea || property.buildingArea || 1500,
      yearBuilt: property.year_built || property.yearBuilt || 2000,
      currentValue: property.zestimate || property.estimate || property.price || 250000,
      beds: property.bedrooms || property.beds || 3,
      baths: property.bathrooms || property.bathrooms || property.baths || 2,
    };

    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('Zillow API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import * as React from 'react';
import { Resend } from 'resend';
import LeadEmail from '@/components/LeadEmail';

/**
 * Functional API route for capturing leads and storing them in a local JSON file.
 * Now also sends an email notification via Resend.
 */
export async function POST(request: Request) {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  try {
    const data = await request.json();
    
    // 1. Log lead data to console
    console.log('Received new lead:', data);

    // 2. Storing data in a stable local directory (Internal Backup - Development only)
    if (process.env.NODE_ENV === 'development') {
      try {
        const leadsDir = path.join(process.cwd(), 'leads-data');
        try {
          await fs.access(leadsDir);
        } catch {
          await fs.mkdir(leadsDir, { recursive: true });
        }

        const leadFile = path.join(leadsDir, 'leads.json');
        let leads = [];

        try {
          const fileData = await fs.readFile(leadFile, 'utf8');
          leads = JSON.parse(fileData);
        } catch {
          // File doesn't exist yet, start with empty array
        }

        leads.push({
          ...data,
          timestamp: new Date().toISOString()
        });

        await fs.writeFile(leadFile, JSON.stringify(leads, null, 2));
      } catch (fsError) {
        console.error('Local lead saving failed:', fsError);
      }
    }

    // 3. Send Email Notification via Resend
    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);
    
    if (resend) {
      try {
        console.log('Attempting to send email via Resend...');
        const emailResponse = await resend.emails.send({
          from: "Shane's Exterior Services <onboarding@resend.dev>",
          to: ['williamwithsuperior@gmail.com'],
          subject: `🏡 New Quote Claimed: ${data.name} (${data.serviceInterested})`,
          react: React.createElement(LeadEmail, {
            name: data.name,
            phone: data.phone,
            email: data.email,
            service: data.serviceInterested,
            estimatedCost: data.estimatedCost?.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) || '$0',
            equityAdded: data.estimatedROI?.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) || '$0',
            address: data.propertySpecs?.address || 'Manual Entry / Not Provided',
            startDate: data.preferredStartDate || 'Not Specified',
          }),
        });
        console.log('Resend Response:', emailResponse);
      } catch (emailError) {
        console.error('Resend Exception caught:', emailError);
      }
    } else {
      console.warn('Skipping email: RESEND_API_KEY is not defined in environment variables.');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully. Our team will contact you shortly.' 
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to capture lead. Please try again or call us directly.' }, 
      { status: 500 }
    );
  }
}

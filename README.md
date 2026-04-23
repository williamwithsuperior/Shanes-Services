# Shane's Exterior Services

A premium Next.js 15 application for Shane's Exterior Services, featuring an interactive ROI calculator, sustainability dashboard, and a lead capture system.

## Features

- **ROI Calculator**: Real-time property data integration (via RealtyAPI/Zillow) to calculate potential home value increases from exterior upgrades.
- **Service Showcase**: High-fidelity cards for Roofing, Siding, Windows, and Gutters.
- **Sustainability Dashboard**: Interactive comparisons between "Status Quo" and "The Shane Standard" energy solutions.
- **Mobile-First Design**: Fully responsive layout with a custom mobile menu and optimized UI components.
- **Lead Capture**: Automated lead collection with email notifications via Resend.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: Resend
- **API**: RealtyAPI (Zillow Data)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/williamwithsuperior/Shanes-Services.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file based on `.env.example`:
   ```env
   RAPIDAPI_KEY=your_key_here
   RESEND_API_KEY=your_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is optimized for deployment on **Vercel**. Simply connect your GitHub repository and configure the environment variables in the Vercel dashboard.

## License

All Rights Reserved. © 2026 Shane's Exterior Services.

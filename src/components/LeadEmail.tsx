import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface LeadEmailProps {
  name: string;
  phone: string;
  email: string;
  service: string;
  estimatedCost: string;
  equityAdded: string;
  address: string;
  startDate: string;
}

export const LeadEmail = ({
  name,
  phone,
  email,
  service,
  estimatedCost,
  equityAdded,
  address,
  startDate,
}: LeadEmailProps) => (
  <Html>
    <Head />
    <Preview>New Lead: {name} - {service}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>New Quote Claimed 🏡</Heading>
        </Section>
        
        <Text style={text}>
          A new lead has just claimed a quote on the Shane&apos;s Exterior Services website.
        </Text>
        
        <Section style={section}>
          <Text style={label}>Customer Details</Text>
          <Text style={value}><strong>Name:</strong> {name}</Text>
          <Text style={value}><strong>Phone:</strong> {phone}</Text>
          <Text style={value}><strong>Email:</strong> {email}</Text>
          <Text style={value}><strong>Address:</strong> {address}</Text>
          <Text style={value}><strong>Preferred Start:</strong> {startDate}</Text>
        </Section>
        
        <Section style={section}>
          <Text style={label}>Project Estimate (Industry Standards)</Text>
          <Text style={value}><strong>Service Interested:</strong> {service}</Text>
          <Text style={value}><strong>Estimated Cost:</strong> {estimatedCost}</Text>
          <Text style={value}><strong>Projected Equity Added:</strong> {equityAdded}</Text>
        </Section>
        
        <Section style={footerSection}>
          <Text style={footer}>
            Shane&apos;s Exterior Services Lead Manager
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default LeadEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0 0 48px',
  marginBottom: '64px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden' as const,
};

const header = {
  backgroundColor: '#0f172a',
  padding: '24px',
  textAlign: 'center' as const,
};

const section = {
  padding: '0 48px',
};

const footerSection = {
  padding: '0 48px',
  marginTop: '32px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const text = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '32px 48px 0',
  margin: '0',
};

const label = {
  color: '#10b981',
  fontSize: '12px',
  fontWeight: 'bold',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginTop: '24px',
  marginBottom: '4px',
};

const value = {
  color: '#334155',
  fontSize: '15px',
  margin: '8px 0',
};

const footer = {
  color: '#94a3b8',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '48px',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '24px',
};

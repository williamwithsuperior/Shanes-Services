import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CalculatorWrapper from '@/components/CalculatorWrapper';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <CalculatorWrapper />
      <Footer />
    </main>
  );
}

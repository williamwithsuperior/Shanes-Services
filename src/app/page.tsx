import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ProjectGallery from '@/components/ProjectGallery';
import EfficiencyDashboard from '@/components/EfficiencyDashboard';
import CalculatorWrapper from '@/components/CalculatorWrapper';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <EfficiencyDashboard />
      <ProjectGallery />
      <CalculatorWrapper />
      <Footer />
    </main>
  );
}

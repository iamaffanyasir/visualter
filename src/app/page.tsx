import Image from 'next/image';
import { Header } from '@/components/Header/Header';
import { Services } from '@/components/Services/Services';
import { Features } from '@/components/Features/Features';
import { TechStack } from '@/components/TechStack/TechStack';
import { Projects } from '@/components/Projects/Projects';

export default function Home() {
  return (
    <main className="home" style={{ marginTop: '-64px' }}>
      <Header />
      <Services />
      <Features />
      <TechStack />
      <Projects />
    </main>
  );
}

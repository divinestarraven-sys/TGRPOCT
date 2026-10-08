import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BioluminescentField from './BioluminescentField';
import AuroraEffect from './AuroraEffect';
import FloatingToolbar from './FloatingToolbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cosmic-black text-moonlight-white relative bg-fiber bg-leaf-veins">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <AuroraEffect intensity={0.8} speed={0.8} />
      <BioluminescentField density={35} />
      <Navbar />
      <main id="main-content" className="relative z-10">{children}</main>
      <Footer />
      <FloatingToolbar />
    </div>
  );
}

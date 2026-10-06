import { Heart } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageTransition from '../components/PageTransition';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageMeta from '../components/PageMeta';

const PAYPAL_ME_URL = 'https://paypal.me/RavenStar562';

export default function Donate() {
  return (
    <PageTransition>
      <PageMeta
        title="Support The Green Resonance Project"
        description="Help the Garden grow. Voluntary donations support teaching time, workshops, materials and mentoring — knowledge remains freely available to all."
        path="/donate"
      />
      <div className="relative min-h-screen">
        <div className="absolute inset-0 opacity-20">
          <MyceliumNetwork nodeCount={18} />
        </div>

        {/* Hero */}
        <section className="relative pt-32 pb-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 mb-6">
              <Heart className="w-4 h-4 text-gold-sacred" />
              <span className="text-sm font-body text-gold-sacred">Voluntary support</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-gradient-gold leading-tight mb-4">
              Support The Green Resonance Project
            </h1>
            <p className="font-sacred text-gold-sacred/70 text-lg sm:text-xl tracking-wide mb-4">
              Help the Garden Grow
            </p>
            <p className="font-body text-moonlight-white/60 text-base leading-relaxed max-w-2xl mx-auto">
              Donations are entirely optional and deeply appreciated. They help cover teaching
              time, course delivery, workshops, materials, mentoring and supported projects.
            </p>
          </div>
        </section>

        {/* Donation */}
        <section className="relative pb-12 px-4">
          <div className="max-w-xl mx-auto">
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <Heart className="w-8 h-8 text-gold-sacred mx-auto mb-4" />
              <p className="font-body text-moonlight-white/60 text-sm leading-relaxed mb-6">
                Give securely through PayPal. You choose the amount — every contribution
                helps the living framework grow.
              </p>
              <a
                href={PAYPAL_ME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display text-sm tracking-widest text-cosmic-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #d4a843, #10b981)' }}
              >
                Donate with PayPal
              </a>
            </GlassCard>
          </div>
        </section>

        {/* Equal access statement */}
        <section className="relative pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-6 sm:p-8 text-center">
              <h2 className="font-display text-lg tracking-wider text-emerald-glow mb-3">
                Knowledge Remains Free
              </h2>
              <p className="font-body text-moonlight-white/60 text-sm leading-relaxed">
                A donation never unlocks the Codex, the Oracle, the workbooks or the PDFs, and it
                never changes Seed, Mycelium or Canopy status or confers community standing. All
                published knowledge stays freely and equally available to everyone. Payment only
                ever covers actual facilitation — teaching time, course delivery, workshops,
                materials and mentoring.
              </p>
            </GlassCard>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

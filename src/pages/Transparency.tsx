import { motion } from 'framer-motion';
import { Shield, Eye, Heart, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageMeta from '../components/PageMeta';

const completedItems = [
  'All framework content freely available without paywall or login',
  'Community interest forms with email confirmation (no payment)',
  '78-card Rider-Waite-Smith tarot dataset with sourced historical meanings',
  'Celtic Cross reading with Green Resonance reflections',
  'Oracle chat with AI-powered Benevolent Chaotic Archivist personality',
  'Keyword-based fallback when AI service is unavailable',
  'Members dashboard with legacy billing management preserved',
  'Ambient audio, harmonic frequencies, and resonance journal tools',
  'Full media gallery with lightbox viewing',
  'Symbolic Keys explorer with detailed individual pages',
  'Resonance Garden with Omega nine-portal zones',
  'Six Pillars, nine Portals, and Central Heart content',
  'Phoenix Principle, Ravenstar, and Rhythmic Weave pages',
  'MUSEschool, Stewardship Games, and Community pages',
  'Codex knowledge base and Resources library',
  'Email confirmation flow for all public form submissions',
  'Row-level security on all database tables',
  'Rate limiting on public endpoints',
  'Input validation and length limits on all forms',
];

const inProgressItems = [
  'Oracle tarot-symbolism integration (in-chat card draws)',
  'Expanded Oracle knowledge base with deeper framework connections',
  'Accessibility audit (keyboard navigation, screen reader, contrast)',
  'Responsive design verification across all viewport sizes',
];

const principles = [
  {
    icon: Eye,
    title: 'Open Access',
    description: 'All Green Resonance knowledge, tools, and community resources are freely available to everyone. No paywall, no tiered access, no locked content.',
  },
  {
    icon: Heart,
    title: 'Honest Communication',
    description: 'We say what is built, what is planned, and what is not yet done. No false promises, no inflated claims, no hidden conditions.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Tarot readings are stored locally in your browser, never on our servers. Form submissions use email confirmation. Database access is secured with row-level policies.',
  },
];

export default function Transparency() {
  return (
    <PageTransition>
      <PageMeta title="Transparency" description="Our commitment to open access, honest communication, and privacy — how the Green Resonance Project operates." path="/transparency" />
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/10 to-cosmic-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={450} opacity={0.04} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Eye className="w-5 h-5 text-emerald-glow" />
            <span className="font-sacred text-emerald-glow/80 text-sm tracking-[0.3em]">OPEN RECORD</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider text-gradient-harvest mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transparency
          </motion.h1>

          <motion.p
            className="font-body text-moonlight-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            An honest account of what the Green Resonance Project offers today, what we are working on, and the principles that guide us. No hidden fine print.
          </motion.p>
        </div>
      </section>

      {/* Access Policy */}
      <section className="section-padding">
        <div className="container-sacred max-w-4xl mx-auto">
          <SectionHeading title="Access Policy" subtitle="Freely available to everyone." />

          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-emerald-glow/5 border border-emerald-glow/15">
            <p className="font-body text-moonlight-white/70 leading-relaxed">
              All Green Resonance framework content, community tools, the Oracle, tarot readings, the Codex, gallery, learning resources, and symbolic keys are freely available to everyone without payment or login. Creating an account unlocks personal features like the resonance journal, but is never required to access knowledge.
            </p>
            <p className="font-body text-moonlight-white/50 text-sm mt-4 leading-relaxed">
              This policy was adopted in September 2026. Existing subscribers retain their billing management. No new paid memberships are being offered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-5 h-full">
                  <p.icon className="w-6 h-6 text-emerald-glow mb-3" />
                  <h3 className="font-heading font-semibold text-moonlight-white text-sm mb-2">{p.title}</h3>
                  <p className="font-body text-xs text-moonlight-white/50 leading-relaxed">{p.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Progress */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-4xl mx-auto">
          <SectionHeading title="Verified Progress" subtitle="What is built and working today." />

          <div className="mt-8 space-y-2">
            {completedItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-cosmic-deep/20 border border-emerald-glow/8"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-glow flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-moonlight-white/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In Progress */}
      <section className="section-padding">
        <div className="container-sacred max-w-4xl mx-auto">
          <SectionHeading title="In Progress" subtitle="What we are actively working on." />

          <div className="mt-8 space-y-2">
            {inProgressItems.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-gold-sacred/5 border border-gold-sacred/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Clock className="w-4 h-4 text-gold-sacred/70 flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-moonlight-white/60">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black to-emerald-deep/10">
        <div className="container-sacred max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl tracking-wider text-gradient-harvest mb-4">Questions or Concerns?</h2>
          <p className="font-body text-moonlight-white/50 text-sm mb-6">
            If anything here is unclear, or if you have questions about how the project operates, please reach out.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-sm tracking-widest text-emerald-glow"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

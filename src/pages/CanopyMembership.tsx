import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TreePine, Crown, Users, BookOpen, Sparkles,
  Calendar, Star, Heart,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CoursePathway from '../components/learning/CoursePathway';
import PageMeta from '../components/PageMeta';

const canopyBenefits = [
  {
    title: '1. All Community Benefits',
    description:
      'Everything in the Seed and Mycelium layers — guided practices, New Moon Council, resource library, community events, and all shared content.',
    icon: Users,
  },
  {
    title: '2. Annual Resonance Gathering',
    description:
      'Invitation to the annual multi-day immersive gathering — a living convergence of the Green Resonance community.',
    icon: Calendar,
  },
  {
    title: '3. Mentorship Conversations',
    description:
      'Guidance sessions with Green Resonance mentors for deeper integration of practices, frameworks, and life design.',
    icon: Sparkles,
  },
  {
    title: '4. Regenerative Design Lab',
    description:
      'Participate in the quarterly Design Lab — collaborative sessions exploring regenerative systems, biohabitation, and community resilience.',
    icon: TreePine,
  },
  {
    title: '5. Early Access to All Content',
    description:
      'Preview new publications, practice materials, MUSEschool courses, and framework updates before general release.',
    icon: BookOpen,
  },
  {
    title: '6. Founding Community Recognition',
    description:
      'Be recognised as a founding Canopy participant in the Green Resonance archives and community records.',
    icon: Star,
  },
];

export default function CanopyMembership() {
  return (
    <PageTransition>
      <PageMeta title="Canopy" description="Practise & Steward — the stewardship layer of the Green Resonance community, open to all." path="/canopy" />
      <div className="relative min-h-screen">
        <MyceliumNetwork />

        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 mb-6">
                <Crown className="w-4 h-4 text-cyan-glow" />
                <span className="text-sm font-body text-cyan-glow">Practise and Steward</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-moonlight-white leading-tight mb-4">
                Canopy
              </h1>
              <p className="text-lg md:text-xl font-body text-moonlight-white/70 max-w-2xl mx-auto leading-relaxed">
                The stewardship layer of the Green Resonance community — full participation in every resource, mentorship, gatherings, and facilitator development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Free Access Policy */}
        <section className="relative pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <GlassCard className="p-6 sm:p-8 text-center border-cyan-glow/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-cyan-glow" />
                <h2 className="font-display text-lg tracking-wider text-cyan-glow">Freely Available</h2>
              </div>
              <p className="font-body text-moonlight-white/70 text-sm sm:text-base leading-relaxed">
                Green Resonance is freely available to everyone. Explore, learn, create and participate without a membership fee. Contributions of time, knowledge, care or money are welcome and entirely optional.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* What's Included */}
        <section className="relative pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="What Canopy Offers" subtitle="Stewardship, mentorship, and deeper community — open to all." />
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {canopyBenefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-cyan-glow/10 border border-cyan-glow/20 flex-shrink-0">
                        <b.icon className="w-5 h-5 text-cyan-glow" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-moonlight-white mb-2">
                          {b.title}
                        </h3>
                        <p className="text-sm font-body text-moonlight-white/60 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Catalogue */}
        <section className="relative pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <CoursePathway pathway="canopy" />
          </div>
        </section>

        {/* Explore Other Paths */}
        <section className="relative pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Explore the Community" subtitle="Three participation themes — all freely accessible" />
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Seed', desc: 'Explore and belong', path: '/seed-membership', color: 'emerald-glow' },
                { name: 'Mycelium', desc: 'Learn together', path: '/mycelium-membership', color: 'gold-sacred' },
                { name: 'Canopy', desc: 'Practise and steward', path: '#', color: 'cyan-glow', current: true },
              ].map(t => (
                <GlassCard key={t.name} className={`p-5 text-center ${t.current ? 'border-cyan-glow/30 ring-1 ring-cyan-glow/20' : ''}`}>
                  <h4 className={`font-heading font-semibold text-${t.color} mb-1`}>{t.name}</h4>
                  <p className="text-sm font-body text-moonlight-white/60 mb-3">{t.desc}</p>
                  {t.current ? (
                    <span className="text-xs font-body text-cyan-glow/70">You are here</span>
                  ) : (
                    <Link to={t.path} className="text-xs font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors">
                      Explore
                    </Link>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

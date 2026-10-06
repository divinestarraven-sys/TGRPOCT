import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Network, Key, Users, BookOpen, Sparkles,
  Calendar, Star, ArrowRight, Moon, Compass,
  TreePine, Flame, Heart,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import {
  myceliumAccessKeys,
  monthlyCommunityTimetable,
} from '../data/memberships';
import CoursePathway from '../components/learning/CoursePathway';
import PageMeta from '../components/PageMeta';

const interestOptions = [
  'Weekly Practices',
  'New Moon Council',
  'Resource Library',
  'Community Events',
  'Living Codex',
  'MUSEschool',
];

const accessKeyIcons = [
  BookOpen, Sparkles, Moon, Key, Calendar,
  Compass, Star, TreePine, Flame, Users, Network,
];

export default function MyceliumMembership() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mycelium-submit`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interests: interests.join(', '), message, newsletter_consent: newsletterConsent }),
      });
      if (!res.ok) { setFormState('error'); return; }
      const data = await res.json();
      setFormState(data.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  return (
    <PageTransition>
      <PageMeta title="Mycelium Membership" description="Join the Mycelium network — deeper access to the Green Resonance Framework, community, and regenerative practices." path="/mycelium-membership" />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={35} />
        </div>
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={1.5} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={600} opacity={0.05} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Network className="w-6 h-6 text-gold-sacred" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">MYCELIUM — LEARN TOGETHER</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-harvest mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Mycelium
          </motion.h1>

          <motion.p
            className="font-sacred text-gold-sacred/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            The connected layer of the Green Resonance community — weekly practices, New Moon Councils, resource library, community events, and the living Codex.
          </motion.p>

          <motion.p
            className="font-body text-moonlight-white/40 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            A living network of practice, learning, reflection, and collaboration — rooted in the Green Resonance framework and growing together through weekly rhythms and monthly gatherings.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <a
              href="#community"
              className="group px-8 py-4 rounded-full bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 hover:border-gold-sacred/50 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center gap-2"
            >
              <Network className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Explore Mycelium
            </a>
            <a
              href="#courses"
              className="px-8 py-4 rounded-full bg-emerald-glow/10 border border-emerald-glow/20 hover:border-emerald-glow/40 transition-all font-display text-sm tracking-widest text-emerald-glow/80 hover:text-emerald-glow flex items-center gap-2"
            >
              View Courses
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Free Access Policy */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <GlassCard gold className="p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-gold-sacred" />
              <h2 className="font-display text-lg tracking-wider text-gold-sacred">Freely Available</h2>
            </div>
            <p className="font-body text-moonlight-white/70 text-sm sm:text-base leading-relaxed">
              Green Resonance is freely available to everyone. Explore, learn, create and participate without a membership fee. Contributions of time, knowledge, care or money are welcome and entirely optional.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* What's Included */}
      <section id="community" className="section-padding relative">
        <SectionHeading title="What Mycelium Offers" subtitle="Community practices, resources, and learning — open to all." />
        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {myceliumAccessKeys.map((key, i) => {
              const Icon = accessKeyIcons[i] || Key;
              return (
                <motion.div key={key.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                  <GlassCard gold className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gold-sacred/10 border border-gold-sacred/20 flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-sacred" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-moonlight-white mb-2">{key.title}</h3>
                        <p className="text-sm font-body text-moonlight-white/60 leading-relaxed">{key.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Timetable */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/8 to-cosmic-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <SacredGeometry size={500} opacity={1} animated />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading title="Monthly Community Timetable" subtitle="A living rhythm of practice, study, creativity, and gathering." />
          <div className="max-w-3xl mx-auto space-y-4">
            {monthlyCommunityTimetable.map((entry, i) => (
              <motion.div key={entry.week} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <GlassCard gold hover={false} className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 font-display text-xs tracking-widest text-gold-sacred">{entry.week}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-moonlight-white mb-1">{entry.title}</h3>
                      <p className="text-sm font-body text-moonlight-white/50 leading-relaxed">{entry.focus}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="interest" className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black scroll-mt-20">
        <div className="container-sacred max-w-xl">
          <SectionHeading title="Express Your Interest" subtitle="Tell us what draws you to Mycelium and stay connected." />

          {formState === 'success' ? (
            <GlassCard gold className="p-8 text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-gold-sacred" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-gradient-harvest mb-2">Thank You</h3>
                <p className="font-body text-moonlight-white/70 leading-relaxed text-sm">Your interest has been noted. We will be in touch as Mycelium community activities develop.</p>
              </motion.div>
            </GlassCard>
          ) : (
            <GlassCard gold className="p-8">
              <form onSubmit={handleInterestSubmit} className="space-y-4">
                <div>
                  <label htmlFor="mycelium-name" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">NAME</label>
                  <input id="mycelium-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="mycelium-email" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">EMAIL</label>
                  <input id="mycelium-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">INTERESTS</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(opt => (
                      <button key={opt} type="button" aria-pressed={interests.includes(opt)} onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display tracking-wider transition-all ${interests.includes(opt) ? 'bg-gold-sacred/20 text-gold-sacred border border-gold-sacred/30' : 'bg-cosmic-deep/30 text-moonlight-white/40 border border-moonlight-white/10 hover:text-moonlight-white/60'}`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="mycelium-message" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">MESSAGE (OPTIONAL)</label>
                  <textarea id="mycelium-message" value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors resize-none" placeholder="Tell us what interests you most..." />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={newsletterConsent} onChange={e => setNewsletterConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gold-sacred/20 bg-cosmic-deep/50 text-gold-sacred focus:ring-gold-sacred/30" />
                  <span className="font-body text-moonlight-white/70 text-xs leading-relaxed">Send me Green Resonance Project news and updates.</span>
                </label>
                {formState === 'error' && <p role="alert" className="text-red-400/80 text-xs font-body">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={formState === 'submitting'} className="w-full py-3 rounded-xl bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2 disabled:opacity-50">
                  {formState === 'submitting' ? 'Sending...' : 'Express Interest'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Explore Other Paths */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <SectionHeading title="Explore the Community" subtitle="Three participation themes — all freely accessible" />
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Seed', desc: 'Explore and belong', path: '/seed-membership', color: 'emerald-glow' },
              { name: 'Mycelium', desc: 'Learn together', path: '#', color: 'gold-sacred', current: true },
              { name: 'Canopy', desc: 'Practise and steward', path: '/canopy', color: 'cyan-glow' },
            ].map(t => (
              <GlassCard key={t.name} className={`p-5 text-center ${t.current ? 'border-gold-sacred/30 ring-1 ring-gold-sacred/20' : ''}`}>
                <h4 className={`font-heading font-semibold text-${t.color} mb-1`}>{t.name}</h4>
                <p className="text-sm font-body text-moonlight-white/60 mb-3">{t.desc}</p>
                {t.current ? (
                  <span className="text-xs font-body text-gold-sacred/70">You are here</span>
                ) : (
                  <Link to={t.path} className="text-xs font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors">Explore</Link>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalogue */}
      <section id="courses" className="section-padding scroll-mt-20">
        <div className="container-sacred">
          <CoursePathway pathway="mycelium" />
        </div>
      </section>
    </PageTransition>
  );
}

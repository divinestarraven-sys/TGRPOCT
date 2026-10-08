import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TreePine,
  Fish,
  Flower2,
  Droplets,
  Sun,
  Recycle,
  Hexagon,
  ArrowRight,
  Leaf,
  Zap,
  Users,
  Music,
  Network,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CymaticWaves from '../components/CymaticWaves';
import PageMeta from '../components/PageMeta';

const gardenSystems = [
  {
    title: 'Permaculture Zones',
    desc: 'Designing with nature\u2019s patterns, not against them',
    icon: TreePine,
    color: 'emerald-glow',
  },
  {
    title: 'Food Forests',
    desc: 'Multi-layered edible ecosystems that feed people and wildlife',
    icon: Leaf,
    color: 'emerald-glow',
  },
  {
    title: 'Aquaponics & Hydroponics',
    desc: 'Closed-loop water and nutrient cycling for abundant harvests',
    icon: Fish,
    color: 'cyan-glow',
  },
  {
    title: 'Medicinal Gardens',
    desc: 'Heritage herbs and healing plants as educational and practical resources',
    icon: Flower2,
    color: 'gold-sacred',
  },
  {
    title: 'Pollinator Systems',
    desc: 'Creating habitat for bees, butterflies, and the web of pollination',
    icon: Sun,
    color: 'gold-sacred',
  },
  {
    title: 'Water Harvesting',
    desc: 'Capturing, cleaning, and circulating water through the living landscape',
    icon: Droplets,
    color: 'cyan-glow',
  },
  {
    title: 'Composting & Biochar',
    desc: 'Transforming waste into the foundation of soil fertility',
    icon: Recycle,
    color: 'emerald-glow',
  },
  {
    title: 'Sacred Geometry Pathways',
    desc: 'Walking meditations laid out in geometric patterns for contemplation',
    icon: Hexagon,
    color: 'gold-sacred',
  },
  {
    title: 'Mycelium Networks',
    desc: 'The underground intelligence connecting all garden systems',
    icon: Network,
    color: 'emerald-glow',
  },
  {
    title: 'Native Regeneration',
    desc: 'Restoring indigenous plant communities and ecosystem function',
    icon: Leaf,
    color: 'emerald-glow',
  },
  {
    title: 'Solar & Greywater Systems',
    desc: 'Renewable energy and water recycling for self-sufficiency',
    icon: Zap,
    color: 'cyan-glow',
  },
  {
    title: 'Community Gathering Spaces',
    desc: 'The amphitheatre, council circle, and ceremony grounds',
    icon: Users,
    color: 'gold-sacred',
  },
];

const harmonicKey = [
  { note: 'C', planet: 'Sun', metal: 'Gold', sign: 'Leo', quality: 'vitality and illumination' },
  { note: 'D', planet: 'Moon', metal: 'Silver', sign: 'Cancer', quality: 'reflection and cycles' },
  { note: 'E', planet: 'Mercury', metal: 'Quicksilver', sign: 'Gemini/Virgo', quality: 'communication and learning' },
  { note: 'F', planet: 'Venus', metal: 'Copper', sign: 'Taurus/Libra', quality: 'beauty and harmony' },
  { note: 'G', planet: 'Mars', metal: 'Iron', sign: 'Aries/Scorpio', quality: 'courage and action' },
  { note: 'A', planet: 'Jupiter', metal: 'Tin', sign: 'Sagittarius/Pisces', quality: 'wisdom and abundance' },
  { note: 'B', planet: 'Saturn', metal: 'Lead', sign: 'Capricorn/Aquarius', quality: 'structure and time' },
];

const omegaPortals = [
  { num: '4',  name: 'Flow / Pattern Trails',         bearing: 'North',      icon: Droplets, color: '#1E88E5', angle: 0 },
  { num: '7',  name: 'Renewal / Healing House',       bearing: 'Northeast',  icon: Flower2,  color: '#26A69A', angle: 45 },
  { num: '3',  name: 'Earth / Manifestation Grounds', bearing: 'East',       icon: Leaf,     color: '#E53935', angle: 90 },
  { num: '2',  name: 'Ethics / Hearth of Integrity',  bearing: 'Southeast',  icon: Recycle,  color: '#FDD835', angle: 135 },
  { num: '1',  name: 'Awareness / Silver Grove',      bearing: 'South',      icon: Sun,      color: '#AB47BC', angle: 180 },
  { num: '8',  name: 'Communion / Gathering Waters',  bearing: 'Southwest',  icon: Fish,     color: '#5C6BC0', angle: 225 },
  { num: '6',  name: 'Ethereal Muse / Play-Space',    bearing: 'West',       icon: Hexagon,  color: '#43A047', angle: 270 },
  { num: '5D', name: '5th Dimensional Gate — Astral Portal — The Rhythmic Weave', bearing: 'Northwest', icon: Music, color: '#5C6BC0', angle: 315 },
];

const centralHeart = { num: '9', name: 'Central Heart / Resonance Circle' };

const gardenConcept = {
  founders: 30,
  units: "26 accommodation units (7 couples' yurts, 16 huts, 3 visitor yurts)",
  shared: 'Separate kitchen and hall; permanent-home reserves; local-first ecology',
  ceiling: 'A 200-person ceiling is long-term planning, not an operating approval',
};

function OmegaMap() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square" aria-label="Omega Garden portal map, north up">
      <motion.div
        className="absolute inset-[6%] rounded-full border border-moonlight-white/5"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {/* North-up compass */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-center" aria-hidden="true">
        <span className="font-display text-xs tracking-widest text-gold-sacred/60">N</span>
        <div className="w-px h-3 bg-gold-sacred/30 mx-auto" />
      </div>
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {omegaPortals.map((p) => {
          const a = ((p.angle - 90) * Math.PI) / 180;
          const x = 50 + 36 * Math.cos(a);
          const y = 50 + 36 * Math.sin(a);
          return (
            <line key={p.num} x1="50" y1="50" x2={x} y2={y} stroke={p.color} strokeWidth="0.3" strokeOpacity="0.25" strokeDasharray="2 2" />
          );
        })}
      </svg>
      {/* Centre: Heart 9 */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center"
        style={{ transform: 'translate(-50%, -50%)', border: '2px solid #FFF8DC44', background: 'radial-gradient(circle, rgba(255,248,220,0.12) 0%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-display text-sm font-semibold" style={{ color: '#FFF8DC' }}>{centralHeart.num}</span>
        <span className="text-[9px] font-body text-moonlight-white/60 text-center px-1 leading-tight">Heart</span>
      </motion.div>
      {/* Outer portals */}
      {omegaPortals.map((p, i) => {
        const a = ((p.angle - 90) * Math.PI) / 180;
        const x = 50 + 36 * Math.cos(a);
        const y = 50 + 36 * Math.sin(a);
        return (
          <motion.div
            key={p.num}
            className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center cursor-default transition-transform hover:scale-110"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', border: `2px solid ${p.color}55`, background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            <span className="font-display text-xs font-semibold" style={{ color: p.color }}>{p.num}</span>
            <span className="text-[8px] sm:text-[9px] font-body text-moonlight-white/60 text-center px-0.5 leading-tight">{p.bearing}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ResonanceGarden() {
  return (
    <PageTransition>
      <PageMeta title="The Resonance Garden" description="The Omega Garden concept — eight outer portals plus central Heart 9, an ecological site plan where Green Resonance meets soil, water, and the living world." path="/garden" />
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-25">
          <CymaticWaves frequency={2} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.06} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TreePine className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">THE OMEGA GARDEN</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Resonance Garden
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Eight outer portals, one central Heart
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={20} />
        </div>
        <div className="container-sacred relative z-10 max-w-3xl mx-auto text-center">
          <SectionHeading
            title="A Classroom Without Walls"
            subtitle="Where learning grows from the ground up."
          />
          <motion.p
            className="font-body text-moonlight-white/60 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Resonance Garden is the physical expression of the framework: a provisional
            ecological site plan — the Omega concept — where people learn through
            participation, observation, stewardship, and action. It is distinct from the core
            Six Pillars and Nine Portals practice layer, which needs no land or building.
          </motion.p>
        </div>
      </section>

      {/* Omega Portal Map */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="The Nine Portal Layout"
            subtitle="Eight equal outer zones with midpoint gateways, converging in central Heart 9. North-up orientation shown for the Spain site concept."
          />
          <div className="max-w-2xl mx-auto">
            <OmegaMap />
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {omegaPortals.map((p) => (
              <div key={p.num} className="p-3 rounded-xl" style={{ background: `${p.color}10`, border: `1px solid ${p.color}25` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-sm font-semibold" style={{ color: p.color }}>{p.num}</span>
                  <span className="font-display text-[10px] tracking-widest text-moonlight-white/40 uppercase">{p.bearing}</span>
                </div>
                <p className="font-body text-xs text-moonlight-white/60 leading-snug">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Summary */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-3xl mx-auto">
          <GlassCard className="p-6 sm:p-8">
            <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-4">The Concept in Brief</h3>
            <ul className="space-y-2 font-body text-moonlight-white/55 text-sm leading-relaxed">
              <li>{gardenConcept.founders} founders living on site</li>
              <li>{gardenConcept.units}</li>
              <li>{gardenConcept.shared}</li>
              <li>{gardenConcept.ceiling}</li>
            </ul>
            <p className="mt-4 font-body text-moonlight-white/35 text-xs leading-relaxed">
              Site dimensions, carrying capacity, construction and expanded clinical services
              remain provisional. This page presents a site-planning concept, not an approved
              build.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Garden Systems Grid */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Garden Systems"
            subtitle="Twelve interconnected systems forming one living organism."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gardenSystems.map((system, i) => (
              <GlassCard key={system.title} delay={i * 0.06} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg bg-${system.color}/10 flex items-center justify-center shrink-0`}>
                    <system.icon className={`w-5 h-5 text-${system.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-base tracking-wider text-moonlight-white mb-1">
                      {system.title}
                    </h3>
                    <p className="font-body text-moonlight-white/45 text-sm leading-relaxed">
                      {system.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Alchemical Harmonic Key */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={3} />
        </div>
        <div className="container-sacred relative z-10 max-w-4xl mx-auto">
          <SectionHeading
            title="Music of the Spheres Within the Garden"
            subtitle="The Alchemical Harmonic Key"
          />

          <GlassCard gold className="p-6 sm:p-8 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Music className="w-5 h-5 text-gold-sacred/70" />
              <span className="font-sacred text-gold-sacred/70 text-sm tracking-[0.2em]">ALCHEMICAL HARMONIC KEY</span>
            </div>

            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gold-sacred/20">
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Note</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Planet</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Metal</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Sign</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Quality</th>
                </tr>
              </thead>
              <tbody>
                {harmonicKey.map((row, i) => (
                  <motion.tr
                    key={row.note}
                    className="border-b border-gold-sacred/10 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <td className="py-3 pr-4">
                      <span className="font-display text-gold-sacred text-lg">{row.note}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-solarpunk-biolum text-sm">{row.planet}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-gold-sacred/80 text-sm">{row.metal}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-moonlight-white/50 text-sm">{row.sign}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-body text-moonlight-white/40 text-sm italic">{row.quality}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </section>

      {/* Framing Note */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <GlassCard className="p-6 sm:p-8 text-center">
            <p className="font-sacred text-moonlight-white/50 text-sm leading-relaxed mb-4">
              Symbolic layers are used as contemplative and educational tools, while ecological
              design is guided by observation, climate, terrain, soil, water, and practical
              stewardship.
            </p>
            <div className="w-12 h-px bg-emerald-glow/20 mx-auto mb-4" />
            <p className="font-sacred text-moonlight-white/30 text-xs tracking-wider italic">
              Presented as symbolic, historical, artistic, and contemplative — not as scientific proof.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <TreePine className="w-8 h-8 text-emerald-glow mx-auto mb-4" />
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Step Into The Garden
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              The garden grows with every pair of hands. Join the community and help cultivate a living curriculum.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow"
            >
              Join The Garden
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Garden Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/01-best-new-garden-map.jpg',
          '/Gallery/02-new-green-resonance-garden-map-delta.jpg',
          '/Gallery/11-keys-to-the-kingdom-delta-master-map.jpg',
        ]}
        limit={3}
        title="Garden Maps (Historical)"
        subtitle="Earlier Delta-era designs, preserved for reference — the Omega nine-portal layout above is the current concept"
      />
    </PageTransition>
  );
}

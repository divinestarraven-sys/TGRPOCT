import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Map, Maximize2, ImageOff } from 'lucide-react';
import { ALL_PORTALS, MASTER_MAP, PORTALS_TAGLINE } from '../data/portals';
import PageMeta from '../components/PageMeta';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';

const COMPASS_BEARINGS: Record<number, string> = {
  1: 'South', 2: 'Southeast', 3: 'East', 4: 'North',
  5: 'Northwest', 6: 'West', 7: 'Northeast', 8: 'Southwest',
};

export default function PortalMapDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [imgFailed, setImgFailed] = useState(false);
  const portal = ALL_PORTALS.find((p) => p.slug === slug);

  if (!portal) {
    return (
      <PageTransition>
        <PageMeta title="Portal Map Not Found | The Green Resonance Project" path="/portals" />
        <section className="min-h-[60vh] flex items-center justify-center px-4">
          <GlassCard className="p-8 text-center max-w-md">
            <h1 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">Portal map not found</h1>
            <p className="font-body text-moonlight-white/60 mb-6">
              This portal map page does not exist. The nine portals are listed on the Portals index.
            </p>
            <Link
              to="/portals"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to the Nine Portals
            </Link>
          </GlassCard>
        </section>
      </PageTransition>
    );
  }

  const bearing = portal.spainBearing === 'Centre'
    ? 'the centre of the system, where all eight walk-through arches converge'
    : `the ${COMPASS_BEARINGS[portal.id] ?? portal.spainBearing} axis of the Spain/Omega compass`;

  return (
    <PageTransition>
      <PageMeta
        title={`${portal.title} — ${portal.subtitle} | The Green Resonance Project`}
        description={`Portal map and zone summary for ${portal.title} — ${portal.subtitle}, positioned at ${bearing} in the Green Resonance Community Garden.`}
        path={`/portals/${portal.slug}`}
      />
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center font-display text-lg tracking-widest font-semibold mb-5"
            style={{ background: portal.colorLight, color: portal.color, border: `1px solid ${portal.color}40` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {portal.number}
          </motion.div>
          <motion.h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-gradient-gold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            {portal.title}
          </motion.h1>
          <motion.p
            className="font-sacred text-lg text-moonlight-white/60 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {portal.subtitle}
          </motion.p>
          <motion.p
            className="font-display text-xs tracking-[0.25em] text-gold-sacred/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {PORTALS_TAGLINE}
          </motion.p>
        </div>
      </section>

      <section className="section-padding relative pt-0">
        <div className="container-sacred max-w-4xl">
          <GlassCard hover={false} className="p-4 sm:p-6">
            {imgFailed ? (
              <div
                className="rounded-xl border border-dashed p-10 text-center"
                style={{ borderColor: `${portal.color}50`, background: portal.colorLight }}
              >
                <ImageOff className="w-8 h-8 mx-auto mb-3" style={{ color: portal.color }} />
                <p className="font-display text-sm tracking-widest mb-2" style={{ color: portal.color }}>
                  MAP ARTWORK PENDING
                </p>
                <p className="font-body text-sm text-moonlight-white/60 max-w-sm mx-auto">
                  The original zone map for this portal has not been published yet.
                  When it arrives it will appear here at full resolution, with full-size view and download links.
                </p>
              </div>
            ) : (
              <a
                href={portal.mapFile}
                target="_blank"
                rel="noopener noreferrer"
                className="block group/map"
                aria-label={`View ${portal.title} map full size`}
              >
                <img
                  src={portal.mapFile}
                  alt={`Zone map of ${portal.title} — ${portal.subtitle}, at ${bearing} in the Green Resonance Community Garden`}
                  className="w-full h-auto rounded-xl border transition-transform duration-300 group-hover/map:scale-[1.01]"
                  style={{ borderColor: `${portal.color}30`, aspectRatio: '3 / 4', objectFit: 'contain', background: 'rgba(0,0,0,0.25)' }}
                  onError={() => setImgFailed(true)}
                />
              </a>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-1">
              <p className="font-body text-xs text-moonlight-white/50">{MASTER_MAP.copyright}</p>
              <div className="flex items-center gap-2">
                <a
                  href={portal.mapFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display tracking-wider bg-[#1a3226] text-solarpunk-biolum border border-solarpunk-biolum/30 hover:bg-[#254434] transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  View full size
                </a>
                <a
                  href={portal.mapFile}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display tracking-wider bg-[#1a3226] text-gold-sacred border border-gold-sacred/30 hover:bg-[#254434] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download JPG
                </a>
              </div>
            </div>
          </GlassCard>

          <div className="mt-8">
            <h2 className="font-display text-sm tracking-widest mb-4" style={{ color: portal.color }}>
              ZONE SUMMARY
            </h2>
            <p className="font-body text-moonlight-white/70 leading-relaxed mb-4">
              {portal.subtitle} sits at {bearing}. Portal numbering is its own sequence — it does not
              number the six Pillars.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {portal.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm font-body text-moonlight-white/60">
                  <span className="mt-1 shrink-0" style={{ color: `${portal.color}70` }}>-</span>
                  {feature}
                </li>
              ))}
            </ul>
            {portal.symbolicNote && (
              <div className="rounded-xl p-4 mt-6" style={{ background: portal.colorLight, border: `1px solid ${portal.color}20` }}>
                <p className="font-body text-xs italic" style={{ color: `${portal.color}cc` }}>{portal.symbolicNote}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-solarpunk-moss/20">
            <Link
              to="/portals"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-gold-sacred hover:text-gold-sacred/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All nine portals
            </Link>
            <Link
              to="/garden"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-solarpunk-biolum hover:text-solarpunk-biolum/80 transition-colors"
            >
              <Map className="w-4 h-4" />
              The Resonance Garden
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

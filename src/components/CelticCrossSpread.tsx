import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { CelticCrossSpread as SpreadType } from '../lib/tarot-engine';
import GlassCard from './GlassCard';

interface Props {
  spread: SpreadType;
}

function CardDetail({ card, index }: { card: SpreadType['cards'][number]; index: number }) {
  const [open, setOpen] = useState(index < 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <GlassCard gold={card.card.suit === 'major'} className="overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
          aria-expanded={open}
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gold-sacred/10 border border-gold-sacred/20 flex items-center justify-center">
            <span className="font-display text-sm text-gold-sacred">{card.position}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-xs tracking-widest text-gold-sacred/60 mb-0.5">{card.positionName}</p>
            <p className="font-heading font-semibold text-moonlight-white truncate">
              {card.card.name}
              {card.reversed && <span className="ml-2 text-xs font-body text-red-400/70">(Reversed)</span>}
            </p>
          </div>
          <ChevronDown className={`w-4 h-4 text-moonlight-white/30 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 sm:px-5 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-display tracking-widest bg-moonlight-white/5 text-moonlight-white/50 border border-moonlight-white/10">
                    {card.card.suit === 'major' ? 'Major Arcana' : `${card.card.suit.charAt(0).toUpperCase() + card.card.suit.slice(1)}`}
                  </span>
                  {card.reversed && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-display tracking-widest bg-red-500/10 text-red-400/70 border border-red-500/20">
                      Reversed
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-display text-[10px] tracking-[0.2em] text-gold-sacred/50 mb-1.5">HISTORICAL RWS MEANING</h4>
                  <p className="font-body text-sm text-moonlight-white/70 leading-relaxed">
                    {card.reversed ? card.card.reversedMeaning : card.card.uprightMeaning}
                  </p>
                  <a
                    href={card.card.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-body text-emerald-glow/50 hover:text-emerald-glow transition-colors"
                  >
                    {card.card.sourceSection}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div>
                  <h4 className="font-display text-[10px] tracking-[0.2em] text-emerald-glow/50 mb-1.5">GREEN RESONANCE REFLECTION</h4>
                  <p className="font-body text-sm text-moonlight-white/70 leading-relaxed">
                    {card.card.greenResonanceReflection}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-gold-sacred/5 border border-gold-sacred/10">
                  <p className="font-body text-sm text-gold-sacred/80 leading-relaxed italic">
                    {card.card.reflectionQuestion}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export default function CelticCrossSpread({ spread }: Props) {
  return (
    <div className="space-y-3">
      {spread.cards.map((card, i) => (
        <CardDetail key={card.card.id} card={card} index={i} />
      ))}
    </div>
  );
}

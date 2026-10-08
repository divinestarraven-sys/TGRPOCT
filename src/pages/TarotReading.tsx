import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, History, Trash2, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import CelticCrossSpread from '../components/CelticCrossSpread';
import SacredGeometry from '../components/SacredGeometry';
import { TAROT_DECK } from '../data/tarot-deck';
import {
  drawCelticCross,
  saveCelticCross,
  loadSavedSpreads,
  CELTIC_CROSS_POSITIONS,
  type CelticCrossSpread as SpreadType,
} from '../lib/tarot-engine';
import PageMeta from '../components/PageMeta';

export default function TarotReading() {
  const [question, setQuestion] = useState('');
  const [reversals, setReversals] = useState(false);
  const [currentSpread, setCurrentSpread] = useState<SpreadType | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [savedSpreads, setSavedSpreads] = useState<SpreadType[]>(() => loadSavedSpreads());
  const [showPositions, setShowPositions] = useState(false);

  const handleDraw = useCallback(() => {
    if (!question.trim()) return;
    const spread = drawCelticCross(TAROT_DECK, question.trim(), reversals);
    setCurrentSpread(spread);
    saveCelticCross(spread);
    setSavedSpreads(loadSavedSpreads());
  }, [question, reversals]);

  const handleNewReading = () => {
    setCurrentSpread(null);
    setQuestion('');
  };

  const handleLoadSpread = (spread: SpreadType) => {
    setCurrentSpread(spread);
    setQuestion(spread.question);
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    try { localStorage.removeItem('greenResonance.tarotSpreads'); } catch { /* storage unavailable */ }
    setSavedSpreads([]);
  };

  return (
    <PageTransition>
      <PageMeta title="Tarot Reading" description="A Celtic Cross tarot reading using the 78-card Rider-Waite-Smith deck, with Green Resonance reflections connecting each card to the framework." path="/tarot" />
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/10 to-cosmic-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.04} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-gold-sacred" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">CELTIC CROSS READING</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider text-gradient-harvest mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Tarot Reading
          </motion.h1>

          <motion.p
            className="font-body text-moonlight-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            A reflective tool using the traditional Celtic Cross spread with Rider-Waite-Smith symbolism, interpreted through the Green Resonance framework. Tarot is a mirror for reflection, not a predictor of the future.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-sacred max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!currentSpread ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Question Input */}
                <GlassCard gold className="p-6 sm:p-8">
                  <h2 className="font-display text-lg tracking-wider text-gold-sacred mb-1">Ask Your Question</h2>
                  <p className="font-body text-moonlight-white/40 text-sm mb-6">
                    Focus on what you want to reflect on. The more specific, the more useful the reading.
                  </p>

                  <div className="space-y-4">
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What would you like to reflect on?"
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/15 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors resize-none"
                    />

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reversals}
                        onChange={(e) => setReversals(e.target.checked)}
                        className="w-4 h-4 rounded border-gold-sacred/20 bg-cosmic-deep/50 text-gold-sacred focus:ring-gold-sacred/30"
                      />
                      <span className="font-body text-moonlight-white/60 text-sm">
                        Include reversed cards
                      </span>
                    </label>

                    <button
                      onClick={handleDraw}
                      disabled={!question.trim()}
                      className="w-full py-3 rounded-xl bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" />
                      Draw the Celtic Cross
                    </button>
                  </div>
                </GlassCard>

                {/* Position Guide */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowPositions(!showPositions)}
                    className="flex items-center gap-2 text-moonlight-white/40 hover:text-moonlight-white/60 transition-colors mb-3"
                    aria-expanded={showPositions}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${showPositions ? 'rotate-180' : ''}`} />
                    <span className="font-display text-xs tracking-widest">THE 10 POSITIONS</span>
                  </button>

                  <AnimatePresence>
                    {showPositions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2">
                          {CELTIC_CROSS_POSITIONS.map((pos) => (
                            <div key={pos.position} className="flex gap-3 p-3 rounded-lg bg-cosmic-deep/20 border border-moonlight-white/5">
                              <span className="flex-shrink-0 w-6 h-6 rounded-md bg-gold-sacred/10 flex items-center justify-center font-display text-xs text-gold-sacred">{pos.position}</span>
                              <div>
                                <p className="font-heading font-semibold text-sm text-moonlight-white/80">{pos.name}</p>
                                <p className="font-body text-xs text-moonlight-white/40">{pos.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* History */}
                {savedSpreads.length > 0 && (
                  <div className="mt-8">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center gap-2 text-moonlight-white/40 hover:text-moonlight-white/60 transition-colors mb-3"
                      aria-expanded={showHistory}
                    >
                      <History className="w-4 h-4" />
                      <span className="font-display text-xs tracking-widest">PREVIOUS READINGS ({savedSpreads.length})</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showHistory && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mb-3">
                            {savedSpreads.map((sp) => (
                              <button
                                key={sp.id}
                                onClick={() => handleLoadSpread(sp)}
                                className="w-full text-left p-3 rounded-lg bg-cosmic-deep/20 border border-moonlight-white/5 hover:border-gold-sacred/20 transition-colors group"
                              >
                                <p className="font-body text-sm text-moonlight-white/70 truncate group-hover:text-moonlight-white transition-colors">
                                  {sp.question}
                                </p>
                                <p className="font-body text-[10px] text-moonlight-white/30 mt-1">
                                  {new Date(sp.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={handleClearHistory}
                            className="flex items-center gap-1.5 text-[10px] font-body text-red-400/50 hover:text-red-400/80 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Clear history
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="spread"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Question header */}
                <div className="mb-6">
                  <p className="font-display text-xs tracking-widest text-gold-sacred/50 mb-2">YOUR QUESTION</p>
                  <p className="font-body text-moonlight-white/80 text-base leading-relaxed">{currentSpread.question}</p>
                  <p className="font-body text-moonlight-white/30 text-xs mt-1">
                    {new Date(currentSpread.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {currentSpread.reversalsEnabled && ' — reversals enabled'}
                  </p>
                </div>

                {/* Spread */}
                <CelticCrossSpread spread={currentSpread} />

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-xl bg-cosmic-deep/20 border border-moonlight-white/5">
                  <p className="font-body text-xs text-moonlight-white/30 leading-relaxed">
                    This reading uses the Rider-Waite-Smith tradition as a reflective tool. Historical card meanings are paraphrased from published references. Green Resonance reflections are modern project interpretations. Tarot does not predict the future, reveal hidden facts, or replace professional advice.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleNewReading}
                    className="flex-1 py-3 rounded-xl bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Reading
                  </button>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex-1 py-3 rounded-xl bg-moonlight-white/5 border border-moonlight-white/10 hover:bg-moonlight-white/10 transition-all font-display text-sm tracking-widest text-moonlight-white/60 flex items-center justify-center gap-2"
                  >
                    Back to Top
                    <ArrowRight className="w-4 h-4 -rotate-90" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-2xl mx-auto">
          <SectionHeading title="About This Reading" subtitle="Reflection, not prediction." />
          <div className="space-y-4 mt-8">
            <GlassCard className="p-5">
              <h3 className="font-heading font-semibold text-moonlight-white text-sm mb-2">Rider-Waite-Smith Tradition</h3>
              <p className="font-body text-xs text-moonlight-white/50 leading-relaxed">
                Historical card meanings are paraphrased from published references. They represent traditional interpretations developed over centuries of tarot practice.
              </p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="font-heading font-semibold text-moonlight-white text-sm mb-2">Green Resonance Reflections</h3>
              <p className="font-body text-xs text-moonlight-white/50 leading-relaxed">
                Modern reflections connect each card to the Green Resonance framework: the six Pillars, nine Portals, Central Heart, Ravenstar, Phoenix Principle, Rhythmic Weave, and garden systems.
              </p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="font-heading font-semibold text-moonlight-white text-sm mb-2">Privacy</h3>
              <p className="font-body text-xs text-moonlight-white/50 leading-relaxed">
                Your readings are stored locally in your browser. They are not sent to any server. Clearing your browser data will remove them.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

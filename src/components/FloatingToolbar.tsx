import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Volume2,
  VolumeX,
  MessageCircle,
  Music,
  X,
  Send,
  Sparkles,
  ChevronDown,
  Plus,
  Trash2,
  Play,
  Pause,
  Settings,
} from 'lucide-react';

type PanelId = 'journal' | 'harmonic' | 'oracle' | null;

interface ToolbarContextValue {
  activePanel: PanelId;
  setActivePanel: (id: PanelId) => void;
}

export const ToolbarContext = createContext<ToolbarContextValue>({
  activePanel: null,
  setActivePanel: () => {},
});

export const useToolbar = () => useContext(ToolbarContext);

interface ToolButton {
  id: 'journal' | 'harmonic' | 'oracle' | 'audio';
  label: string;
  color: string;
  ringClass: string;
  icon: typeof BookOpen;
}

const TOOLS: ToolButton[] = [
  { id: 'journal',  label: 'Journal',         color: '#d4a843', ringClass: 'ring-[#d4a843]/50 shadow-[0_0_14px_rgba(212,168,67,0.35)]',  icon: BookOpen },
  { id: 'harmonic', label: 'Harmonic Player', color: '#68E3D4', ringClass: 'ring-[#68E3D4]/50 shadow-[0_0_14px_rgba(104,227,212,0.35)]', icon: Volume2 },
  { id: 'oracle',   label: 'Oracle Chat',     color: '#39ff8c', ringClass: 'ring-[#39ff8c]/50 shadow-[0_0_14px_rgba(57,255,140,0.35)]',  icon: MessageCircle },
  { id: 'audio',    label: 'Ambient Audio',   color: '#D6B25E', ringClass: 'ring-[#D6B25E]/50 shadow-[0_0_14px_rgba(214,178,94,0.35)]',  icon: Music },
];

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

type Intensity = 'low' | 'medium' | 'high';
type SourcesPref = 'default' | 'on' | 'off';

const PREF_KEYS = {
  tarot: 'greenResonance.tarotSymbolismInChat',
  intensity: 'greenResonance.oraclePersonalityIntensity',
  sources: 'greenResonance.oracleSourcesPreference',
} as const;

function loadPref<T>(key: string, fallback: T, validate: (v: string) => boolean): T {
  try {
    const val = localStorage.getItem(key);
    if (val !== null && validate(val)) return val as unknown as T;
  } catch { /* noop */ }
  return fallback;
}

function savePref(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* noop */ }
}

interface CommandResult {
  handled: boolean;
  response?: string;
  prefChange?: {
    intensity?: Intensity;
    tarot?: boolean;
    sources?: SourcesPref;
  };
}

const HELP_TEXT = `Available Oracle commands:

/help \u2014 Show this list
/wizard low | medium | high \u2014 Set personality intensity
/plain \u2014 Alias for /wizard low
/tarot on | off \u2014 Toggle tarot symbolism in chat
/sources on | off \u2014 Toggle source citations
/reset-style \u2014 Restore all defaults

You can also say things like "be more wizardy", "use plain mode", "turn tarot off", or "reset oracle style".`;

function resolveOracleCommand(message: string): CommandResult {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  if (lower === '/help') {
    return { handled: true, response: HELP_TEXT };
  }

  const wizardMatch = lower.match(/^\/wizard\s+(low|medium|high)$/);
  if (wizardMatch) {
    const level = wizardMatch[1] as Intensity;
    const responses: Record<Intensity, string> = {
      low: 'Oracle personality set to low. Practical robes on.',
      medium: 'Oracle personality set to medium. The garden librarian is back.',
      high: 'Garden-wizard personality set to high. The mushrooms have been notified.',
    };
    return { handled: true, response: responses[level], prefChange: { intensity: level } };
  }

  if (lower === '/plain') {
    return { handled: true, response: 'Oracle personality set to low. Practical robes on.', prefChange: { intensity: 'low' } };
  }

  const tarotMatch = lower.match(/^\/tarot\s+(on|off)$/);
  if (tarotMatch) {
    const on = tarotMatch[1] === 'on';
    return {
      handled: true,
      response: on ? 'Tarot symbolism in chat is now on.' : 'Tarot symbolism in chat is now off.',
      prefChange: { tarot: on },
    };
  }

  const sourcesMatch = lower.match(/^\/sources\s+(on|off)$/);
  if (sourcesMatch) {
    const on = sourcesMatch[1] === 'on';
    return {
      handled: true,
      response: on ? 'Source citations preference set to on.' : 'Optional source citations hidden (safety citations always shown).',
      prefChange: { sources: on ? 'on' : 'off' },
    };
  }

  if (lower === '/reset-style') {
    return {
      handled: true,
      response: 'Oracle style reset to defaults: medium personality, tarot symbolism on, default sources.',
      prefChange: { intensity: 'medium', tarot: true, sources: 'default' },
    };
  }

  if (/^(turn\s+)?tarot\s+symbolism\s+off$/i.test(lower) || /^disable\s+tarot(\s+symbolism)?$/i.test(lower)) {
    return { handled: true, response: 'Tarot symbolism in chat is now off.', prefChange: { tarot: false } };
  }
  if (/^(turn\s+)?tarot\s+symbolism\s+on$/i.test(lower) || /^enable\s+tarot(\s+symbolism)?$/i.test(lower)) {
    return { handled: true, response: 'Tarot symbolism in chat is now on.', prefChange: { tarot: true } };
  }

  if (/^be\s+more\s+wizard(l?y)?$/i.test(lower) || /^show\s+more\s+personality$/i.test(lower) || /^more\s+wizard$/i.test(lower)) {
    return { handled: true, response: 'Garden-wizard personality set to high. The mushrooms have been notified.', prefChange: { intensity: 'high' } };
  }
  if (/^be\s+less\s+wizard(l?y)?$/i.test(lower) || /^show\s+less\s+personality$/i.test(lower) || /^less\s+wizard$/i.test(lower)) {
    return { handled: true, response: 'Oracle personality set to low. Practical robes on.', prefChange: { intensity: 'low' } };
  }
  if (/^use\s+plain\s+mode$/i.test(lower)) {
    return { handled: true, response: 'Oracle personality set to low. Practical robes on.', prefChange: { intensity: 'low' } };
  }
  if (/^reset\s+oracle\s+style$/i.test(lower)) {
    return {
      handled: true,
      response: 'Oracle style reset to defaults: medium personality, tarot symbolism on, default sources.',
      prefChange: { intensity: 'medium', tarot: true, sources: 'default' },
    };
  }

  return { handled: false };
}

interface Message {
  role: 'user' | 'oracle';
  text: string;
  isFallback?: boolean;
  isError?: boolean;
}

const starterPrompts = [
  { label: 'Love & relationships', question: 'I have a question about love and relationships.' },
  { label: 'Community decision', question: 'How should our community approach a difficult decision?' },
  { label: 'Garden care', question: 'I need guidance caring for a garden.' },
  { label: 'The 3\u20116\u20119 Path', question: 'What is the 3-6-9 Path in the Green Resonance framework?' },
  { label: 'Tarot reflection', question: 'Tell me about the tarot reading and how it connects to the framework.' },
];

const WELCOME_MSG: Message = {
  role: 'oracle',
  text: 'I am the Green Resonance Oracle \u2014 the Benevolent Chaotic Archivist. Part garden librarian, part pattern-finder, always curious.\n\nI offer reflective guidance grounded in the six Pillars, nine Portals, and Central Heart. Type /help to see available commands, or choose a topic below.\n\nI am not a medical, legal, or financial advisor.',
};

function OraclePanel() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showMoral, setShowMoral] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [intensity, setIntensity] = useState<Intensity>(() =>
    loadPref(PREF_KEYS.intensity, 'medium' as Intensity, (v) => ['low', 'medium', 'high'].includes(v))
  );
  const [tarotOn, setTarotOn] = useState<boolean>(() =>
    loadPref(PREF_KEYS.tarot, true, (v) => v === 'true' || v === 'false') === true
      || localStorage.getItem(PREF_KEYS.tarot) !== 'false'
  );
  const [sourcesPref, setSourcesPref] = useState<SourcesPref>(() =>
    loadPref(PREF_KEYS.sources, 'default' as SourcesPref, (v) => ['default', 'on', 'off'].includes(v))
  );

  const applyPrefChange = useCallback((change: CommandResult['prefChange']) => {
    if (!change) return;
    if (change.intensity !== undefined) {
      setIntensity(change.intensity);
      savePref(PREF_KEYS.intensity, change.intensity);
    }
    if (change.tarot !== undefined) {
      setTarotOn(change.tarot);
      savePref(PREF_KEYS.tarot, String(change.tarot));
    }
    if (change.sources !== undefined) {
      setSourcesPref(change.sources);
      savePref(PREF_KEYS.sources, change.sources);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const addExchange = async (question: string) => {
    const cmd = resolveOracleCommand(question);
    if (cmd.handled) {
      const userMsg: Message = { role: 'user', text: question };
      setMessages((prev) => [...prev, userMsg]);
      if (cmd.prefChange) applyPrefChange(cmd.prefChange);
      if (cmd.response) {
        setMessages((prev) => [...prev, { role: 'oracle', text: cmd.response! }]);
      }
      return;
    }

    const userMsg: Message = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setLastFailedQuestion(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/oracle-chat`;
      const history = messages.filter((m) => m !== WELCOME_MSG).slice(-10);
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history,
          tarotSymbolismInChat: tarotOn,
          oraclePersonalityIntensity: intensity,
          sourcesPreference: sourcesPref,
        }),
        signal: AbortSignal.timeout(18000),
      });
      const data = await res.json();

      if (data.ok && data.source === 'ai') {
        setMessages((prev) => [...prev, { role: 'oracle', text: data.reply }]);
      } else if (data.reply) {
        setMessages((prev) => [...prev, {
          role: 'oracle',
          text: data.reply,
          isFallback: true,
        }]);
        setLastFailedQuestion(question);
      } else if (data.error) {
        const errorText = res.status === 429
          ? 'The Oracle needs a moment to rest. Please try again in a few minutes.'
          : 'The Oracle could not reach its AI connection right now.';
        setMessages((prev) => [...prev, { role: 'oracle', text: errorText, isError: true }]);
        setLastFailedQuestion(question);
      } else {
        setMessages((prev) => [...prev, {
          role: 'oracle',
          text: 'The Oracle could not reach its AI connection right now.',
          isError: true,
        }]);
        setLastFailedQuestion(question);
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: 'oracle',
        text: 'The Oracle could not connect to the server. Please check your connection and try again.',
        isError: true,
      }]);
      setLastFailedQuestion(question);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;
    addExchange(trimmed);
    setInput('');
  };

  const showStarters = messages.length <= 1;

  return (
    <>
      <div className="p-4 border-b border-solarpunk-moss/30 bg-[#0d1f16] flex items-center gap-2 shrink-0">
        <Sparkles className="w-5 h-5 text-solarpunk-amber" />
        <h3 className="font-display text-sm tracking-widest text-solarpunk-amber flex-1">GREEN RESONANCE ORACLE</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'bg-[#1a3226] text-solarpunk-biolum' : 'text-[#f5fff8]/60 hover:text-[#f5fff8]'}`}
          aria-label="Oracle settings"
          aria-expanded={showSettings}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-solarpunk-moss/25 bg-[#0d1f16] shrink-0"
          >
            <div className="p-3 space-y-3">
              <div>
                <label className="text-[10px] font-display tracking-wider text-[#f5fff8]/70 block mb-1.5">Oracle personality</label>
                <div className="flex gap-1">
                  {(['low', 'medium', 'high'] as Intensity[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => { setIntensity(level); savePref(PREF_KEYS.intensity, level); }}
                      className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-display tracking-wide transition-all ${
                        intensity === level
                          ? 'bg-[#1a3226] text-solarpunk-biolum border border-solarpunk-biolum/40'
                          : 'bg-[#1a3226] text-[#f5fff8]/70 border border-transparent hover:bg-[#254434]'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-[10px] font-display tracking-wider text-[#f5fff8]/70">Tarot symbolism in chat</label>
                <button
                  onClick={() => { const next = !tarotOn; setTarotOn(next); savePref(PREF_KEYS.tarot, String(next)); }}
                  className={`relative w-9 h-5 rounded-full transition-colors ${tarotOn ? 'bg-solarpunk-biolum/50' : 'bg-[#1a3226]'}`}
                  role="switch"
                  aria-checked={tarotOn}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${tarotOn ? 'left-[18px] bg-solarpunk-biolum' : 'left-0.5 bg-[#f5fff8]/80'}`} />
                </button>
              </div>

              <p className="text-[9px] font-body text-[#f5fff8]/60 text-center">
                Oracle style: {intensity.charAt(0).toUpperCase() + intensity.slice(1)} · Tarot symbolism: {tarotOn ? 'On' : 'Off'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[160px]"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-[#1a3226] border border-solarpunk-canopy/40 text-[#f5fff8] rounded-br-sm'
                  : msg.isError
                    ? 'bg-[#3d1512] border border-red-500/40 text-[#f5fff8]/90 rounded-bl-sm'
                    : msg.isFallback
                      ? 'bg-[#3a2c10] border border-amber-500/40 text-[#f5fff8]/90 rounded-bl-sm'
                      : 'bg-[#1a3226] border border-solarpunk-moss/40 text-[#f5fff8]/95 rounded-bl-sm'
              }`}
            >
              {msg.isFallback && (
                <span className="block text-[10px] font-display tracking-wider text-amber-400/70 mb-1.5">
                  Limited reference guidance \u2014 AI unavailable
                </span>
              )}
              {msg.isError && (
                <span className="block text-[10px] font-display tracking-wider text-red-400/70 mb-1.5">
                  Connection issue
                </span>
              )}
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isThinking && (
          <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-[#1a3226] border border-solarpunk-moss/40 text-[#f5fff8]/70 text-sm font-body">
              The Oracle is pondering...
            </div>
          </motion.div>
        )}

        {lastFailedQuestion && !isThinking && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => { setLastFailedQuestion(null); addExchange(lastFailedQuestion); }}
              className="px-4 py-1.5 rounded-full text-xs font-display tracking-wide bg-[#1a3226] text-solarpunk-biolum border border-solarpunk-biolum/40 hover:bg-[#254434] transition-all"
            >
              Retry last question
            </button>
          </motion.div>
        )}

        {showStarters && !isThinking && (
          <div className="flex flex-wrap gap-2 pt-2">
            {starterPrompts.map((sp) => (
              <button
                key={sp.label}
                onClick={() => addExchange(sp.question)}
                className="px-3 py-1.5 rounded-full text-xs font-display tracking-wide bg-[#1a3226] text-solarpunk-biolum border border-solarpunk-biolum/40 hover:bg-[#254434] transition-all"
              >
                {sp.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-solarpunk-moss/25 shrink-0">
        <button
          onClick={() => setShowMoral(!showMoral)}
          className="w-full flex items-center justify-between px-4 py-2 text-[#f5fff8]/60 hover:text-[#f5fff8]/85 transition-colors"
          aria-expanded={showMoral}
        >
          <span className="text-[10px] font-body tracking-wider">Moral code &amp; sources</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${showMoral ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {showMoral && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 space-y-2">
                <p className="text-[#f5fff8]/60 text-[10px] font-body leading-relaxed">
                  The Green Resonance Moral code &amp; Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life:
                </p>
                <p className="text-[#f5fff8]/50 text-[10px] font-body">
                  &copy; 2026 The Green Resonance Project. All rights reserved.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-solarpunk-moss/30 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the Oracle... (or type /help)"
            className="flex-1 bg-[#0d1f16] border border-solarpunk-moss/40 rounded-xl px-4 py-2.5 text-sm font-body text-[#f5fff8] placeholder:text-[#f5fff8]/50 focus:outline-none focus:border-solarpunk-biolum/60 transition-colors"
            aria-label="Type your question for the Oracle"
          />
          <button
            onClick={handleSend}
            className="p-2.5 rounded-xl bg-[#1a3226] hover:bg-[#254434] text-solarpunk-biolum transition-colors"
            aria-label="Send question to the Oracle"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

interface JournalEntry {
  id: string;
  date: string;
  pillar: string;
  text: string;
}

const pillarOptions = [
  'Awareness & Discernment',
  'Ethical Living',
  'Systems Intelligence',
  'Human & Earth Integration',
  'Embodiment & Action',
  'Ethereal Resonance',
  'General',
];

const JOURNAL_KEY = 'green-resonance-journal';

function JournalPanel() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('General');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch { /* localStorage unavailable */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    } catch { /* localStorage unavailable */ }
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      pillar: selectedPillar,
      text: newEntry.trim(),
    };
    setEntries([entry, ...entries]);
    setNewEntry('');
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <>
      <div className="p-4 border-b border-solarpunk-moss/30 bg-[#0d1f16] flex items-center gap-2 shrink-0">
        <BookOpen className="w-5 h-5 text-gold-sacred" />
        <h3 className="font-display text-sm tracking-widest text-gold-sacred">RESONANCE JOURNAL</h3>
      </div>

      <div className="p-3 border-b border-solarpunk-moss/30 bg-[#0d1f16] shrink-0">
        <div className="flex gap-2 mb-2">
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="flex-1 bg-[#0d1f16] border border-gold-sacred/40 rounded-lg px-3 py-2 text-xs font-body text-[#f5fff8] focus:outline-none focus:border-gold-sacred/60 transition-colors appearance-none"
          >
            {pillarOptions.map((p) => (
              <option key={p} value={p} className="bg-[#0d1f16]">{p}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addEntry();
              }
            }}
            placeholder="Write your reflection..."
            rows={2}
            className="flex-1 bg-[#0d1f16] border border-gold-sacred/40 rounded-xl px-4 py-2.5 text-sm font-body text-[#f5fff8] placeholder:text-[#f5fff8]/50 focus:outline-none focus:border-gold-sacred/60 transition-colors resize-none"
          />
          <button
            onClick={addEntry}
            className="p-2.5 rounded-xl bg-[#1a3226] hover:bg-[#254434] text-gold-sacred transition-colors self-end"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[100px]">
        {entries.length === 0 && (
          <p className="font-sacred text-[#f5fff8]/55 text-sm text-center py-6 italic">
            Your journal awaits. Write your first reflection.
          </p>
        )}
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            className="p-3 rounded-xl bg-[#1a3226] border border-gold-sacred/30 group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-display tracking-wider text-gold-sacred/75">{entry.date}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-display tracking-wider text-[#f5fff8]/60">{entry.pillar}</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete entry from ${entry.date}`}
                >
                  <Trash2 className="w-3 h-3 text-[#f5fff8]/60 hover:text-red-400" />
                </button>
              </div>
            </div>
            <p className="font-body text-sm text-[#f5fff8]/90 leading-relaxed">{entry.text}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const frequencies = [
  { name: 'C \u2014 Sun',     freq: 523.25, color: '#D4AF37', desc: 'Vitality & illumination' },
  { name: 'D \u2014 Moon',    freq: 587.33, color: '#C0C0C0', desc: 'Reflection & cycles' },
  { name: 'E \u2014 Mercury', freq: 659.25, color: '#68E3D4', desc: 'Communication & learning' },
  { name: 'F \u2014 Venus',   freq: 698.46, color: '#B87333', desc: 'Beauty & harmony' },
  { name: 'G \u2014 Mars',    freq: 783.99, color: '#E53935', desc: 'Courage & action' },
  { name: 'A \u2014 Jupiter', freq: 880.00, color: '#10b981', desc: 'Wisdom & abundance' },
  { name: 'B \u2014 Saturn',  freq: 987.77, color: '#1B365D', desc: 'Structure & time' },
];

function HarmonicPanel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => { stopSound(); };

  }, []);

  const stopSound = () => {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch { /* already stopped */ }
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const playFreq = (freq: number, index: number) => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    stopSound();

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;
    setActiveFreq(index);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        newMuted ? 0 : 0.15,
        audioCtxRef.current.currentTime + 0.1,
      );
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      stopSound();
      setActiveFreq(null);
    }
  };

  return (
    <>
      <div className="p-4 border-b border-solarpunk-moss/30 bg-[#0d1f16] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-ether" />
            <h3 className="font-display text-sm tracking-widest text-cyan-ether">HARMONIC FREQUENCIES</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePause}
              className="p-1.5 rounded-lg bg-[#1a3226] text-[#f5fff8]/70 hover:text-[#f5fff8] transition-colors"
              aria-label={isPlaying ? 'Pause frequency' : 'Play frequency'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-[#1a3226] text-[#f5fff8]/70 hover:text-[#f5fff8] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <p className="text-[10px] font-body text-[#f5fff8]/55 mt-1">
          Symbolic and contemplative. Not scientific proof. No autoplay.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {frequencies.map((f, i) => (
          <motion.button
            key={f.name}
            onClick={() => playFreq(f.freq, i)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1a3226] transition-all group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{
                backgroundColor: activeFreq === i ? `${f.color}25` : `${f.color}10`,
                boxShadow: activeFreq === i ? `0 0 12px ${f.color}30` : 'none',
              }}
            >
              <div
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor: f.color,
                  opacity: activeFreq === i ? 1 : 0.5,
                }}
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-display tracking-wider text-[#f5fff8]/90 group-hover:text-[#f5fff8] transition-colors">
                {f.name}
              </p>
              <p className="text-[10px] font-body text-[#f5fff8]/60">{f.desc}</p>
            </div>
            <span className="text-[10px] font-display text-[#f5fff8]/50">{f.freq}Hz</span>
          </motion.button>
        ))}
      </div>
    </>
  );
}

const AUDIO_FILE = '/audio/01-main-bgm.mp3';
const AUDIO_PREF_KEY = 'grp-audio-enabled';

export default function FloatingToolbar() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePanel = useCallback((id: 'journal' | 'harmonic' | 'oracle') => {
    setActivePanel((prev) => (prev === id ? null : id));
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(AUDIO_PREF_KEY, next.toString()); } catch { /* noop */ }
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUDIO_PREF_KEY);
      if (saved === 'true') setAudioEnabled(true);
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0;

    if (fadeRef.current) clearInterval(fadeRef.current);

    if (audioEnabled) {
      audio.play().catch(() => {});
      let vol = 0;
      fadeRef.current = setInterval(() => {
        vol += 0.01;
        if (vol >= 0.216) { vol = 0.216; if (fadeRef.current) clearInterval(fadeRef.current); }
        audio.volume = vol;
      }, 100);
    } else {
      let vol = audio.volume;
      fadeRef.current = setInterval(() => {
        vol -= 0.01;
        if (vol <= 0) { vol = 0; audio.pause(); if (fadeRef.current) clearInterval(fadeRef.current); }
        audio.volume = vol;
      }, 60);
    }
    return () => { if (fadeRef.current) clearInterval(fadeRef.current); };
  }, [audioEnabled]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePanel) {
        const btn = buttonRefs.current[activePanel];
        setActivePanel(null);
        requestAnimationFrame(() => btn?.focus());
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activePanel]);

  useEffect(() => {
    if (activePanel && panelRef.current) {
      requestAnimationFrame(() => panelRef.current?.focus());
    }
  }, [activePanel]);

  const ctxValue: ToolbarContextValue = { activePanel, setActivePanel };

  return (
    <ToolbarContext.Provider value={ctxValue}>
      <audio ref={audioRef} preload="auto">
        <source src={AUDIO_FILE} type="audio/mpeg" />
      </audio>

      <AnimatePresence mode="wait">
        {activePanel && (
          <motion.div
            key={activePanel}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label={
              activePanel === 'oracle'
                ? 'Green Resonance Oracle chat'
                : activePanel === 'journal'
                  ? 'Resonance Journal'
                  : 'Harmonic Frequencies Player'
            }
            className="fixed z-[998] bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-0 sm:right-4 w-full sm:w-[400px] max-h-[70vh] bg-[#10251b] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col outline-none border border-solarpunk-moss/40"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => {
                const btn = buttonRefs.current[activePanel];
                setActivePanel(null);
                requestAnimationFrame(() => btn?.focus());
              }}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-[#1a3226] hover:bg-[#254434] text-[#f5fff8]/70 hover:text-[#f5fff8] transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>

            {activePanel === 'oracle' && <OraclePanel />}
            {activePanel === 'journal' && <JournalPanel />}
            {activePanel === 'harmonic' && <HarmonicPanel />}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="fixed bottom-0 right-0 z-[999] w-full sm:w-auto sm:bottom-4 sm:right-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div
          className="
            flex items-center justify-center gap-4
            bg-[#10251b] rounded-none sm:rounded-2xl
            px-5 py-3
            border-t sm:border
            border-solarpunk-moss/40
            sm:border-solarpunk-moss/40
          "
          style={{
            borderImage: 'linear-gradient(90deg, #d4a843, #39ff8c) 1',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px sm:hidden"
            style={{
              background: 'linear-gradient(90deg, #d4a843, #39ff8c)',
            }}
          />

          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isAudio = tool.id === 'audio';
            const isActive = isAudio ? audioEnabled : activePanel === tool.id;

            return (
              <motion.button
                key={tool.id}
                ref={(el) => { buttonRefs.current[tool.id] = el; }}
                onClick={() => {
                  if (isAudio) {
                    toggleAudio();
                  } else {
                    togglePanel(tool.id as 'journal' | 'harmonic' | 'oracle');
                  }
                }}
                className={`
                  relative flex items-center justify-center
                  w-11 h-11 min-w-[44px] min-h-[44px]
                  rounded-xl transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10251b]
                  ${isActive
                    ? `ring-2 ${tool.ringClass}`
                    : 'hover:bg-[#1a3226]'
                  }
                `}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label={
                  isAudio
                    ? audioEnabled
                      ? 'Disable ambient audio'
                      : 'Enable ambient audio'
                    : activePanel === tool.id
                      ? `Close ${tool.label}`
                      : `Open ${tool.label}`
                }
                aria-pressed={isActive}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color: isActive ? tool.color : 'rgba(245,255,248,0.8)' }}
                />

                {isActive && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: tool.color }}
                    layoutId="toolbar-dot"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </ToolbarContext.Provider>
  );
}

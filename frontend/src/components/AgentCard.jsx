import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AgentCard = ({ title, agentName, colorTheme = 'blue', contentData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeStyles = {
    blue: {
      glow: 'bg-blue-500',
      text: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      icon: Cpu,
    },
    emerald: {
      glow: 'bg-emerald-500',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20',
      icon: DollarSign,
    },
    purple: {
      glow: 'bg-purple-500',
      text: 'text-purple-400',
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/20',
      icon: Users,
    },
    pink: {
      glow: 'bg-pink-500',
      text: 'text-pink-400',
      bg: 'bg-pink-500/5',
      border: 'border-pink-500/20',
      icon: TrendingUp,
    },
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.blue;
  const IconComponent = currentTheme.icon;

  // Extremely sleek markdown parser to make bullet points and key features stand out
  const renderFormattedText = (rawText) => {
    if (!rawText) return <p className="text-slate-500 italic">Analysis processing...</p>;

    // Handle array formats (e.g. Gemini parts [{ type: 'text', text: '...' }])
    if (Array.isArray(rawText)) {
      const extractedText = rawText
        .map((part) => (typeof part === 'object' && part ? part.text || '' : part))
        .join('\n');
      return renderFormattedText(extractedText);
    }

    // If it is an object/array, stringify or map it nicely
    if (typeof rawText !== 'string') {
      return (
        <pre className="text-xs font-mono text-slate-350 bg-slate-950 p-3 rounded-lg overflow-x-auto">
          {JSON.stringify(rawText, null, 2)}
        </pre>
      );
    }

    const lines = rawText.split('\n');

    return (
      <div className="space-y-3.5">
        {lines.map((line, idx) => {
          let cleanLine = line.trim();
          if (!cleanLine) return null;

          // Headers like ### or ##
          if (cleanLine.startsWith('#')) {
            const level = cleanLine.match(/^#+/)[0].length;
            const text = cleanLine.replace(/^#+\s*/, '');
            const sizeClass = level === 1 ? 'text-xl' : level === 2 ? 'text-lg' : 'text-md';
            return (
              <h5 key={idx} className={`${sizeClass} font-bold text-white tracking-tight mt-6 mb-2`}>
                {text}
              </h5>
            );
          }

          // Bullet points starting with - or *
          if (cleanLine.startsWith('-') || cleanLine.startsWith('*')) {
            const bulletText = cleanLine.replace(/^[-*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.glow} mt-2 shrink-0`} />
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {parseInlineFormatting(bulletText)}
                </p>
              </div>
            );
          }

          // Plain text paragraph
          return (
            <p key={idx} className="text-sm text-slate-300 leading-relaxed font-normal">
              {parseInlineFormatting(cleanLine)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper to parse **bold** and `code` formatting
  const parseInlineFormatting = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs text-blue-450 border border-slate-850">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full rounded-2xl glass-panel border ${isOpen ? currentTheme.border : 'border-slate-800/80'} overflow-hidden transition-all duration-300`}
    >
      {/* Card Header clickable button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-slate-900/10 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-3 rounded-xl bg-slate-950 border border-slate-850 ${currentTheme.text}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase">
              {agentName}
            </span>
            <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Node Active Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-ping"></span>
            ACTIVE NODE
          </span>
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Expandable Agent Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-900 bg-slate-950/20"
          >
            <div className="p-6 md:p-8 space-y-6">
              {/* Custom agent evaluation body */}
              <div className="prose prose-invert max-w-none">
                {renderFormattedText(contentData)}
              </div>

              {/* Bot-signature watermark */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 pt-4 border-t border-slate-900">
                <span>ORCHESTRATED PROTOCOL: SECURE</span>
                <span>SYSTEM_NODE: {title.toUpperCase().replace(' ', '_')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgentCard;

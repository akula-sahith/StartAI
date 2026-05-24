import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AgentCard = ({ title, agentName, colorTheme = 'blue', contentData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeStyles = {
    blue: {
      dot: 'bg-indigo-500',
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/5',
      border: 'border-indigo-500/20',
      icon: Cpu,
    },
    emerald: {
      dot: 'bg-emerald-500',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/20',
      icon: DollarSign,
    },
    purple: {
      dot: 'bg-violet-500',
      text: 'text-violet-400',
      bg: 'bg-violet-500/5',
      border: 'border-violet-500/20',
      icon: Users,
    },
    pink: {
      dot: 'bg-amber-500',
      text: 'text-amber-400',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      icon: TrendingUp,
    },
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.blue;
  const IconComponent = currentTheme.icon;

  // Markdown parser for bullet points and key features
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
        <pre className="text-xs font-mono text-slate-400 bg-slate-900/50 p-3 rounded-lg overflow-x-auto">
          {JSON.stringify(rawText, null, 2)}
        </pre>
      );
    }

    const lines = rawText.split('\n');

    return (
      <div className="space-y-3">
        {lines.map((line, idx) => {
          let cleanLine = line.trim();
          if (!cleanLine) return null;

          // Headers like ### or ##
          if (cleanLine.startsWith('#')) {
            const level = cleanLine.match(/^#+/)[0].length;
            const text = cleanLine.replace(/^#+\s*/, '');
            const sizeClass = level === 1 ? 'text-xl' : level === 2 ? 'text-lg' : 'text-md';
            return (
              <h5 key={idx} className={`${sizeClass} font-semibold text-white tracking-tight mt-5 mb-1.5`}>
                {text}
              </h5>
            );
          }

          // Bullet points starting with - or *
          if (cleanLine.startsWith('-') || cleanLine.startsWith('*')) {
            const bulletText = cleanLine.replace(/^[-*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} mt-2 shrink-0 opacity-70`} />
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
        return <strong key={idx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="bg-slate-800/80 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-300 border border-slate-700/50">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full rounded-xl surface-card ${isOpen ? currentTheme.border : 'border-slate-800'} overflow-hidden transition-all duration-300`}
    >
      {/* Card Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-slate-800/20 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 ${currentTheme.text}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium tracking-wide text-slate-500 block uppercase">
              {agentName}
            </span>
            <h4 className="text-base font-semibold text-white tracking-tight">{title}</h4>
          </div>
        </div>

        <div className="p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-800"
          >
            <div className="p-5 md:p-7 space-y-5">
              {/* Agent evaluation body */}
              <div className="prose prose-invert max-w-none">
                {renderFormattedText(contentData)}
              </div>

              {/* Watermark */}
              <div className="flex justify-between items-center text-[11px] text-slate-600 pt-4 border-t border-slate-800">
                <span>Powered by StartAI</span>
                <span>Agent: {title}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgentCard;

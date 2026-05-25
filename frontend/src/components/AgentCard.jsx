import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AgentCard = ({ title, agentName, colorTheme = 'black', contentData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeStyles = {
    black: {
      dot: 'bg-white',
      text: 'text-neutral-400',
      bg: 'bg-neutral-900',
      border: 'border-neutral-800',
      icon: Cpu,
    }
  };

  const currentTheme = themeStyles[colorTheme] || themeStyles.black;
  const IconComponent = currentTheme.icon;

  // Markdown parser for bullet points and key features
  const renderFormattedText = (rawText) => {
    if (!rawText) return <p className="text-neutral-500 italic">Analysis processing...</p>;

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
        <pre className="text-xs font-mono text-neutral-400 bg-neutral-900 p-3 rounded-lg overflow-x-auto">
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
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {parseInlineFormatting(bulletText)}
                </p>
              </div>
            );
          }

          // Plain text paragraph
          return (
            <p key={idx} className="text-sm text-neutral-300 leading-relaxed font-normal">
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
        return <code key={idx} className="bg-neutral-900 px-1.5 py-0.5 rounded font-mono text-xs text-neutral-300 border border-neutral-800">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full rounded-xl surface-card border ${isOpen ? currentTheme.border : 'border-neutral-800'} overflow-hidden transition-all duration-300`}
    >
      {/* Card Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-neutral-900 transition-colors"
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 ${currentTheme.text}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">
              {agentName}
            </span>
            <h4 className="text-base font-semibold text-white tracking-tight">{title}</h4>
          </div>
        </div>

        <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
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
            className="border-t border-neutral-800"
          >
            <div className="p-5 md:p-7 space-y-5">
              {/* Agent evaluation body */}
              <div className="prose prose-invert max-w-none">
                {renderFormattedText(contentData)}
              </div>

              {/* Watermark */}
              <div className="flex justify-between items-center text-[11px] text-neutral-600 pt-4 border-t border-neutral-800">
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

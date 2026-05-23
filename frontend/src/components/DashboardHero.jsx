import React from 'react';
import { motion } from 'framer-motion';
import { Info, Layers, Tag, HelpCircle, Terminal } from 'lucide-react';

const DashboardHero = ({ name, domain, mode, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative rounded-2xl glass-panel border border-slate-800/80 p-6 md:p-8 overflow-hidden"
    >
      {/* Background neon glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow-blue opacity-10 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              COGNITIVE WORKSPACE
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Tag className="w-3 h-3" />
              {domain}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold font-mono">
              <Terminal className="w-3 h-3" />
              {mode ? mode.toUpperCase() : 'OPTIMIZATION'}
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {name}
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Technical specifications overlay */}
        <div className="shrink-0 flex flex-row md:flex-col gap-4 text-xs font-mono text-slate-500 bg-slate-950/60 p-4 rounded-xl border border-slate-850 self-stretch md:self-auto justify-between md:justify-center">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">DATABASE STORAGE</div>
            <div className="text-white font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              SECURE POSTGRES
            </div>
          </div>
          <div className="hidden md:block w-full h-[1px] bg-slate-850"></div>
          <div className="space-y-1">
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">COGNITIVE COMPILING</div>
            <div className="text-white font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              LANGGRAPH
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHero;

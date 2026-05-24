import React from 'react';
import { motion } from 'framer-motion';
import { Info, Layers, Tag, HelpCircle, Terminal } from 'lucide-react';

const DashboardHero = ({ name, domain, mode, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative rounded-xl surface-card p-6 md:p-8 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium tracking-wide text-slate-500 bg-slate-800/50 border border-slate-700/40 px-2.5 py-1 rounded-md uppercase">
              Workspace
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/8 border border-indigo-500/15 text-indigo-400 text-xs font-medium">
              <Tag className="w-3 h-3" />
              {domain}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/40 text-slate-400 text-xs font-medium">
              <Terminal className="w-3 h-3" />
              {mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : 'Optimization'}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            {name}
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Technical specifications */}
        <div className="shrink-0 flex flex-row md:flex-col gap-4 text-xs text-slate-500 bg-slate-800/30 p-4 rounded-lg border border-slate-700/40 self-stretch md:self-auto justify-between md:justify-center">
          <div className="space-y-1">
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Storage</div>
            <div className="text-white font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              PostgreSQL
            </div>
          </div>
          <div className="hidden md:block w-full h-[1px] bg-slate-700/40"></div>
          <div className="space-y-1">
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Runtime</div>
            <div className="text-white font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              LangGraph
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHero;

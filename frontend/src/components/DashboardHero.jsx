import React from 'react';
import { motion } from 'framer-motion';
import { Info, Layers, Tag, HelpCircle, Terminal } from 'lucide-react';

const DashboardHero = ({ name, domain, mode, description, userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative rounded-xl surface-card p-6 md:p-8 overflow-hidden border-neutral-800"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4">
          {/* Personalized Welcome */}
          {userName && (
            <p className="text-sm text-neutral-400">
              Welcome back, <span className="text-white font-medium">{userName}</span>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-medium tracking-wide text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md uppercase">
              Workspace
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
              <Tag className="w-3 h-3" />
              {domain}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium">
              <Terminal className="w-3 h-3" />
              {mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : 'Optimization'}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            {name}
          </h2>
          
          <p className="text-neutral-400 text-sm leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* Technical specifications */}
        <div className="shrink-0 flex flex-row md:flex-col gap-4 text-xs text-neutral-400 bg-neutral-900/50 p-4 rounded-lg border border-neutral-800 self-stretch md:self-auto justify-between md:justify-center">
          <div className="space-y-1">
            <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wide">Storage</div>
            <div className="text-white font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              PostgreSQL
            </div>
          </div>
          <div className="hidden md:block w-full h-[1px] bg-neutral-800"></div>
          <div className="space-y-1">
            <div className="text-[11px] text-neutral-500 font-medium uppercase tracking-wide">Runtime</div>
            <div className="text-white font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              LangGraph
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHero;

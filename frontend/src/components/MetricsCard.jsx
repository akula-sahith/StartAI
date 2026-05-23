import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const MetricsCard = ({ title, value, subtitle, icon: Icon, colorTheme = 'blue', percentage }) => {
  const themes = {
    blue: {
      glow: 'bg-blue-500',
      text: 'text-blue-400',
      border: 'group-hover:border-blue-500/20',
      progress: 'bg-blue-500'
    },
    emerald: {
      glow: 'bg-emerald-500',
      text: 'text-emerald-400',
      border: 'group-hover:border-emerald-500/20',
      progress: 'bg-emerald-500'
    },
    purple: {
      glow: 'bg-purple-500',
      text: 'text-purple-400',
      border: 'group-hover:border-purple-500/20',
      progress: 'bg-purple-500'
    },
    pink: {
      glow: 'bg-pink-500',
      text: 'text-pink-400',
      border: 'group-hover:border-pink-500/20',
      progress: 'bg-pink-500'
    },
    amber: {
      glow: 'bg-amber-500',
      text: 'text-amber-400',
      border: 'group-hover:border-amber-500/20',
      progress: 'bg-amber-500'
    }
  };

  const theme = themes[colorTheme] || themes.blue;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl glass-panel p-5 border border-slate-800/80 transition-all duration-300 ${theme.border} flex flex-col justify-between overflow-hidden`}
    >
      {/* Glow highlight */}
      <div className={`absolute top-0 left-0 w-24 h-24 rounded-full ${theme.glow} opacity-5 blur-2xl pointer-events-none group-hover:opacity-8 transition-opacity`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">{title}</span>
        <div className={`p-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 ${theme.text}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1 relative z-10">
        <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
        {subtitle && <p className="text-xs text-slate-550 text-slate-500 font-medium">{subtitle}</p>}
      </div>

      {percentage !== undefined && (
        <div className="mt-4 space-y-1 relative z-10">
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>INDEX STATUS</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
            <div className={`h-full ${theme.progress} rounded-full`} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MetricsCard;

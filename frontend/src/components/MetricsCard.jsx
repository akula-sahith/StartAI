import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const MetricsCard = ({ title, value, subtitle, icon: Icon, colorTheme = 'blue', percentage }) => {
  const themes = {
    blue: {
      text: 'text-indigo-400',
      border: 'group-hover:border-indigo-500/20',
      progress: 'bg-indigo-500'
    },
    emerald: {
      text: 'text-emerald-400',
      border: 'group-hover:border-emerald-500/20',
      progress: 'bg-emerald-500'
    },
    purple: {
      text: 'text-violet-400',
      border: 'group-hover:border-violet-500/20',
      progress: 'bg-violet-500'
    },
    pink: {
      text: 'text-amber-400',
      border: 'group-hover:border-amber-500/20',
      progress: 'bg-amber-500'
    },
    amber: {
      text: 'text-amber-400',
      border: 'group-hover:border-amber-500/20',
      progress: 'bg-amber-500'
    }
  };

  const theme = themes[colorTheme] || themes.blue;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group relative rounded-xl surface-card p-5 transition-all duration-300 ${theme.border} flex flex-col justify-between overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">{title}</span>
        <div className={`p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 ${theme.text}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
        {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
      </div>

      {percentage !== undefined && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${theme.progress} rounded-full`} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MetricsCard;

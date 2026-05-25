import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const MetricsCard = ({ title, value, subtitle, icon: Icon, colorTheme = 'black', percentage }) => {
  const themes = {
    black: {
      text: 'text-neutral-400',
      border: 'border-neutral-800',
      progress: 'bg-white'
    }
  };

  const theme = themes[colorTheme] || themes.black;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group relative rounded-xl surface-card p-5 transition-all duration-300 border ${theme.border} flex flex-col justify-between overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase">{title}</span>
        <div className={`p-2 rounded-lg bg-neutral-900 border border-neutral-800 ${theme.text}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
        {subtitle && <p className="text-xs text-neutral-500 font-medium">{subtitle}</p>}
      </div>

      {percentage !== undefined && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[11px] text-neutral-500">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className={`h-full ${theme.progress} rounded-full`} style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MetricsCard;

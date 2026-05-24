import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WorkflowCard = ({ title, description, buttonText, route, icon: Icon, colorTheme = 'blue' }) => {
  const styles = {
    blue: {
      borderHover: 'group-hover:border-indigo-500/25',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-500',
      text: 'text-indigo-400'
    },
    purple: {
      borderHover: 'group-hover:border-slate-600',
      buttonBg: 'bg-slate-700 hover:bg-slate-600',
      text: 'text-violet-400'
    }
  };

  const theme = styles[colorTheme] || styles.blue;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`group relative rounded-xl surface-card p-7 flex flex-col justify-between h-[340px] transition-all duration-300 ${theme.borderHover} overflow-hidden`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/40 text-white">
            <Icon className={`w-6 h-6 ${theme.text}`} />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Workflow</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <Link
        to={route}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg text-sm font-semibold text-white transition-all duration-300 ${theme.buttonBg}`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default WorkflowCard;

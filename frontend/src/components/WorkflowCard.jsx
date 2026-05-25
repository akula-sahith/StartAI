import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WorkflowCard = ({ title, description, buttonText, route, icon: Icon, colorTheme = 'black' }) => {
  const styles = {
    black: {
      borderHover: 'group-hover:border-neutral-600',
      buttonBg: 'bg-white hover:bg-neutral-200 text-black',
      text: 'text-neutral-400'
    }
  };

  const theme = styles[colorTheme] || styles.black;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`group relative rounded-xl surface-card p-7 flex flex-col justify-between h-[340px] transition-all duration-300 border border-transparent ${theme.borderHover} overflow-hidden`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white">
            <Icon className={`w-6 h-6 ${theme.text}`} />
          </div>
          <span className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase">Workflow</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <Link
        to={route}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg text-sm font-semibold transition-all duration-300 ${theme.buttonBg}`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default WorkflowCard;

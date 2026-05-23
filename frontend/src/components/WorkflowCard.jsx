import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const WorkflowCard = ({ title, description, buttonText, route, icon: Icon, colorTheme = 'blue' }) => {
  const gradientStyles = {
    blue: {
      insetBg: 'from-blue-500/20 to-indigo-650/20',
      borderHover: 'group-hover:border-blue-500/30',
      buttonBg: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500',
      shadow: 'shadow-blue-500/10',
      glow: 'bg-blue-500',
      text: 'text-blue-400'
    },
    purple: {
      insetBg: 'from-purple-500/20 to-pink-650/20',
      borderHover: 'group-hover:border-purple-500/30',
      buttonBg: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500',
      shadow: 'shadow-purple-500/10',
      glow: 'bg-purple-500',
      text: 'text-purple-400'
    }
  };

  const theme = gradientStyles[colorTheme] || gradientStyles.blue;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className={`group relative rounded-2xl glass-panel-glow p-8 flex flex-col justify-between h-[360px] border border-slate-800/80 transition-all duration-300 ${theme.borderHover} overflow-hidden`}
    >
      {/* Background ambient lighting */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${theme.glow} opacity-5 blur-3xl pointer-events-none group-hover:opacity-10 group-hover:scale-125 transition-all duration-500`}></div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 text-white group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${theme.text}`} />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-slate-550 uppercase">OPERATIONAL WORKFLOW</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
          {description}
        </p>
      </div>

      <Link
        to={route}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-semibold text-white shadow-lg ${theme.shadow} transition-all duration-300 ${theme.buttonBg}`}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default WorkflowCard;

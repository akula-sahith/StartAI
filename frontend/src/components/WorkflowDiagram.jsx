import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, DollarSign, Users, TrendingUp, ShieldAlert, CheckCircle } from 'lucide-react';

const WorkflowDiagram = ({ activeAgent = 'marketing_agent' }) => {
  // Define agent pipeline order
  const pipeline = [
    { id: 'input', label: 'PDF / Input', icon: FileText, color: 'text-slate-400', border: 'border-slate-800 bg-slate-950' },
    { id: 'cto_agent', label: 'CTO Agent', icon: Cpu, color: 'text-blue-400', border: 'border-blue-500/35 bg-blue-955/20 bg-blue-950/20' },
    { id: 'finance_agent', label: 'Finance Agent', icon: DollarSign, color: 'text-emerald-400', border: 'border-emerald-500/35 bg-emerald-955/20 bg-emerald-950/20' },
    { id: 'hiring_agent', label: 'Hiring Agent', icon: Users, color: 'text-purple-400', border: 'border-purple-500/35 bg-purple-955/20 bg-purple-950/20' },
    { id: 'marketing_agent', label: 'Marketing Agent', icon: TrendingUp, color: 'text-pink-400', border: 'border-pink-500/35 bg-pink-955/20 bg-pink-950/20' },
    { id: 'output', label: 'Intelligence', icon: CheckCircle, color: 'text-indigo-400', border: 'border-indigo-500/35 bg-indigo-955/20 bg-indigo-950/20' }
  ];

  return (
    <div className="w-full glass-panel border border-slate-800/80 rounded-2xl p-6 md:p-8 overflow-hidden relative">
      {/* Background glowing particles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-glow-blue opacity-5 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase">LANGGRAPH AGENT FLOW</span>
            <h3 className="text-xl font-bold text-white tracking-tight">System Orchestration Pipeline</h3>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            PIPELINE READY
          </span>
        </div>

        {/* Desktop Horizontal Workflow View */}
        <div className="hidden lg:flex items-center justify-between relative py-6">
          {/* Animated connection line overlay */}
          <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-[2px] bg-slate-900 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-20"></div>
          </div>

          {pipeline.map((node, idx) => {
            const Icon = node.icon;
            
            return (
              <React.Fragment key={node.id}>
                {/* Node representation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-3 relative z-10 w-28 text-center"
                >
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center relative transition-all duration-300 ${node.border} shadow-lg`}>
                    {/* Glowing effect inside node */}
                    <div className="absolute inset-0 rounded-full bg-slate-950 opacity-40"></div>
                    
                    <Icon className={`w-6 h-6 ${node.color} relative z-10`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white tracking-tight">{node.label}</p>
                    <p className="text-[9px] font-mono text-slate-500 mt-0.5">NODE_0{idx + 1}</p>
                  </div>
                </motion.div>

                {/* Animated connectors */}
                {idx < pipeline.length - 1 && (
                  <div className="flex-1 px-2 relative h-8 flex items-center justify-center">
                    <svg className="w-full h-4 overflow-visible" fill="none">
                      <line
                        x1="0"
                        y1="8"
                        x2="100%"
                        y2="8"
                        className="animated-connector"
                        stroke="rgba(59, 130, 246, 0.4)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile/Tablet Vertical Workflow View */}
        <div className="flex lg:hidden flex-col gap-6 relative py-4 pl-6 border-l-2 border-slate-900/60">
          {pipeline.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 relative"
              >
                {/* Visual node line-connect connector */}
                <div className="absolute -left-[31px] w-[11px] h-[2px] bg-slate-800"></div>

                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${node.border} shadow-md`}>
                  <Icon className={`w-4 h-4 ${node.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{node.label}</h4>
                  <p className="text-[10px] font-mono text-slate-500">STAGE PROTOCOL 0{idx + 1}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;

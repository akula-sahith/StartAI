import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, DollarSign, Users, TrendingUp, ShieldAlert, CheckCircle } from 'lucide-react';

const WorkflowDiagram = ({ activeAgent = 'marketing_agent' }) => {
  // Define agent pipeline order
  const pipeline = [
    { id: 'input', label: 'Input', icon: FileText, color: 'text-neutral-400', border: 'border-neutral-800 bg-neutral-900' },
    { id: 'cto_agent', label: 'Technical', icon: Cpu, color: 'text-neutral-400', border: 'border-neutral-800 bg-neutral-900' },
    { id: 'finance_agent', label: 'Financial', icon: DollarSign, color: 'text-neutral-400', border: 'border-neutral-800 bg-neutral-900' },
    { id: 'hiring_agent', label: 'Hiring', icon: Users, color: 'text-neutral-400', border: 'border-neutral-800 bg-neutral-900' },
    { id: 'marketing_agent', label: 'Growth', icon: TrendingUp, color: 'text-neutral-400', border: 'border-neutral-800 bg-neutral-900' },
    { id: 'output', label: 'Results', icon: CheckCircle, color: 'text-white', border: 'border-neutral-600 bg-neutral-800' }
  ];

  return (
    <div className="w-full surface-card rounded-xl p-6 md:p-8 overflow-hidden relative border border-neutral-800">
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">Agent Flow</span>
            <h3 className="text-lg font-bold text-white tracking-tight">Processing Pipeline</h3>
          </div>

        </div>

        {/* Desktop Horizontal View */}
        <div className="hidden lg:flex items-center justify-between relative py-6">
          {/* Connection line */}
          <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-[1px] bg-neutral-800 pointer-events-none"></div>

          {pipeline.map((node, idx) => {
            const Icon = node.icon;
            
            return (
              <React.Fragment key={node.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex flex-col items-center gap-3 relative z-10 w-28 text-center"
                >
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${node.border}`}>
                    <Icon className={`w-5 h-5 ${node.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white tracking-tight">{node.label}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Step {idx + 1}</p>
                  </div>
                </motion.div>

                {/* Connectors */}
                {idx < pipeline.length - 1 && (
                  <div className="flex-1 px-2 relative h-8 flex items-center justify-center">
                    <svg className="w-full h-4 overflow-visible" fill="none">
                      <line
                        x1="0"
                        y1="8"
                        x2="100%"
                        y2="8"
                        className="animated-connector"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Vertical View */}
        <div className="flex lg:hidden flex-col gap-5 relative py-4 pl-6 border-l border-neutral-800">
          {pipeline.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-4 relative"
              >
                <div className="absolute -left-[27px] w-[10px] h-[1px] bg-neutral-800"></div>

                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${node.border}`}>
                  <Icon className={`w-4 h-4 ${node.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-tight">{node.label}</h4>
                  <p className="text-[11px] text-neutral-500">Step {idx + 1}</p>
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

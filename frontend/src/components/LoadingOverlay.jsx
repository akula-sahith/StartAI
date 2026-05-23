import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, DollarSign, Users, TrendingUp, ShieldAlert, Terminal } from 'lucide-react';

const LoadingOverlay = ({ isVisible, mode = 'creation' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState([]);

  const steps = [
    { name: 'Core OS Core Init', desc: 'Synthesizing database workspace & memory nodes', icon: Terminal, color: 'text-slate-400' },
    { name: 'CTO Cognitive Agent', desc: 'Formulating stack recommendations & bottleneck analysis', icon: Cpu, color: 'text-blue-400' },
    { name: 'Finance Expert Agent', desc: 'Projecting operational burns & cloud billing metrics', icon: DollarSign, color: 'text-emerald-400' },
    { name: 'Hiring Coordinator Agent', desc: 'Structuring scale milestones & engineering allocations', icon: Users, color: 'text-purple-400' },
    { name: 'Marketing Strategist Agent', desc: 'Configuring GTM strategies & channel priorities', icon: TrendingUp, color: 'text-pink-400' }
  ];

  // Auto-progress stages to simulate deep workflow analysis
  useEffect(() => {
    if (!isVisible) {
      setActiveStep(0);
      setLogs([]);
      return;
    }

    // Set initial log
    setLogs([`[${new Date().toLocaleTimeString()}] INITIATING WORKSPACE ORCHESTRATION IN MODE: ${mode.toUpperCase()}...`]);

    const logsTemplates = [
      [
        `[${new Date().toLocaleTimeString()}] Postgres connection established.`,
        `[${new Date().toLocaleTimeString()}] Allocated persistent state storage.`,
        `[${new Date().toLocaleTimeString()}] Compiling LangGraph agent graph...`
      ],
      [
        `[${new Date().toLocaleTimeString()}] Launching CTO Agent...`,
        `[${new Date().toLocaleTimeString()}] Modeling system topologies and engineering requirements...`,
        `[${new Date().toLocaleTimeString()}] Analyzing domain stack optimization...`
      ],
      [
        `[${new Date().toLocaleTimeString()}] Launching Finance Agent...`,
        `[${new Date().toLocaleTimeString()}] Calibrating cloud spending budgets...`,
        `[${new Date().toLocaleTimeString()}] Calculating operational runtimes & margin benchmarks...`
      ],
      [
        `[${new Date().toLocaleTimeString()}] Launching Hiring Agent...`,
        `[${new Date().toLocaleTimeString()}] Defining engineering headcount requirements...`,
        `[${new Date().toLocaleTimeString()}] Generating organizational scale checkpoints...`
      ],
      [
        `[${new Date().toLocaleTimeString()}] Launching Marketing Agent...`,
        `[${new Date().toLocaleTimeString()}] Mapping customer acquisition frameworks...`,
        `[${new Date().toLocaleTimeString()}] Finalizing multi-agent intelligence aggregation...`
      ]
    ];

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          // Add logs for next step
          setLogs((currLogs) => [
            ...currLogs,
            `[${new Date().toLocaleTimeString()}] SUCCEEDED: ${steps[prev].name} analysis done.`,
            ...logsTemplates[next]
          ]);
          return next;
        }
        return prev;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible, mode]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md px-4">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-glow-blue opacity-50 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl glass-panel-glow rounded-2xl overflow-hidden scanline-effect p-8 flex flex-col md:flex-row gap-8 relative z-10 border border-slate-800"
        >
          {/* Left panel: Orchestrator visualization */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-xs font-mono font-semibold tracking-widest text-blue-400">ACTIVE WORKSPACE DEPLOYMENT</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Orchestrating Multi-Agent Systems</h2>
              <p className="text-sm text-slate-400 mb-6">
                Coordinated AI executives are building your Startup ecosystem in synchronous micro-loops.
              </p>

              {/* Progress Flow */}
              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCurrent = idx === activeStep;
                  const isCompleted = idx < activeStep;

                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isCurrent
                              ? 'bg-blue-950 border-blue-400 text-blue-400 scale-110 shadow-lg shadow-blue-500/20'
                              : isCompleted
                              ? 'bg-slate-900 border-slate-700 text-emerald-400'
                              : 'bg-slate-950 border-slate-900 text-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-6 my-1 transition-colors duration-300 ${
                              isCompleted ? 'bg-emerald-500/50' : 'bg-slate-800'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p
                          className={`text-sm font-semibold transition-all duration-300 ${
                            isCurrent ? 'text-white' : isCompleted ? 'text-slate-350' : 'text-slate-655 text-slate-600'
                          }`}
                        >
                          {step.name}
                        </p>
                        <p className={`text-xs text-slate-400 mt-0.5 truncate transition-all duration-300 ${isCurrent ? 'opacity-100' : 'opacity-70'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulated loading bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-mono text-slate-500 mb-1.5">
                <span>ORCHESTRATOR PROGRESS</span>
                <span>{Math.round(((activeStep + 0.5) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeStep + 0.5) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Right panel: Terminal logs */}
          <div className="w-full md:w-80 h-72 md:h-auto bg-slate-950 rounded-xl border border-slate-850 p-4 flex flex-col font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2 text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                SYSTEM RUNTIME
              </span>
              <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">LIVE FEED</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 flex flex-col justify-end">
              {logs.map((log, idx) => {
                let colorClass = 'text-slate-400';
                if (log.includes('SUCCEEDED') || log.includes('connection established')) {
                  colorClass = 'text-emerald-400';
                } else if (log.includes('Launching') || log.includes('INITIATING')) {
                  colorClass = 'text-blue-400';
                }
                
                return (
                  <div key={idx} className={`${colorClass} break-all font-mono leading-relaxed`}>
                    {log}
                  </div>
                );
              })}
              {/* Blinking cursor */}
              <div className="flex items-center gap-1 text-slate-450 mt-1">
                <span>_</span>
                <span className="w-1.5 h-3 bg-blue-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;

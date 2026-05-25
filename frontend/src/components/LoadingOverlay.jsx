import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, DollarSign, Users, TrendingUp, Terminal, Check } from 'lucide-react';

const LoadingOverlay = ({ isVisible, mode = 'creation' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  const steps = [
    { name: 'System Initialization', desc: 'Setting up workspace and storage', icon: Terminal },
    { name: 'Technical Analysis', desc: 'Evaluating architecture and infrastructure', icon: Cpu },
    { name: 'Financial Analysis', desc: 'Projecting costs and operational budget', icon: DollarSign },
    { name: 'Team Planning', desc: 'Structuring hiring roadmap and allocations', icon: Users },
    { name: 'Growth Strategy', desc: 'Configuring go-to-market and channels', icon: TrendingUp }
  ];

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Auto-progress stages
  useEffect(() => {
    if (!isVisible) {
      setActiveStep(0);
      setLogs([]);
      return;
    }

    const ts = () => new Date().toLocaleTimeString();
    setLogs([`[${ts()}] Starting workspace ${mode} pipeline...`]);

    const logsTemplates = [
      [
        `[${ts()}] Database connection established.`,
        `[${ts()}] Storage allocated.`,
        `[${ts()}] Compiling agent graph...`
      ],
      [
        `[${ts()}] Running technical analysis...`,
        `[${ts()}] Evaluating system architecture...`,
        `[${ts()}] Analyzing infrastructure requirements...`
      ],
      [
        `[${ts()}] Running financial analysis...`,
        `[${ts()}] Calculating budget projections...`,
        `[${ts()}] Estimating operational costs...`
      ],
      [
        `[${ts()}] Running team analysis...`,
        `[${ts()}] Defining hiring requirements...`,
        `[${ts()}] Generating organizational plan...`
      ],
      [
        `[${ts()}] Running growth analysis...`,
        `[${ts()}] Mapping acquisition channels...`,
        `[${ts()}] Finalizing recommendations...`
      ]
    ];

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          setLogs((currLogs) => [
            ...currLogs,
            `[${ts()}] ✓ ${steps[prev].name} complete.`,
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

  const progressPercent = Math.round(((activeStep + 0.5) / steps.length) * 100);
  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm px-4">
        {/* ──────────────────────────────────────────────
            OUTER CONTAINER — FIXED DIMENSIONS, NEVER RESIZES
            ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl h-[520px] bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col md:flex-row relative z-10"
        >
          {/* ═══════════════════════════════════
              LEFT PANEL — Pipeline & Status
              ═══════════════════════════════════ */}
          <div className="flex-1 flex flex-col p-8 overflow-hidden">

            {/* Header — static, never changes */}
            <div className="shrink-0 mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
                  AI Orchestration Active
                </span>
              </div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Multi-Agent Workflow
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Strategic processing pipeline — {mode === 'creation' ? 'workspace creation' : 'organizational analysis'}
              </p>
            </div>

            {/* Step list — fixed height, items animate in-place */}
            <div className="shrink-0 space-y-0">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCurrent = idx === activeStep;
                const isCompleted = idx < activeStep;

                return (
                  <div key={idx} className="flex items-center gap-3 h-10">
                    {/* Step indicator circle */}
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isCurrent
                          ? 'bg-neutral-900 border-neutral-700 text-white'
                          : isCompleted
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-400'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Step label */}
                    <span
                      className={`text-sm transition-colors duration-500 ${
                        isCurrent ? 'text-white font-medium' : isCompleted ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {step.name}
                    </span>


                  </div>
                );
              })}
            </div>

            {/* Current status — crossfade transition area, fixed height */}
            <div className="mt-auto shrink-0">
              {/* Active agent description — fades between steps */}
              <div className="h-12 flex items-center overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                      <CurrentIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{currentStep.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{currentStep.desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar — always at the same position */}
              <div className="flex justify-between text-[11px] text-neutral-500 mb-1.5">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════
              RIGHT PANEL — Terminal Log
              Fixed width, internal scroll only
              ═══════════════════════════════════ */}
          <div className="w-full md:w-[300px] shrink-0 bg-black border-l border-neutral-800 flex flex-col overflow-hidden">
            {/* Terminal header — static */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-neutral-800 text-neutral-400">
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <Terminal className="w-3.5 h-3.5 text-white" />
                System Log
              </span>
              <span className="text-[10px] bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-500">Live</span>
            </div>

            {/* Log entries — scrollable within fixed bounds */}
            <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[11px] leading-relaxed space-y-1">
              {logs.map((log, idx) => {
                let colorClass = 'text-neutral-500';
                if (log.includes('✓') || log.includes('established')) {
                  colorClass = 'text-neutral-300';
                } else if (log.includes('Running') || log.includes('Starting')) {
                  colorClass = 'text-white';
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`${colorClass} break-all`}
                  >
                    {log}
                  </motion.div>
                );
              })}
              <div ref={logsEndRef} />
              {/* Cursor */}
              <div className="flex items-center gap-1 text-neutral-600 mt-0.5">
                <span className="text-[10px]">$</span>
                <span className="w-1 h-3 bg-white/40 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoadingOverlay;

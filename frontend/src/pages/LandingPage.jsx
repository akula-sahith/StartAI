import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, UploadCloud } from 'lucide-react';
import WorkflowCard from '../components/WorkflowCard';

const LandingPage = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center py-12 px-6 overflow-hidden">
      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-blue opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-glow-purple opacity-40 pointer-events-none"></div>

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"></div>

      <div className="relative z-10 w-full max-w-5xl text-center space-y-12">
        {/* Animated Banner Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold tracking-wider text-slate-350 shadow-md backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span className="bg-gradient-to-r from-blue-450 to-purple-450 bg-clip-text text-transparent uppercase font-bold text-[10px]">
            NEXT-GEN COGNITIVE ARCHITECTURE
          </span>
        </motion.div>

        {/* Hero Typography */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Startup Intelligence{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-250 to-purple-400 bg-clip-text text-transparent glow-text-blue">
              OS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Multi-agent AI platform for startup creation, organizational optimization, and strategic intelligence orchestration.
          </motion.p>
        </div>

        {/* Workflow Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6"
        >
          <WorkflowCard
            title="Create Startup"
            description="Generate startup architecture, finance planning, hiring roadmap, and GTM strategy using coordinated AI agents."
            buttonText="Launch Creator"
            route="/create-startup"
            icon={Cpu}
            colorTheme="blue"
          />

          <WorkflowCard
            title="Optimize Existing Startup"
            description="Upload startup documents and let AI agents analyze organizational bottlenecks, infrastructure costs, scaling risks, and growth opportunities."
            buttonText="Launch Optimizer"
            route="/optimize-startup"
            icon={UploadCloud}
            colorTheme="purple"
          />
        </motion.div>

        {/* Operational Status telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center gap-6 text-[11px] font-mono text-slate-500 pt-8"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            CTO NODE: ONLINE
          </span>
          <span className="h-4 w-[1px] bg-slate-900"></span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            FINANCE NODE: ACTIVE
          </span>
          <span className="h-4 w-[1px] bg-slate-900"></span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            MARKETING NODE: ONLINE
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;

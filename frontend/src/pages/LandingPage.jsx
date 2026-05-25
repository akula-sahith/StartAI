import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, UploadCloud } from 'lucide-react';
import WorkflowCard from '../components/WorkflowCard';

const LandingPage = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center py-12 px-6 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl text-center space-y-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium tracking-wide text-neutral-300"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase text-[11px]">
            AI-Powered Operations
          </span>
        </motion.div>

        {/* Hero Typography */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]"
          >
            Your Startup Starts Here {' '}
            <span className="text-neutral-400">

            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Multi-agent AI platform for startup creation, organizational optimization, and strategic intelligence.
          </motion.p>
        </div>

        {/* Workflow Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4"
        >
          <WorkflowCard
            title="Create Startup"
            description="Generate startup architecture, finance planning, hiring roadmap, and GTM strategy using coordinated AI agents."
            buttonText="Launch Creator"
            route="/create-startup"
            icon={Cpu}
            colorTheme="black"
          />

          <WorkflowCard
            title="Optimize Existing Startup"
            description="Upload startup documents and let AI agents analyze organizational bottlenecks, infrastructure costs, and growth opportunities."
            buttonText="Launch Optimizer"
            route="/optimize-startup"
            icon={UploadCloud}
            colorTheme="black"
          />
        </motion.div>


      </div>
    </div>
  );
};

export default LandingPage;

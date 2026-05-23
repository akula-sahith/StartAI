import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Network, Compass, HelpCircle, Terminal } from 'lucide-react';
import { workspaceService } from '../services/api';
import LoadingOverlay from '../components/LoadingOverlay';

const CreateStartup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startup_name: '',
    domain: '',
    startup_description: '',
    mode: 'creation',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.startup_name || !formData.domain || !formData.startup_description) {
      setError('Please fill in all the intelligence inputs.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await workspaceService.createWorkspace({
        startup_name: formData.startup_name,
        domain: formData.domain,
        startup_description: formData.startup_description,
        mode: formData.mode,
      });

      // Save result in localStorage
      localStorage.setItem('active_workspace_data', JSON.stringify(result));
      
      // Artificial delay to let loading animations finish perfectly
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Operational connection failure to FastAPI engine at port 8005.'
      );
      setLoading(false);
    }
  };

  const domainOptions = [
    'SaaS / Cloud Infrastructure',
    'Artificial Intelligence / Machine Learning',
    'Fintech / Blockchain Runtimes',
    'Healthtech / Medical Robotics',
    'E-Commerce / Automated Logistics',
    'EdTech / Virtual Learning Platforms'
  ];

  return (
    <div className="relative min-h-[85vh] py-12 px-6 flex items-center justify-center overflow-hidden">
      {/* Background glow auroras */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-glow-blue opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-glow-purple opacity-30 pointer-events-none"></div>

      <LoadingOverlay isVisible={loading} mode="creation" />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-glow rounded-2xl border border-slate-800 p-8 md:p-10 relative overflow-hidden"
        >
          {/* Futuristic corner telemetry lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/35 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/35 rounded-tr-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase">STARTUP INITIATION PANEL</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Spawn New AI Startup</h2>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono"
            >
              <div className="font-bold uppercase tracking-wider mb-1">ENGINE INTEGRITY CRITICAL:</div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Name */}
            <div className="space-y-2">
              <label htmlFor="startup_name" className="block text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                Startup Name
              </label>
              <input
                type="text"
                id="startup_name"
                value={formData.startup_name}
                onChange={(e) => setFormData({ ...formData, startup_name: e.target.value })}
                placeholder="e.g., CloudStrike AI"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all shadow-inner"
                required
              />
            </div>

            {/* Grid for Domain & Mode */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Domain */}
              <div className="space-y-2">
                <label htmlFor="domain" className="block text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  Target Domain
                </label>
                <select
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                  required
                >
                  <option value="" disabled className="text-slate-600">Select Domain Core</option>
                  {domainOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-950 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  Operation Mode
                </label>
                <div className="w-full bg-slate-950/40 border border-slate-850 rounded-xl px-4 py-3.5 text-sm text-slate-500 font-mono flex items-center gap-2 select-none">
                  <Terminal className="w-4 h-4 text-blue-500/70" />
                  <span>CREATION_OS_V1.0</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="startup_description" className="block text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
                Startup Core Hypothesis & Pitch
              </label>
              <textarea
                id="startup_description"
                rows={5}
                value={formData.startup_description}
                onChange={(e) => setFormData({ ...formData, startup_description: e.target.value })}
                placeholder="Detail your product offering, market positioning, problems solved, and tech stack goal..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all resize-none shadow-inner leading-relaxed"
                required
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full mt-2 relative group overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-650 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition-all duration-300"
            >
              <span>Compile & Orchestrate Agents</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateStartup;

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
      setError('Please fill in all required fields.');
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
      
      // Delay to let loading animations finish
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 5000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to connect to the API server.'
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
      <LoadingOverlay isVisible={loading} mode="creation" />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-elevated rounded-xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-indigo-500/8 border border-indigo-500/15 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-wide text-slate-500 block uppercase">New Workspace</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Create Startup Workspace</h2>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/8 border border-red-500/15 text-red-400 text-sm"
            >
              <div className="font-semibold mb-1">Error</div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Name */}
            <div className="space-y-2">
              <label htmlFor="startup_name" className="block text-sm font-medium text-slate-400">
                Startup Name
              </label>
              <input
                type="text"
                id="startup_name"
                value={formData.startup_name}
                onChange={(e) => setFormData({ ...formData, startup_name: e.target.value })}
                placeholder="e.g., CloudStrike AI"
                className="w-full bg-slate-800/40 border border-slate-700/50 focus:border-indigo-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
                required
              />
            </div>

            {/* Grid for Domain & Mode */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Domain */}
              <div className="space-y-2">
                <label htmlFor="domain" className="block text-sm font-medium text-slate-400">
                  Target Domain
                </label>
                <select
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full bg-slate-800/40 border border-slate-700/50 focus:border-indigo-500/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  required
                >
                  <option value="" disabled className="text-slate-600">Select domain</option>
                  {domainOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-400">
                  Mode
                </label>
                <div className="w-full bg-slate-800/30 border border-slate-700/40 rounded-lg px-4 py-3 text-sm text-slate-500 flex items-center gap-2 select-none">
                  <Terminal className="w-4 h-4 text-indigo-400/60" />
                  <span>Creation</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="startup_description" className="block text-sm font-medium text-slate-400">
                Description & Hypothesis
              </label>
              <textarea
                id="startup_description"
                rows={5}
                value={formData.startup_description}
                onChange={(e) => setFormData({ ...formData, startup_description: e.target.value })}
                placeholder="Detail your product offering, market positioning, problems solved, and tech stack goal..."
                className="w-full bg-slate-800/40 border border-slate-700/50 focus:border-indigo-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none leading-relaxed"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]"
            >
              <span>Create & Analyze</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateStartup;

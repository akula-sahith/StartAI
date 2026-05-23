import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, Network, FileCode2, Sparkles, Cpu } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import LoadingOverlay from '../components/LoadingOverlay';
import { workspaceService } from '../services/api';

const OptimizeStartup = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      setError('Please select or drop a valid PDF startup document first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await workspaceService.uploadPDF(selectedFile);

      // Map response format: backend upload returns:
      // { workspace_id: 2, extracted_data: {...}, organizational_analysis: { startup_name: ..., startup_state: ... } }
      // Let's standardise the workspace information so `/dashboard` can pull it cleanly.
      const formattedWorkspace = {
        workspace_id: response.workspace_id,
        startup_name: response.extracted_data?.startup_name || response.organizational_analysis?.startup_name || 'Optimized Startup Workspace',
        domain: response.extracted_data?.domain || 'Technology / General',
        mode: 'optimization',
        startup_description: response.extracted_data?.startup_description || 'Auto-optimized cognitive intelligence analysis.',
        // Let's merge the final state and the extracted statistics
        startup_state: response.organizational_analysis
      };

      // Store in localStorage
      localStorage.setItem('active_workspace_data', JSON.stringify(formattedWorkspace));

      // Visual delay for loading sequence
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

  return (
    <div className="relative min-h-[85vh] py-12 px-6 flex items-center justify-center overflow-hidden">
      {/* Background glow auroras */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-glow-purple opacity-25 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-glow-blue opacity-25 pointer-events-none"></div>

      <LoadingOverlay isVisible={loading} mode="optimization" />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel-glow rounded-2xl border border-slate-800 p-8 md:p-10 relative overflow-hidden"
        >
          {/* Futuristic corner telemetry lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/35 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/35 rounded-tr-xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-400">
              <Network className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 block uppercase">STARTUP OPTIMIZER MODULE</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Ingest & Audit Startup</h2>
            </div>
          </div>

          <p className="text-slate-450 text-sm leading-relaxed mb-6 font-normal">
            Upload your company's pitch deck, design docs, or operational outlines. Coordinated AI agents will scan bottlenecks, model infrastructure workloads, assess margins, and detail risk-mitigated strategies.
          </p>

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

          <div className="space-y-6">
            <UploadZone onFileSelected={handleFileSelected} isUploading={loading} />

            <button
              onClick={handleUploadSubmit}
              disabled={!selectedFile || loading}
              className={`w-full relative group overflow-hidden text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                selectedFile && !loading
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-650 hover:from-purple-450 hover:to-indigo-500 shadow-purple-500/10 hover:shadow-purple-500/20 cursor-pointer active:scale-98'
                  : 'bg-slate-900 border border-slate-850 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Cpu className={`w-4 h-4 ${selectedFile && 'animate-spin'}`} />
              <span>Initiate AI Document Scan</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OptimizeStartup;

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
      setError('Please select or drop a valid PDF document first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await workspaceService.uploadPDF(selectedFile);

      const formattedWorkspace = {
        workspace_id: response.workspace_id,
        startup_name: response.extracted_data?.startup_name || response.organizational_analysis?.startup_name || 'Optimized Startup Workspace',
        domain: response.extracted_data?.domain || 'Technology / General',
        mode: 'optimization',
        startup_description: response.extracted_data?.startup_description || 'Automated optimization analysis.',
        startup_state: response.organizational_analysis
      };

      localStorage.setItem('active_workspace_data', JSON.stringify(formattedWorkspace));

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

  return (
    <div className="relative min-h-[85vh] py-12 px-6 flex items-center justify-center overflow-hidden">
      <LoadingOverlay isVisible={loading} mode="optimization" />

      <div className="relative z-10 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-elevated rounded-xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-violet-500/8 border border-violet-500/15 text-violet-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-wide text-slate-500 block uppercase">Workspace Optimization</span>
              <h2 className="text-xl font-bold text-white tracking-tight">Analyze Existing Startup</h2>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Upload your company's pitch deck or operational documents. AI agents will analyze bottlenecks, model infrastructure workloads, assess margins, and generate strategic recommendations.
          </p>

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

          <div className="space-y-6">
            <UploadZone onFileSelected={handleFileSelected} isUploading={loading} />

            <button
              onClick={handleUploadSubmit}
              disabled={!selectedFile || loading}
              className={`w-full font-semibold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                selectedFile && !loading
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer active:scale-[0.98]'
                  : 'bg-slate-800 border border-slate-700/50 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Cpu className={`w-4 h-4 ${selectedFile && !loading ? '' : ''}`} />
              <span>Upload & Analyze</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OptimizeStartup;

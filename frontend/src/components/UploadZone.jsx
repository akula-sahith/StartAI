import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, X, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';

const UploadZone = ({ onFileSelected, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check if it is a PDF
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('System restricted upload: Only pitch deck/documents in PDF format are supported.');
      return false;
    }
    
    // Max 15MB file size
    if (file.size > 15 * 1024 * 1024) {
      setError('File size too massive. Max file allocation is 15MB.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelected(file);
      }
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelected(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerInputClick}
        className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/5'
            : 'border-slate-800 bg-slate-950/40 hover:border-slate-700/60 hover:bg-slate-900/10'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleChange}
        />

        {/* Ambient neon decoration */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-purple-500 opacity-5 blur-3xl pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-purple-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Drag & drop your Pitch Deck here</p>
                <p className="text-xs text-slate-500 mt-1">or click to explore files (Max: 15MB PDF)</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-sm flex items-center gap-4 bg-slate-900/90 border border-slate-800/80 p-4 rounded-xl relative"
              onClick={(e) => e.stopPropagation()} // Prevent clicking parent uploader
            >
              <div className="p-3 rounded-lg bg-purple-950/50 border border-purple-500/20 text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{formatBytes(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-colors"
                title="Remove doc"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedFile && isUploading && (
        <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-purple-400">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              INJECTING PDF STREAM
            </span>
            <span>UPLOADING...</span>
          </div>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;

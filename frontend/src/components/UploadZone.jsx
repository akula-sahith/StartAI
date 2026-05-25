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
      setError('Only PDF documents are supported.');
      return false;
    }
    
    // Max 15MB file size
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds the 15MB limit.');
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
        className={`relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
          dragActive
            ? 'border-white bg-neutral-900'
            : 'border-neutral-700 bg-neutral-950 hover:border-neutral-500 hover:bg-neutral-900'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleChange}
        />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Drag & drop your document here</p>
                <p className="text-xs text-neutral-500 mt-1">or click to browse files (Max: 15MB PDF)</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-sm flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{formatBytes(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
                title="Remove file"
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
            className="mt-4 p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedFile && isUploading && (
        <div className="mt-4 p-4 bg-neutral-900 border border-neutral-800 rounded-lg space-y-3 text-xs">
          <div className="flex justify-between items-center text-neutral-400">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              Uploading document...
            </span>
            <span>Processing</span>
          </div>
          <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-pulse w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;

'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VideoUploader({ onFileSelect }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('');

    if (rejectedFiles && rejectedFiles.length > 0) {
      setError(`File too large or invalid format. Max 100MB allowed.`);
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      if (onFileSelect) {
        onFileSelect(acceptedFiles[0]);
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv']
    },
    maxFiles: 1,
    maxSize: 104857600 // 100MB
  });

  const handleClear = () => {
    setFiles([]);
    setError('');
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
            : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {isDragActive ? (
          <div className="animate-pulse">
            <p className="text-4xl mb-3">📹</p>
            <p className="text-2xl font-bold text-blue-600">Drop your video here!</p>
            <p className="text-blue-500 mt-2">Release to upload</p>
          </div>
        ) : (
          <div>
            <p className="text-4xl mb-3">📹</p>
            <p className="text-2xl font-bold text-gray-800 mb-2">Drag & drop a video file here</p>
            <p className="text-gray-600 mb-4">or click to browse your computer</p>
            <div className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Choose File
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✓ Supported formats: MP4, MOV, AVI, WebM, MKV, FLV
            </p>
            <p className="text-sm text-gray-500">
              ✓ Maximum file size: 100MB
            </p>
            <p className="text-sm text-gray-500">
              ✓ No account or signup required
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-red-700 font-semibold">⚠️ Error:</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-green-800 mb-2">✓ File Selected</h3>
              <p className="text-green-700 font-semibold">{files[0].name}</p>
              <p className="text-green-600 text-sm mt-1">
                Size: {(files[0].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

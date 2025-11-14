'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VideoUploader({ onFileSelect }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    if (onFileSelect) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    maxSize: 104857600 // 100MB
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-xl text-blue-500">Drop your video here...</p>
        ) : (
          <div>
            <p className="text-xl mb-2">📹 Drag & drop a video file here</p>
            <p className="text-gray-500">or click to browse</p>
            <p className="text-sm text-gray-400 mt-4">Supported: MP4, MOV, AVI, WebM (Max 100MB)</p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 bg-white p-4 rounded-lg">
          <h3 className="font-semibold">Selected File:</h3>
          <p className="text-gray-600">{files[0].name}</p>
          <p className="text-sm text-gray-400">
            {(files[0].size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
}

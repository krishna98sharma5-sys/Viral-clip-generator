'use client';

import { useState } from 'react';
import VideoUploader from '@/components/VideoUploader';
import ShareButtons from '@/components/ShareButtons';

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleGenerateClips = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Clips generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate clips');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">
          🎬 Viral Clips Generator
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Turn long videos into viral clips - 100% Free
        </p>

        <VideoUploader onFileSelect={handleFileSelect} />

        {uploadedVideo && (
          <div className="mt-8 text-center">
            <button
              onClick={handleGenerateClips}
              disabled={isProcessing}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Generate Viral Clips'}
            </button>
          </div>
        )}

        {videoUrl && (
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Preview</h2>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg shadow-xl"
            />
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-center">Share Your Clip</h3>
              <ShareButtons videoUrl={videoUrl} title="Check out my viral clip!" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

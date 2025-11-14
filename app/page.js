'use client';

import { useState } from 'react';
import VideoUploader from '@/components/VideoUploader';
import VideoProcessor from '@/components/VideoProcessor';
import ShareButtons from '@/components/ShareButtons';

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFileSelect = (file) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setCurrentStep(2);
  };

  const handleProcessingComplete = () => {
    setCurrentStep(3);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            🎬 Viral Clips Generator
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Create, edit, and share viral video clips - 100% Free
          </p>
          <p className="text-gray-500">
            Powered by FFmpeg | No watermarks | No subscriptions
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between mb-2">
            <div className={`flex-1 text-center py-3 rounded-lg font-semibold transition-all ${
              currentStep >= 1 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              📹 Step 1: Upload
            </div>
            <div className="w-2"></div>
            <div className={`flex-1 text-center py-3 rounded-lg font-semibold transition-all ${
              currentStep >= 2 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              ✂️ Step 2: Edit
            </div>
            <div className="w-2"></div>
            <div className={`flex-1 text-center py-3 rounded-lg font-semibold transition-all ${
              currentStep >= 3 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              📢 Step 3: Share
            </div>
          </div>
        </div>

        {/* Step 1: Upload */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              📹 Step 1: Upload Your Video
            </h2>
            <p className="text-gray-600 mb-6">
              Drag and drop your video file here, or click to browse. Supported formats: MP4, MOV, AVI, WebM (Max 100MB)
            </p>
            <VideoUploader onFileSelect={handleFileSelect} />
          </div>
        </section>

        {/* Step 2: Edit */}
        {uploadedVideo && (
          <section className="mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                ✂️ Step 2: Edit & Process Your Video
              </h2>
              <VideoProcessor 
                videoFile={uploadedVideo} 
                videoUrl={videoUrl}
                onProcessingComplete={handleProcessingComplete}
              />
            </div>
          </section>
        )}

        {/* Video Preview */}
        {videoUrl && (
          <section className="mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                👁️ Video Preview
              </h2>
              <video
                src={videoUrl}
                controls
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '500px' }}
              />
              <p className="text-gray-600 text-sm mt-4">
                💡 Tip: Use the editor above to trim your video or resize it for different platforms before sharing.
              </p>
            </div>
          </section>
        )}

        {/* Step 3: Share */}
        {uploadedVideo && (
          <section className="mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                📢 Step 3: Share Your Viral Clip
              </h2>
              <p className="text-gray-600 mb-6">
                Share your processed video directly to your favorite social media platform
              </p>
              <ShareButtons 
                videoUrl={videoUrl} 
                title="Check out my viral clip created with Viral Clips Generator! 🎬"
              />
            </div>
          </section>
        )}

        {/* Features Section */}
        {!uploadedVideo && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">✂️</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Trim Videos</h3>
                <p className="text-gray-600">
                  Cut your videos to the perfect length with frame-accurate trimming
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Resize for Platforms</h3>
                <p className="text-gray-600">
                  Automatically resize for TikTok, YouTube, Instagram, and more
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Share Instantly</h3>
                <p className="text-gray-600">
                  Share directly to social media with one click
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

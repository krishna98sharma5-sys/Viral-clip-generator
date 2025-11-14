'use client';

import { useState, useRef, useEffect } from 'react';
import {
  trimVideo,
  getVideoInfo,
  changeAspectRatio,
  changeVideoSpeed,
  convertFormat,
  initFFmpeg
} from '@/lib/ffmpegUtils';

export default function VideoProcessor({ videoFile, videoUrl, onProcessingComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [selectedAspect, setSelectedAspect] = useState('9:16');
  const [selectedSpeed, setSelectedSpeed] = useState('1.0');
  const [error, setError] = useState('');
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Load FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        setProcessingStatus('Initializing video processor...');
        await initFFmpeg();
        setFFmpegLoaded(true);
        setProcessingStatus('');
      } catch (err) {
        console.error('Failed to load FFmpeg:', err);
        setError('Failed to load video processor. Please refresh the page.');
        setProcessingStatus('');
      }
    };

    loadFFmpeg();
  }, []);

  // Get video information when file changes
  useEffect(() => {
    const getInfo = async () => {
      if (videoFile && ffmpegLoaded) {
        try {
          setProcessingStatus('Reading video information...');
          const info = await getVideoInfo(videoFile);
          setVideoInfo(info);
          setDuration(Math.min(15, info.duration));
          setProcessingStatus('');
        } catch (err) {
          console.error('Error getting video info:', err);
          setError('Could not read video information');
          setProcessingStatus('');
        }
      }
    };

    getInfo();
  }, [videoFile, ffmpegLoaded]);

  // Trim video
  const handleTrimVideo = async () => {
    if (!videoFile) {
      setError('Please upload a video first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProcessingStatus('Trimming video...');

    try {
      const trimmedBlob = await trimVideo(videoFile, startTime, duration);
      setProcessedVideo(trimmedBlob);
      
      const url = URL.createObjectURL(trimmedBlob);
      setProcessedVideoUrl(url);
      
      setProcessingStatus('');
      alert(`✓ Video trimmed successfully!\nStart: ${startTime}s | Duration: ${duration}s`);
    } catch (err) {
      console.error('Trim error:', err);
      setError('Failed to trim video: ' + err.message);
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  // Change aspect ratio for different platforms
  const handleChangeAspect = async () => {
    if (!videoFile) {
      setError('Please upload a video first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProcessingStatus('Resizing video...');

    try {
      const resizedBlob = await changeAspectRatio(videoFile, selectedAspect);
      setProcessedVideo(resizedBlob);
      
      const url = URL.createObjectURL(resizedBlob);
      setProcessedVideoUrl(url);
      
      const platformName = {
        '9:16': 'TikTok/Instagram Reels',
        '16:9': 'YouTube',
        '1:1': 'Instagram Square',
        '4:5': 'Instagram Portrait'
      };

      setProcessingStatus('');
      alert(`✓ Video resized for ${platformName[selectedAspect]}!`);
    } catch (err) {
      console.error('Aspect ratio error:', err);
      setError('Failed to change aspect ratio: ' + err.message);
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  // Change video speed
  const handleChangeSpeed = async () => {
    if (!videoFile) {
      setError('Please upload a video first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProcessingStatus('Changing video speed...');

    try {
      const speedBlob = await changeVideoSpeed(videoFile, parseFloat(selectedSpeed));
      setProcessedVideo(speedBlob);
      
      const url = URL.createObjectURL(speedBlob);
      setProcessedVideoUrl(url);
      
      setProcessingStatus('');
      alert(`✓ Video speed changed to ${selectedSpeed}x!`);
    } catch (err) {
      console.error('Speed change error:', err);
      setError('Failed to change video speed: ' + err.message);
      setProcessingStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download processed video
  const handleDownload = () => {
    if (!processedVideo) {
      setError('No processed video available');
      return;
    }

    const url = URL.createObjectURL(processedVideo);
    const link = document.createElement('a');
    link.href = url;
    link.download = `viral-clip-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!ffmpegLoaded) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="animate-spin">⏳</div>
          <div>
            <p className="text-yellow-800 font-semibold">Loading video processor...</p>
            <p className="text-yellow-700 text-sm">This may take 10-30 seconds on first use.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <p className="text-red-700 font-semibold">⚠️ Error:</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {processingStatus && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin">⏳</div>
            <p className="text-blue-700 font-semibold">{processingStatus}</p>
          </div>
        </div>
      )}

      {videoInfo && (
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <p className="text-gray-700">
            <strong>📊 Video Info:</strong> {videoInfo.duration}s | {videoInfo.resolution}
          </p>
        </div>
      )}

      {/* Trim Video Section */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">✂️ Trim Video</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ⏱️ Start Time: <span className="text-purple-600 font-bold">{startTime}s</span>
            </label>
            <input
              type="range"
              min="0"
              max={videoInfo?.duration || 60}
              value={startTime}
              onChange={(e) => setStartTime(Number(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              disabled={isProcessing}
            />
            <div className="text-xs text-gray-600 mt-2">0s to {videoInfo?.duration || 60}s</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              ⏱️ Duration: <span className="text-purple-600 font-bold">{duration}s</span>
            </label>
            <input
              type="range"
              min="1"
              max={videoInfo?.duration ? Math.min(30, videoInfo.duration) : 30}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              disabled={isProcessing}
            />
            <div className="text-xs text-gray-600 mt-2">1s to 30s</div>
          </div>
        </div>

        <button
          onClick={handleTrimVideo}
          disabled={isProcessing || !videoFile}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          ✂️ Trim Video
        </button>
      </div>

      {/* Aspect Ratio Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">📱 Resize for Platform</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {[
            { value: '9:16', label: 'TikTok/Reels', emoji: '🎵' },
            { value: '16:9', label: 'YouTube', emoji: '▶️' },
            { value: '1:1', label: 'Instagram', emoji: '📷' },
            { value: '4:5', label: 'Portrait', emoji: '📱' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAspect(option.value)}
              className={`p-3 rounded-lg font-semibold transition-all ${
                selectedAspect === option.value
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-100 border-2 border-blue-200'
              }`}
              disabled={isProcessing}
            >
              <div className="text-xl">{option.emoji}</div>
              <div className="text-xs mt-1">{option.label}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleChangeAspect}
          disabled={isProcessing || !videoFile}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          📱 Resize for Platform
        </button>
      </div>

      {/* Video Speed Section */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">⚡ Change Speed</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {['0.5', '0.75', '1.0', '1.25', '1.5', '1.75', '2.0'].map((speed) => (
            <button
              key={speed}
              onClick={() => setSelectedSpeed(speed)}
              className={`p-3 rounded-lg font-semibold transition-all ${
                selectedSpeed === speed
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-100 border-2 border-green-200'
              }`}
              disabled={isProcessing}
            >
              {speed}x
            </button>
          ))}
        </div>

        <button
          onClick={handleChangeSpeed}
          disabled={isProcessing || !videoFile}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
        >
          ⚡ Change Speed to {selectedSpeed}x
        </button>
      </div>

      {/* Download Section */}
      {processedVideo && (
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border-2 border-emerald-400 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800">✓ Processing Complete!</h3>
          
          {processedVideoUrl && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Preview of processed video:</p>
              <video
                src={processedVideoUrl}
                controls
                className="w-full rounded-lg shadow-md"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}

          <button
            onClick={handleDownload}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md mb-3"
          >
            ⬇️ Download Processed Video
          </button>

          <p className="text-sm text-gray-600 text-center">
            Your video is ready! Download and share on your favorite platform. 🚀
          </p>
        </div>
      )}
    </div>
  );
}

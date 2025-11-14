# 🎬 Viral Clips Generator

A free, open-source AI-powered viral clips generator website. Turn long-form videos into shareable viral clips in minutes using **FFmpeg.wasm** - completely in your browser!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web-blue)

## ✨ Features

- 📹 **Drag & Drop Upload** - Easily upload videos from your computer
- ✂️ **FFmpeg Video Trimming** - Cut videos to perfect length
- 📱 **Multi-Platform Support** - Resize for TikTok, YouTube, Instagram, and more
- ⚡ **Video Speed Control** - Speed up or slow down videos
- 📢 **Social Sharing** - Direct share to Twitter, Facebook, WhatsApp, LinkedIn, Telegram
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 💰 **100% Free** - No subscriptions or hidden costs
- 🚀 **Fast & Reliable** - Hosted on Vercel with auto-scaling
- 🔒 **Privacy First** - All processing happens in your browser
- 📦 **No Backend Needed** - Serverless architecture

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Video Processing**: FFmpeg.wasm (browser-based)
- **File Upload**: React Dropzone
- **Social Sharing**: React Share
- **Hosting**: Vercel (serverless)
- **Version Control**: GitHub
- **Build Tool**: Webpack

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit [your-domain.vercel.app](https://viral-clips-generator.vercel.app) and start creating clips immediately!

### Option 2: Deploy Your Own
1. Fork this repository
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Click "Deploy"
5. Your site is live!

### Option 3: Local Development

## 🎯 How to Use

1. **Upload Video**
   - Drag and drop or click to select a video file
   - Supported: MP4, MOV, AVI, WebM, MKV, FLV
   - Max 100MB

2. **Edit Video**
   - **Trim**: Set start time and duration
   - **Resize**: Choose platform (TikTok, YouTube, Instagram)
   - **Speed**: Change video speed (0.5x to 2x)

3. **Download**
   - Click "Download Processed Video"
   - File saves to your computer

4. **Share**
   - Click social media buttons
   - Share with friends and followers

## 🎬 FFmpeg Processing Features

| Feature | Details |
|---------|---------|
| **Trim** | Extract specific duration from any timestamp |
| **Aspect Ratio** | Convert to 9:16 (TikTok), 16:9 (YouTube), 1:1 (Square), 4:5 (Portrait) |
| **Speed** | Change playback speed from 0.5x to 2x |
| **Format Convert** | Support for multiple video formats |
| **No Watermark** | 100% pure output videos |

## 📊 Performance

- Trim time: ~5-10 seconds for average video
- Resize time: ~10-20 seconds
- Speed change: ~15-30 seconds
- All processing happens locally in browser

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best performance |
| Firefox | ✅ Full | Full support |
| Edge | ✅ Full | Chromium-based |
| Safari | ⚠️ Limited | CORS issues |
| Mobile | ✅ Works | Slower on mobile |

## 📚 How FFmpeg.wasm Works

FFmpeg is compiled to WebAssembly and runs entirely in your browser:


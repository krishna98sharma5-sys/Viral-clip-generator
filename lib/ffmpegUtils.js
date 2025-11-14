import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

let ffmpegInstance = null;
let ffmpegReady = false;

// Initialize FFmpeg
export async function initFFmpeg() {
  if (ffmpegReady) {
    return ffmpegInstance;
  }

  try {
    if (!FFmpeg.isLoaded()) {
      await FFmpeg.load();
    }

    ffmpegInstance = new FFmpeg();
    await ffmpegInstance.load();
    ffmpegReady = true;

    return ffmpegInstance;
  } catch (error) {
    console.error('FFmpeg initialization error:', error);
    throw new Error('Failed to initialize FFmpeg: ' + error.message);
  }
}

// Get FFmpeg instance
export async function getFFmpeg() {
  if (!ffmpegReady) {
    return await initFFmpeg();
  }
  return ffmpegInstance;
}

// Trim video to specific duration
export async function trimVideo(videoFile, startSecond = 0, durationSecond = 15) {
  try {
    const ffmpeg = await getFFmpeg();
    
    // Write input file to FFmpeg virtual filesystem
    await ffmpeg.writeFile('input_video', await fetchFile(videoFile));

    // Run FFmpeg command to trim video
    await ffmpeg.exec([
      '-i', 'input_video',
      '-ss', startSecond.toString(),
      '-t', durationSecond.toString(),
      '-c', 'copy',
      'output_trim.mp4'
    ]);

    // Read output file
    const data = await ffmpeg.readFile('output_trim.mp4');
    
    // Clean up virtual filesystem
    await ffmpeg.deleteFile('input_video');
    await ffmpeg.deleteFile('output_trim.mp4');

    // Create downloadable blob
    return new Blob([data.buffer], { type: 'video/mp4' });
  } catch (error) {
    console.error('Trim error:', error);
    throw new Error('Failed to trim video: ' + error.message);
  }
}

// Change video aspect ratio for different platforms
export async function changeAspectRatio(videoFile, aspectRatio = '9:16') {
  try {
    const ffmpeg = await getFFmpeg();
    
    await ffmpeg.writeFile('input_video', await fetchFile(videoFile));

    const filterMap = {
      '9:16': 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2',
      '16:9': 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
      '1:1': 'scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2',
      '4:5': 'scale=1080:1350:force_original_aspect_ratio=decrease,pad=1080:1350:(ow-iw)/2:(oh-ih)/2'
    };

    const filter = filterMap[aspectRatio] || filterMap['9:16'];

    await ffmpeg.exec([
      '-i', 'input_video',
      '-vf', filter,
      '-c:a', 'aac',
      '-b:a', '128k',
      'output_aspect.mp4'
    ]);

    const data = await ffmpeg.readFile('output_aspect.mp4');
    
    await ffmpeg.deleteFile('input_video');
    await ffmpeg.deleteFile('output_aspect.mp4');

    return new Blob([data.buffer], { type: 'video/mp4' });
  } catch (error) {
    console.error('Aspect ratio error:', error);
    throw new Error('Failed to change aspect ratio: ' + error.message);
  }
}

// Extract video info (duration, resolution)
export async function getVideoInfo(videoFile) {
  try {
    const ffmpeg = await getFFmpeg();
    
    await ffmpeg.writeFile('input_video', await fetchFile(videoFile));

    // Get video information
    await ffmpeg.exec([
      '-i', 'input_video'
    ]);

    // Parse duration from FFmpeg output
    const logOutput = ffmpeg.logger.fflogs
      .filter(({ type }) => type === 'fferr')
      .map(({ message }) => message)
      .join('');

    const durationMatch = logOutput.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    const duration = durationMatch 
      ? parseInt(durationMatch[1]) * 3600 + parseInt(durationMatch[2]) * 60 + parseFloat(durationMatch[3])
      : 0;

    const resolutionMatch = logOutput.match(/(\d+)x(\d+)/);
    const width = resolutionMatch ? parseInt(resolutionMatch[1]) : 0;
    const height = resolutionMatch ? parseInt(resolutionMatch[2]) : 0;

    await ffmpeg.deleteFile('input_video');

    return {
      duration: Math.round(duration),
      width,
      height,
      resolution: `${width}x${height}`
    };
  } catch (error) {
    console.error('Info extraction error:', error);
    throw new Error('Failed to extract video info: ' + error.message);
  }
}

// Speed up video
export async function changeVideoSpeed(videoFile, speed = 1.5) {
  try {
    const ffmpeg = await getFFmpeg();
    
    await ffmpeg.writeFile('input_video', await fetchFile(videoFile));

    const filter = `[0:v]setpts=PTS/${speed}[v];[0:a]atempo=${speed}[a]`;

    await ffmpeg.exec([
      '-i', 'input_video',
      '-filter_complex', filter,
      '-map', '[v]',
      '-map', '[a]',
      'output_speed.mp4'
    ]);

    const data = await ffmpeg.readFile('output_speed.mp4');
    
    await ffmpeg.deleteFile('input_video');
    await ffmpeg.deleteFile('output_speed.mp4');

    return new Blob([data.buffer], { type: 'video/mp4' });
  } catch (error) {
    console.error('Speed change error:', error);
    throw new Error('Failed to change video speed: ' + error.message);
  }
}

// Convert video format
export async function convertFormat(videoFile, outputFormat = 'mp4') {
  try {
    const ffmpeg = await getFFmpeg();
    
    await ffmpeg.writeFile('input_video', await fetchFile(videoFile));

    const outputFile = `output_video.${outputFormat}`;

    await ffmpeg.exec([
      '-i', 'input_video',
      outputFile
    ]);

    const data = await ffmpeg.readFile(outputFile);
    
    await ffmpeg.deleteFile('input_video');
    await ffmpeg.deleteFile(outputFile);

    return new Blob([data.buffer], { type: `video/${outputFormat}` });
  } catch (error) {
    console.error('Convert format error:', error);
    throw new Error('Failed to convert video format: ' + error.message);
  }
}

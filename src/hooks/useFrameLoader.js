import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook to preload a sequence of frames for scroll-driven animation.
 * @param {string} basePath - The base path/url for the frames.
 * @param {number} totalFrames - Total number of frames to load.
 * @returns {object} { frames, isLoading, progress }
 */
export const useFrameLoader = (basePath, totalFrames) => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Generate frame sequence filenames (e.g., ezgif-frame-001.jpg)
  const framePaths = useMemo(() => {
    const paths = [];
    for (let i = 1; i <= totalFrames; i++) {
      const frameNumber = i.toString().padStart(3, '0');
      // Using Vite's special handling for assets if needed, 
      // but for dynamic paths, we often need a different approach.
      // Assuming they are accessible via relative path from the component
      paths.push(`${basePath}/ezgif-frame-${frameNumber}.jpg`);
    }
    return paths;
  }, [basePath, totalFrames]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    const loadImage = (path, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalFrames) * 100));
          loadedImages[index] = img;
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load frame: ${path}`);
          loadedCount++; // Still increment to avoid getting stuck
          resolve();
        };
      });
    };

    const loadAllFrames = async () => {
      const promises = framePaths.map((path, index) => loadImage(path, index));
      await Promise.all(promises);
      setFrames(loadedImages);
      setIsLoading(false);
    };

    loadAllFrames();
  }, [framePaths, totalFrames]);

  return { frames, isLoading, progress };
};

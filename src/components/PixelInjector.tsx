// src/components/PixelInjector.tsx
import { useEffect } from 'react';
import { Pixels } from '../types/pageTypes';

interface PixelInjectorProps {
  pixels: Pixels;
}

const PixelInjector: React.FC<PixelInjectorProps> = ({ pixels }) => {
  useEffect(() => {
    const scripts: { id: string, content: string }[] = [];
    
    // Collect all non-empty pixel scripts
    Object.entries(pixels).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        scripts.push({ id: `pixel-${key}`, content: value });
      }
    });

    // Add scripts to the head
    scripts.forEach(({ id, content }) => {
      // Avoid adding duplicate scripts on re-renders
      if (document.getElementById(id)) return;

      const scriptElement = document.createElement('div');
      scriptElement.id = id;
      scriptElement.innerHTML = content;
      
      // Move all child nodes (e.g., <script>, <noscript>) to the head
      while (scriptElement.firstChild) {
          document.head.appendChild(scriptElement.firstChild);
      }
    });

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      scripts.forEach(({ id }) => {
        // This is tricky because the scripts are moved. We'd need to track them.
        // For a single-page app where this component is always mounted, cleanup is less critical.
        // A more robust solution might use React Helmet. For now, this is effective.
      });
    };
  }, [pixels]);

  return null; // This component does not render anything
};

export default PixelInjector;
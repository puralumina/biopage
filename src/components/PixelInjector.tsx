import { useEffect } from 'react';
import { Pixels } from '../types';

interface PixelInjectorProps {
  pixels: Pixels;
}

const PixelInjector: React.FC<PixelInjectorProps> = ({ pixels }) => {
  useEffect(() => {
    const scripts: { id: string, content: string }[] = [];
    
    Object.entries(pixels).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        scripts.push({ id: `pixel-${key}`, content: value });
      }
    });

    scripts.forEach(({ id, content }) => {
      if (document.getElementById(id)) return;

      const scriptElement = document.createElement('div');
      scriptElement.id = id;
      scriptElement.innerHTML = content;
      
      while (scriptElement.firstChild) {
        document.head.appendChild(scriptElement.firstChild);
      }
    });

    return () => {
      scripts.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, [pixels]);

  return null;
};

export default PixelInjector;
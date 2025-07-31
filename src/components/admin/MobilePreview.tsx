import React from 'react';
import { MapPin } from 'lucide-react';
import { BioData } from '../../types';
import ContentBlock from '../ContentBlock';

interface MobilePreviewProps {
  bioData: BioData;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ bioData }) => {
  const backgroundStyle = bioData.theme.wallpaperImage
    ? { backgroundImage: `url(${bioData.theme.wallpaperImage})` }
    : { background: `linear-gradient(135deg, ${bioData.theme.backgroundColor} 0%, #e0e7ff 100%)` };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full max-h-[800px]">
      <div className="bg-gray-900 h-6 rounded-t-lg flex items-center justify-center">
        <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="h-full max-h-[774px] overflow-y-auto">
        <div 
          className="min-h-full bg-cover bg-center bg-no-repeat relative"
          style={backgroundStyle}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Content */}
          <div className="relative z-10 px-4 py-6">
            {/* Profile Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-3">
                <img
                  src={bioData.profileImage}
                  alt={bioData.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <h1 className="text-xl font-bold text-white mb-1">{bioData.name}</h1>
              <p className="text-blue-200 font-medium mb-1 text-sm">{bioData.subtitle}</p>
              
              {bioData.location && (
                <div className="flex items-center justify-center gap-1 text-white/80 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{bioData.location}</span>
                </div>
              )}
              
              <p className="text-white/90 text-xs leading-relaxed max-w-xs mx-auto">
                {bioData.bio}
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-3">
              {bioData.content
                .sort((a, b) => a.order - b.order)
                .map((block) => (
                  <div key={block.id} className="transform scale-90 origin-top">
                    <ContentBlock block={block} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
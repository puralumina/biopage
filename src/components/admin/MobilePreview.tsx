import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { PageData, Link } from '../../types';

interface MobilePreviewProps {
  data: PageData;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ data }) => {
  const getBlockStyle = (link: Link): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
    };
  };

  const getBackgroundStyle = () => {
    if (data.media.wallpaperUrl) {
      return { backgroundImage: `url(${data.media.wallpaperUrl})` };
    } else if (data.theme.backgroundType === 'gradient') {
      const gradientColors = data.theme.gradientColors.join(', ');
      return { background: `linear-gradient(${data.theme.gradientDirection}, ${gradientColors})` };
    } else {
      return { backgroundColor: data.theme.backgroundColor };
    }
  };

  const visibleLinks = data.links.filter(link => {
    if (!link.active) return false;
    if (link.schedule) {
      const now = new Date();
      const start = new Date(link.schedule.start);
      const end = new Date(link.schedule.end);
      return now >= start && now <= end;
    }
    return true;
  }).sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full max-h-[800px] sticky top-4">
      <div className="bg-gray-900 h-6 rounded-t-lg flex items-center justify-center">
        <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
      </div>
      
      <div className="h-full max-h-[774px] overflow-y-auto">
        <div 
          className="min-h-full bg-cover bg-center bg-no-repeat relative"
          style={getBackgroundStyle()}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          <div className="relative z-10 px-4 py-6">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-3">
                <img
                  src={data.profile.imageUrl}
                  alt={data.profile.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <h1 className="text-xl font-bold text-white mb-1">{data.profile.name}</h1>
              <p className="text-blue-200 font-medium mb-1 text-sm">{data.profile.subtitle}</p>
              
              {data.profile.location && (
                <div className="flex items-center justify-center gap-1 text-white/80 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{data.profile.location}</span>
                </div>
              )}
              
              <p className="text-white/90 text-xs leading-relaxed max-w-xs mx-auto">
                {data.profile.bio}
              </p>
            </div>

            <div className="space-y-3">
              {visibleLinks.map((link) => (
                <div key={link.id} className="transform scale-90 origin-top">
                  <div 
                    className="w-full backdrop-blur-sm border p-3 rounded-lg flex items-center space-x-3"
                    style={getBlockStyle(link)}
                  >
                    {link.thumbnailUrl && (
                      <img src={link.thumbnailUrl} alt={link.title} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold text-white text-sm text-left">{link.title}</p>
                      {link.type === 'musicEmbed' && link.artist && (
                        <p className="text-xs text-white/70 text-left">{link.artist}</p>
                      )}
                    </div>
                    <ExternalLink size={12} className="text-white/50 flex-shrink-0" />
                  </div>
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
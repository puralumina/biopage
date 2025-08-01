import React from 'react';
import { MapPin } from 'lucide-react';
import { PageData } from '../../types';

interface MobilePreviewProps {
  data: PageData;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ data }) => {
  const backgroundStyle = data.media.wallpaperUrl
    ? { backgroundImage: `url(${data.media.wallpaperUrl})` }
    : { background: `linear-gradient(135deg, ${data.theme.backgroundColor} 0%, #e0e7ff 100%)` };

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
          style={backgroundStyle}
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
                  <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-lg flex items-center space-x-3">
                    {link.thumbnailUrl && (
                      <img src={link.thumbnailUrl} alt={link.title} className="w-10 h-10 rounded-md object-cover" />
                    )}
                    <div className="flex-grow text-center">
                      <p className="font-semibold text-white text-sm">{link.title}</p>
                    </div>
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
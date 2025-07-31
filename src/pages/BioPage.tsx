// src/pages/BioPage.tsx
import React, { useEffect, useState } from 'react';
import { getPageData, trackPageView, trackLinkClick } from '../services/pageService';
import { PageData, Link as LinkType } from '../types/pageTypes';
import PixelInjector from '../components/PixelInjector';
import { Lock } from 'lucide-react';

// --- You would create separate components for each block type for cleaner code ---
// --- For simplicity, we'll define a generic block renderer here ---

const LinkBlock: React.FC<{ link: LinkType, onClick: (linkId: string) => void }> = ({ link, onClick }) => {
  const handleProtectedClick = (e: React.MouseEvent) => {
    if (link.password) {
      e.preventDefault();
      const enteredPassword = prompt('This link is password protected. Please enter the password:');
      if (enteredPassword === link.password) {
        onClick(link.id);
        window.open(link.url, '_blank');
      } else if (enteredPassword !== null) {
        alert('Incorrect password.');
      }
    } else {
      onClick(link.id);
    }
  };

  // Here you would have a switch(link.type) to render different block styles
  // For now, we'll render a 'standard' link style for all types.
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleProtectedClick}
      className="group w-full max-w-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300"
      style={{ color: 'inherit' }} // Inherit color from theme
    >
      {link.thumbnailUrl && link.type === 'standard' && (
        <img src={link.thumbnailUrl} alt={link.title} className="w-12 h-12 rounded-md object-cover" />
      )}
      <div className="flex-grow text-center">
        <p className="font-semibold">{link.title}</p>
      </div>
      {link.password && <Lock size={16} className="text-white/50" />}
    </a>
  );
};


const BioPage: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const data = await getPageData();
        setPageData(data);
        // Track a page view once data is successfully loaded
        trackPageView();
      } catch (err) {
        console.error(err);
        setError('This page could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>{error}</p>
      </div>
    );
  }

  // Filter links based on active status and schedule
  const visibleLinks = pageData.links.filter(link => {
    if (!link.active) return false;
    if (link.schedule) {
      const now = new Date();
      const start = new Date(link.schedule.start);
      const end = new Date(link.schedule.end);
      return now >= start && now <= end;
    }
    return true;
  }).sort((a, b) => a.order - b.order);

  const { profile, theme, media, pixels } = pageData;

  const pageStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.primaryColor,
    fontFamily: theme.font,
    '--wallpaper-image': `url(${media.wallpaperUrl})`,
  } as React.CSSProperties;

  return (
    <>
      <PixelInjector pixels={pixels} />
      <main 
        style={pageStyle} 
        className="min-h-screen w-full flex flex-col items-center justify-start p-4 transition-colors duration-500 relative"
      >
        {/* Wallpaper */}
        {media.wallpaperUrl && <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${media.wallpaperUrl})` }}></div>}
        {media.videoUrl && <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0"><source src={media.videoUrl} type="video/mp4" /></video>}
        <div className="absolute inset-0 bg-black/30 z-0"></div> {/* Overlay for readability */}
        
        <div className="relative z-10 w-full flex flex-col items-center pt-16">
          {/* Profile Section */}
          <header className="text-center flex flex-col items-center mb-10">
            <img src={profile.imageUrl} alt={profile.name} className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-white/50 shadow-lg" />
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-lg opacity-90 mt-1">{profile.subtitle}</p>
            <p className="text-sm opacity-80 mt-2">{profile.location}</p>
            <p className="max-w-md mt-4 text-base opacity-90">{profile.bio}</p>
          </header>

          {/* Links Section */}
          <div className="w-full flex flex-col items-center space-y-4">
            {visibleLinks.map(link => (
              <LinkBlock key={link.id} link={link} onClick={trackLinkClick} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default BioPage;
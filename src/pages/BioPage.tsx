import React, { useState, useEffect } from 'react';
            import { Lock, MapPin, Play, ShoppingCart, ExternalLink, Music } from 'lucide-react';
import { LinkType, PageData } from '../types';
import { getPageData, trackLinkClick, trackPageView } from '../services/pageService';
import PixelInjector from '../components/PixelInjector';
import ProductCarousel from '../components/ProductCarousel';

const LinkBlock: React.FC<{ link: LinkType, onClick: (linkId: string) => void }> = ({ link, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getBlockStyle = (link: LinkType): React.CSSProperties => {
    const styling = link.styling || {};
    return {
      backgroundColor: styling.backgroundColor || 'rgba(255, 255, 255, 0.1)',
      borderColor: styling.borderColor || 'rgba(255, 255, 255, 0.2)',
      opacity: styling.opacity !== undefined ? styling.opacity / 100 : 1,
    };
  };

  const getEmbedUrl = (url: string) => {
    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // TikTok URL conversion
    if (url.includes('tiktok.com/')) {
      return url.replace('/video/', '/embed/');
    }
    
    // If already an embed URL or other platform, return as is
    return url;
  };
  const handleProtectedClick = (e: React.MouseEvent) => {
    if (link.password) {
      e.preventDefault();
      const enteredPassword = prompt('This link is password protected. Please enter the password:');
      if (enteredPassword === link.password) {
        onClick(link.id);
        if (link.openInNewWindow !== false) {
          window.open(link.url, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = link.url;
        }
      } else if (enteredPassword !== null) {
        alert('Incorrect password.');
      }
    } else {
      onClick(link.id);
    }
  };

  const nextImage = () => {
    if (link.images) {
      setCurrentImageIndex((prev) => (prev + 1) % link.images!.length);
    }
  };

  const prevImage = () => {
    if (link.images) {
      setCurrentImageIndex((prev) => (prev - 1 + link.images!.length) % link.images!.length);
    }
  };

  switch (link.type) {
    case 'standard':
      return (
        <a
          href={link.url}
          target={link.openInNewWindow !== false ? "_blank" : "_self"}
          rel={link.openInNewWindow !== false ? "noopener noreferrer" : undefined}
          onClick={handleProtectedClick}
          className="group w-full max-w-2xl backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300"
          style={getBlockStyle(link)}
        >
          {link.thumbnailUrl && (
            <img src={link.thumbnailUrl} alt={link.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
          )}
          <div className="flex-grow">
            <p className="font-semibold text-white text-left">{link.title}</p>
          </div>
          {link.password && <Lock size={16} className="text-white/50" />}
          <ExternalLink size={16} className="text-white/50 flex-shrink-0" />
        </a>
      );

    case 'videoEmbed':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="aspect-video bg-black">
            <iframe
              src={getEmbedUrl(link.url)}
              title={link.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => onClick(link.id)}
              loading="lazy"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-white text-center">{link.title}</h3>
          </div>
        </div>
      );

    case 'musicEmbed':
      return (
        <a
          href={link.url}
          target={link.openInNewWindow !== false ? "_blank" : "_self"}
          rel={link.openInNewWindow !== false ? "noopener noreferrer" : undefined}
          onClick={() => onClick(link.id)}
          className="group w-full max-w-2xl backdrop-blur-sm border p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-all duration-300"
          style={getBlockStyle(link)}
        >
          {link.thumbnailUrl ? (
            <img
              src={link.thumbnailUrl}
              alt={link.title}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-md bg-purple-600 flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-grow">
            <p className="font-semibold text-white text-left">{link.title}</p>
            {link.artist && (
              <p className="text-sm text-white/70 text-left">{link.artist}</p>
            )}
          </div>
          <Play size={16} className="text-white/50 flex-shrink-0" />
        </a>
      );

    case 'imageBanner':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <img
            src={link.thumbnailUrl}
            alt={link.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium text-white mb-1">{link.title}</h3>
            {link.description && (
              <p className="text-sm text-white/70">{link.description}</p>
            )}
          </div>
        </div>
      );

    case 'photoCarousel':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="relative">
            {link.images && link.images.length > 0 && (
              <>
                <img
                  src={link.images[currentImageIndex]}
                  alt={`${link.title} - ${currentImageIndex + 1}`}
                  className="w-full h-48 object-cover"
                />
                {link.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-0 h-0 border-r-4 border-r-white border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                      </div>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                      </div>
                    </button>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {link.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-white">{link.title}</h3>
          </div>
        </div>
      );

    case 'latestYouTube':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="relative">
            <img
              src={link.thumbnailUrl || 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'}
              alt={link.title}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => {
                onClick(link.id);
                window.open(link.url, '_blank');
              }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-200"
            >
              <div className="bg-red-600 rounded-full p-4 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </button>
            <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
              📺 LATEST VIDEO
            </div>
            <div className="absolute bottom-3 left-3 text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              {link.title}
            </div>
          </div>
        </div>
      );

    case 'liveTwitch':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="relative">
            <img
              src={link.thumbnailUrl || 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg'}
              alt={link.title}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => {
                onClick(link.id);
                window.open(link.url, '_blank');
              }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-200"
            >
              <div className="bg-purple-600 rounded-full p-4 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </button>
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium animate-pulse">
              🔴 LIVE
            </div>
            <div className="absolute bottom-3 left-3 text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              {link.title}
            </div>
          </div>
        </div>
      );

    case 'product':
      return (
        <a
          href={link.url}
          target={link.openInNewWindow !== false ? "_blank" : "_self"}
          rel={link.openInNewWindow !== false ? "noopener noreferrer" : undefined}
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg overflow-hidden"
          style={getBlockStyle(link)}
        >
          <div className="relative">
            <img
              src={link.thumbnailUrl || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'}
              alt={link.title}
              className="w-full h-48 object-cover"
            />
            {link.price && (
              <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {link.currency === 'USD' && '$'}{link.currency === 'EUR' && '€'}{link.currency === 'GBP' && '£'}{link.price}
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-white mb-2">{link.title}</h3>
            {link.description && (
              <p className="text-sm text-white/70 mb-3">{link.description}</p>
            )}
            <button
              onClick={() => {
                onClick(link.id);
                window.open(link.url, '_blank');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </a>
      );

    case 'featuredProducts':
      return (
        <div className="w-full max-w-2xl">
          <ProductCarousel 
            products={link.products || []} 
            title={link.title}
            onProductClick={(productId) => {
              onClick(link.id);
              window.open(`/product/${productId}`, '_blank');
            }}
          />
        </div>
      );

    case 'textSection':
      return (
        <div 
          className="w-full max-w-2xl backdrop-blur-sm border rounded-lg p-6"
          style={getBlockStyle(link)}
        >
          <div className="space-y-4">
            {(link.textContent || []).map((textItem, index) => {
              const textStyles: React.CSSProperties = {
                fontSize: textItem.styles.fontSize || (textItem.type === 'heading' ? '24px' : '16px'),
                fontWeight: textItem.styles.fontWeight || (textItem.type === 'heading' ? 'bold' : 'normal'),
                fontStyle: textItem.styles.fontStyle || 'normal',
                textAlign: textItem.styles.textAlign || 'left',
                color: textItem.styles.color || '#ffffff',
                textDecoration: textItem.styles.textDecoration || 'none',
                lineHeight: textItem.type === 'heading' ? '1.2' : '1.6',
                margin: 0,
                padding: 0,
              };

              if (textItem.type === 'heading') {
                return (
                  <h3 key={index} style={textStyles}>
                    {textItem.content}
                  </h3>
                );
              } else {
                return (
                  <p key={index} style={textStyles}>
                    {textItem.content}
                  </p>
                );
              }
            })}
          </div>
        </div>
      );
    default:
      return null;
  }
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
        // Only track page view if we successfully loaded data
        if (data) {
          trackPageView();
        }
      } catch (err) {
        console.error(err);
        setError('This page could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadPage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
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

  const getBackgroundStyle = () => {
    if (theme.backgroundType === 'gradient') {
      const gradientColors = theme.gradientColors.join(', ');
      return {
        background: `linear-gradient(${theme.gradientDirection}, ${gradientColors})`,
        fontFamily: theme.font,
      };
    } else {
      return {
        backgroundColor: theme.backgroundColor,
        color: theme.primaryColor,
        fontFamily: theme.font,
      };
    }
  };

  return (
    <>
      <PixelInjector pixels={pixels} />
      <main 
        style={getBackgroundStyle()} 
        className="min-h-screen w-full flex flex-col items-center justify-start p-4 transition-all duration-500 relative"
      >
        {media.wallpaperUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${media.wallpaperUrl})` }}
          />
        )}
        {media.videoUrl && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={media.videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/30 z-0" />
        
        <div className="relative z-10 w-full flex flex-col items-center pt-16">
          <header className="text-center flex flex-col items-center mb-10">
            <img 
              src={profile.imageUrl} 
              alt={profile.name} 
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white/20"
            />
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p className="text-lg text-blue-200 mt-1">{profile.subtitle}</p>
            {profile.location && (
              <div className="flex items-center gap-1 text-white/80 mt-2">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{profile.location}</p>
              </div>
            )}
            <p className="max-w-md mt-4 text-base text-white/90">{profile.bio}</p>
          </header>

          <div className="w-full flex flex-col items-center space-y-4">
            {visibleLinks.map(link => {
              if (link.layout === 'twoColumns') {
                // Find the next link that also has twoColumns layout
                const currentIndex = visibleLinks.indexOf(link);
                const nextLink = visibleLinks[currentIndex + 1];
                
                // Skip if this is the second link in a pair
                if (currentIndex > 0 && visibleLinks[currentIndex - 1].layout === 'twoColumns') {
                  return null;
                }
                
                return (
                  <div key={link.id} className="w-full max-w-2xl grid grid-cols-2 gap-4">
                    <div className="w-full">
                      <LinkBlock link={link} onClick={trackLinkClick} />
                    </div>
                    {nextLink && nextLink.layout === 'twoColumns' && (
                      <div className="w-full">
                        <LinkBlock link={nextLink} onClick={trackLinkClick} />
                      </div>
                    )}
                  </div>
                );
              }
              
              return <LinkBlock key={link.id} link={link} onClick={trackLinkClick} />;
            })}
          </div>

          <footer className="mt-16 mb-8 text-center">
            <p className="text-white/60 text-sm">
              Copyright © 2025 Wise FOSSI. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default BioPage;
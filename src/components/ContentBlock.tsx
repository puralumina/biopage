import React, { useState } from 'react';
import { ExternalLink, Play, Music, Image, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { ContentBlock as ContentBlockType } from '../types';
import { trackLinkClick } from '../lib/firestore';

interface ContentBlockProps {
  block: ContentBlockType;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleClick = async () => {
    if (block.url) {
      await trackLinkClick(block.id);
      
      if (block.isPasswordProtected) {
        setShowPasswordPrompt(true);
        return;
      }
      
      if (isScheduledAndActive()) {
        window.open(block.url, '_blank');
      }
    }
  };

  const handlePasswordSubmit = () => {
    if (password === block.password) {
      setShowPasswordPrompt(false);
      setPassword('');
      setPasswordError('');
      window.open(block.url, '_blank');
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const isScheduledAndActive = () => {
    if (!block.isScheduled) return true;
    
    const now = new Date();
    const start = block.scheduleStart;
    const end = block.scheduleEnd;
    
    if (start && now < start) return false;
    if (end && now > end) return false;
    
    return true;
  };

  if (!block.isActive || !isScheduledAndActive()) {
    return null;
  }

  const nextImage = () => {
    if (block.images) {
      setCurrentImageIndex((prev) => (prev + 1) % block.images!.length);
    }
  };

  const prevImage = () => {
    if (block.images) {
      setCurrentImageIndex((prev) => (prev - 1 + block.images!.length) % block.images!.length);
    }
  };

  if (showPasswordPrompt) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-center">
          <Lock className="w-6 h-6 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Password Protected</h3>
          <p className="text-sm text-gray-600 mb-4">This link requires a password to access</p>
          
          <div className="max-w-xs mx-auto">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mb-3">{passwordError}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPasswordPrompt(false)}
                className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  switch (block.type) {
    case 'link':
      return (
        <button
          onClick={handleClick}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {block.thumbnail && (
                <img
                  src={block.thumbnail}
                  alt={block.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <span className="font-medium text-gray-900">{block.title}</span>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </button>
      );

    case 'video':
      return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative">
            <img
              src={block.thumbnail}
              alt={block.title}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={handleClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-200"
            >
              <div className="bg-white rounded-full p-3 hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-gray-900 ml-1" />
              </div>
            </button>
            <div className="absolute bottom-3 left-3 text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              {block.title}
            </div>
          </div>
        </div>
      );

    case 'music':
      return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={block.thumbnail}
              alt={block.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{block.title}</h3>
              <p className="text-sm text-gray-600">{block.artist}</p>
            </div>
            <button
              onClick={handleClick}
              className="bg-blue-600 rounded-full p-3 hover:bg-blue-700 transition-colors"
            >
              <Music className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={block.thumbnail}
            alt={block.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">{block.title}</h3>
            {block.description && (
              <p className="text-sm text-gray-600">{block.description}</p>
            )}
          </div>
        </div>
      );

    case 'carousel':
      return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative">
            {block.images && block.images.length > 0 && (
              <>
                <img
                  src={block.images[currentImageIndex]}
                  alt={`${block.title} - ${currentImageIndex + 1}`}
                  className="w-full h-48 object-cover"
                />
                {block.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                      {block.images.map((_, index) => (
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
            <h3 className="font-medium text-gray-900">{block.title}</h3>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ContentBlock;
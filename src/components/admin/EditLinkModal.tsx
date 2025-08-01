import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Link, LinkType } from '../../types';
import { X } from 'lucide-react';

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: Link | null;
  onSave: (updatedLink: Link) => void;
}

const EditLinkModal: React.FC<EditLinkModalProps> = ({ isOpen, onClose, link, onSave }) => {
  const [editedLink, setEditedLink] = useState<Link | null>(link);

  useEffect(() => {
    setEditedLink(link);
  }, [link]);

  if (!isOpen || !editedLink) return null;

  const handleInputChange = (field: keyof Link, value: any) => {
    setEditedLink(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleSave = () => {
    if (editedLink) {
      onSave(editedLink);
      onClose();
    }
  };

  const linkTypes: { value: LinkType; label: string }[] = [
    { value: 'standard', label: 'Standard Link' },
    { value: 'videoEmbed', label: 'Video Embed' },
    { value: 'musicEmbed', label: 'Music Embed' },
    { value: 'imageBanner', label: 'Image Banner' },
    { value: 'photoCarousel', label: 'Photo Carousel' },
    { value: 'latestYouTube', label: 'Latest YouTube' },
    { value: 'liveTwitch', label: 'Live Twitch' },
    { value: 'product', label: 'Product' },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-bold text-gray-900">Edit Link</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
              <select
                value={editedLink.type}
                onChange={(e) => handleInputChange('type', e.target.value as LinkType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {linkTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={editedLink.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                type="url"
                value={editedLink.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL (Optional)</label>
              <input
                type="url"
                value={editedLink.thumbnailUrl || ''}
                onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {editedLink.type === 'musicEmbed' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Artist</label>
                  <input
                    type="text"
                    value={editedLink.artist || ''}
                    onChange={(e) => handleInputChange('artist', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <input
                    type="text"
                    value={editedLink.platform || ''}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </>
            )}

            {(editedLink.type === 'imageBanner' || editedLink.type === 'photoCarousel') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editedLink.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                />
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editedLink.active}
                  onChange={(e) => handleInputChange('active', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editedLink.password}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange('password', 'password123');
                    } else {
                      handleInputChange('password', undefined);
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Password Protected</span>
              </label>

              {editedLink.password && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="text"
                    value={editedLink.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              )}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!editedLink.schedule}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const now = new Date();
                      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                      handleInputChange('schedule', {
                        start: now.toISOString().slice(0, 16),
                        end: tomorrow.toISOString().slice(0, 16)
                      });
                    } else {
                      handleInputChange('schedule', undefined);
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Scheduled</span>
              </label>

              {editedLink.schedule && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="datetime-local"
                      value={editedLink.schedule.start}
                      onChange={(e) => handleInputChange('schedule', { 
                        ...editedLink.schedule!, 
                        start: e.target.value 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="datetime-local"
                      value={editedLink.schedule.end}
                      onChange={(e) => handleInputChange('schedule', { 
                        ...editedLink.schedule!, 
                        end: e.target.value 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditLinkModal;
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
    { value: 'featuredProducts', label: 'Featured Products' },
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <select
                value={editedLink.layout || 'fullWidth'}
                onChange={(e) => handleInputChange('layout', e.target.value as 'fullWidth' | 'twoColumns')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="fullWidth">Full Width</option>
                <option value="twoColumns">Two Columns</option>
              </select>
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

            {editedLink.type === 'product' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
                  <textarea
                    value={editedLink.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                      type="text"
                      value={editedLink.price || ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="$29.99"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={editedLink.currency || 'USD'}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="AUD">AUD (A$)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {(editedLink.type === 'latestYouTube' || editedLink.type === 'liveTwitch') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {editedLink.type === 'latestYouTube' ? 'YouTube Channel ID' : 'Twitch Username'}
                </label>
                <input
                  type="text"
                  value={editedLink.channelId || ''}
                  onChange={(e) => handleInputChange('channelId', e.target.value)}
                  placeholder={editedLink.type === 'latestYouTube' ? 'UCxxxxxxxxxxxxxx' : 'your_twitch_username'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}

            {editedLink.type === 'featuredProducts' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
                <p className="text-sm text-gray-500 mb-2">
                  Products will be loaded from the sample data. You can modify the products in the code.
                </p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">
                    Featured products will display as a carousel with sample products.
                  </p>
                </div>
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

          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Block Styling</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={editedLink.styling?.backgroundColor || 'rgba(255, 255, 255, 0.1)'} 
                    onChange={(e) => handleInputChange('styling', { 
                      ...editedLink.styling, 
                      backgroundColor: e.target.value 
                    })} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={editedLink.styling?.backgroundColor || 'rgba(255, 255, 255, 0.1)'} 
                    onChange={(e) => handleInputChange('styling', { 
                      ...editedLink.styling, 
                      backgroundColor: e.target.value 
                    })} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Border Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={editedLink.styling?.borderColor || 'rgba(255, 255, 255, 0.2)'} 
                    onChange={(e) => handleInputChange('styling', { 
                      ...editedLink.styling, 
                      borderColor: e.target.value 
                    })} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={editedLink.styling?.borderColor || 'rgba(255, 255, 255, 0.2)'} 
                    onChange={(e) => handleInputChange('styling', { 
                      ...editedLink.styling, 
                      borderColor: e.target.value 
                    })} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity: {editedLink.styling?.opacity || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={editedLink.styling?.opacity || 100}
                  onChange={(e) => handleInputChange('styling', { 
                    ...editedLink.styling, 
                    opacity: parseInt(e.target.value) 
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => handleInputChange('styling', undefined)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Reset to Default Styling
              </button>
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
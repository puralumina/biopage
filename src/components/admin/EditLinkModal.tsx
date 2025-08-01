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
    { value: 'textSection', label: 'Text Section' },
    { value: 'paragraphSpacing', label: 'Paragraph Spacing' },
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Type</label>
                  <select
                    value={editedLink.thumbnailType || 'image'}
                    onChange={(e) => handleInputChange('thumbnailType', e.target.value as 'image' | 'video')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video Embed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editedLink.thumbnailType === 'video' ? 'Video URL (YouTube, Vimeo, etc.)' : 'Thumbnail Image URL'}
                  </label>
                  <input
                    type="url"
                    value={editedLink.thumbnailUrl || ''}
                    onChange={(e) => handleInputChange('thumbnailUrl', e.target.value)}
                    placeholder={editedLink.thumbnailType === 'video' ? 'https://youtube.com/watch?v=...' : 'https://example.com/image.jpg'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editedLink.thumbnailType === 'video' 
                      ? 'Supports YouTube, Vimeo, TikTok and other video platforms'
                      : 'URL to the product image'
                    }
                  </p>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Payment Link (Optional)</label>
                  <input
                    type="url"
                    value={editedLink.stripePaymentLink || ''}
                    onChange={(e) => handleInputChange('stripePaymentLink', e.target.value)}
                    placeholder="https://buy.stripe.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add your Stripe payment link to enable direct payments. If empty, will redirect to the URL above.
                  </p>
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

            {editedLink.type === 'textSection' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
                <div className="space-y-4">
                  {(editedLink.textContent || []).map((textItem, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <select
                          value={textItem.type}
                          onChange={(e) => {
                            const newTextContent = [...(editedLink.textContent || [])];
                            newTextContent[index] = {
                              ...textItem,
                              type: e.target.value as 'heading' | 'paragraph'
                            };
                            handleInputChange('textContent', newTextContent);
                          }}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="heading">Heading</option>
                          <option value="paragraph">Paragraph</option>
                        </select>
                        <button
                          onClick={() => {
                            const newTextContent = (editedLink.textContent || []).filter((_, i) => i !== index);
                            handleInputChange('textContent', newTextContent);
                          }}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                          value={textItem.content}
                          onChange={(e) => {
                            const newTextContent = [...(editedLink.textContent || [])];
                            newTextContent[index] = {
                              ...textItem,
                              content: e.target.value
                            };
                            handleInputChange('textContent', newTextContent);
                          }}
                          rows={textItem.type === 'heading' ? 1 : 3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                          <select
                            value={textItem.styles.fontSize || (textItem.type === 'heading' ? '24px' : '16px')}
                            onChange={(e) => {
                              const newTextContent = [...(editedLink.textContent || [])];
                              newTextContent[index] = {
                                ...textItem,
                                styles: { ...textItem.styles, fontSize: e.target.value }
                              };
                              handleInputChange('textContent', newTextContent);
                            }}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="12px">12px</option>
                            <option value="14px">14px</option>
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                            <option value="24px">24px</option>
                            <option value="28px">28px</option>
                            <option value="32px">32px</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
                          <select
                            value={textItem.styles.textAlign || 'left'}
                            onChange={(e) => {
                              const newTextContent = [...(editedLink.textContent || [])];
                              newTextContent[index] = {
                                ...textItem,
                                styles: { ...textItem.styles, textAlign: e.target.value as 'left' | 'center' | 'right' }
                              };
                              handleInputChange('textContent', newTextContent);
                            }}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={textItem.styles.color || '#ffffff'}
                              onChange={(e) => {
                                const newTextContent = [...(editedLink.textContent || [])];
                                newTextContent[index] = {
                                  ...textItem,
                                  styles: { ...textItem.styles, color: e.target.value }
                                };
                                handleInputChange('textContent', newTextContent);
                              }}
                              className="w-8 h-8 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={textItem.styles.color || '#ffffff'}
                              onChange={(e) => {
                                const newTextContent = [...(editedLink.textContent || [])];
                                newTextContent[index] = {
                                  ...textItem,
                                  styles: { ...textItem.styles, color: e.target.value }
                                };
                                handleInputChange('textContent', newTextContent);
                              }}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm font-mono"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Style Options</label>
                          <div className="flex gap-2">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={textItem.styles.fontWeight === 'bold'}
                                onChange={(e) => {
                                  const newTextContent = [...(editedLink.textContent || [])];
                                  newTextContent[index] = {
                                    ...textItem,
                                    styles: { 
                                      ...textItem.styles, 
                                      fontWeight: e.target.checked ? 'bold' : 'normal' 
                                    }
                                  };
                                  handleInputChange('textContent', newTextContent);
                                }}
                                className="mr-1"
                              />
                              <span className="text-sm font-bold">B</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={textItem.styles.fontStyle === 'italic'}
                                onChange={(e) => {
                                  const newTextContent = [...(editedLink.textContent || [])];
                                  newTextContent[index] = {
                                    ...textItem,
                                    styles: { 
                                      ...textItem.styles, 
                                      fontStyle: e.target.checked ? 'italic' : 'normal' 
                                    }
                                  };
                                  handleInputChange('textContent', newTextContent);
                                }}
                                className="mr-1"
                              />
                              <span className="text-sm italic">I</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={textItem.styles.textDecoration === 'underline'}
                                onChange={(e) => {
                                  const newTextContent = [...(editedLink.textContent || [])];
                                  newTextContent[index] = {
                                    ...textItem,
                                    styles: { 
                                      ...textItem.styles, 
                                      textDecoration: e.target.checked ? 'underline' : 'none' 
                                    }
                                  };
                                  handleInputChange('textContent', newTextContent);
                                }}
                                className="mr-1"
                              />
                              <span className="text-sm underline">U</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const newTextContent = [
                        ...(editedLink.textContent || []),
                        {
                          type: 'paragraph' as const,
                          content: 'New text content',
                          styles: {
                            fontSize: '16px',
                            fontWeight: 'normal' as const,
                            fontStyle: 'normal' as const,
                            textAlign: 'left' as const,
                            color: '#ffffff',
                            textDecoration: 'none' as const,
                          }
                        }
                      ];
                      handleInputChange('textContent', newTextContent);
                    }}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                  >
                    + Add Text Element
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Top Spacing: {editedLink.topSpacing || 0}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={editedLink.topSpacing || 0}
                        onChange={(e) => handleInputChange('topSpacing', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bottom Spacing: {editedLink.bottomSpacing || 0}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={editedLink.bottomSpacing || 0}
                        onChange={(e) => handleInputChange('bottomSpacing', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
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

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editedLink.openInNewWindow !== false}
                onChange={(e) => handleInputChange('openInNewWindow', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Open in new window</span>
            </label>
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
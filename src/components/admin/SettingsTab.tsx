import React from 'react';
import { PageData, Theme } from '../../types';

interface SettingsTabProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ data, setData }) => {
  if (!data) return null;

  const handleUpdate = (
    section: keyof PageData, 
    field: string, 
    value: string
  ) => {
    setData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        [section]: {
          ...(prevData[section] as object),
          [field]: value,
        },
      };
    });
  };

  const handleThemePresetChange = (preset: Theme['preset']) => {
    let newTheme: Partial<Theme> = {};
    
    switch (preset) {
      case 'Default Light':
        newTheme = { 
          backgroundColor: '#F8FAFC', 
          backgroundType: 'solid',
          gradientColors: ['#F8FAFC', '#E0E7FF'],
          primaryColor: '#3B82F6', 
          font: "'Inter', sans-serif" 
        };
        break;
      case 'Midnight Dark':
        newTheme = { 
          backgroundColor: '#111827', 
          backgroundType: 'solid',
          gradientColors: ['#111827', '#1F2937'],
          primaryColor: '#8B5CF6', 
          font: "'Inter', sans-serif" 
        };
        break;
      case 'Minimalist':
        newTheme = { 
          backgroundColor: '#FFFFFF', 
          backgroundType: 'solid',
          gradientColors: ['#FFFFFF', '#F3F4F6'],
          primaryColor: '#000000', 
          font: "'Inter', sans-serif" 
        };
        break;
    }
    
    setData(prev => {
        if (!prev) return null;
        return {
            ...prev,
            theme: {
                ...prev.theme,
                ...newTheme,
                preset: preset,
            }
        };
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Branding */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-pink-500">🎨</span>
          Page Branding
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
            <div className="flex items-center gap-4">
              <img src={data.profile.imageUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" />
              <input 
                type="url" 
                value={data.profile.imageUrl} 
                onChange={(e) => handleUpdate('profile', 'imageUrl', e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                value={data.profile.name} 
                onChange={(e) => handleUpdate('profile', 'name', e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input 
                type="text" 
                value={data.profile.subtitle} 
                onChange={(e) => handleUpdate('profile', 'subtitle', e.target.value)} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              value={data.profile.location} 
              onChange={(e) => handleUpdate('profile', 'location', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea 
              value={data.profile.bio} 
              onChange={(e) => handleUpdate('profile', 'bio', e.target.value)} 
              rows={3} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
            />
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Text Colors</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.nameColor || '#ffffff'} 
                    onChange={(e) => handleUpdate('profile', 'nameColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.nameColor || '#ffffff'} 
                    onChange={(e) => handleUpdate('profile', 'nameColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.subtitleColor || '#bfdbfe'} 
                    onChange={(e) => handleUpdate('profile', 'subtitleColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.subtitleColor || '#bfdbfe'} 
                    onChange={(e) => handleUpdate('profile', 'subtitleColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.locationColor || 'rgba(255, 255, 255, 0.8)'} 
                    onChange={(e) => handleUpdate('profile', 'locationColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.locationColor || 'rgba(255, 255, 255, 0.8)'} 
                    onChange={(e) => handleUpdate('profile', 'locationColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={data.profile.bioColor || 'rgba(255, 255, 255, 0.9)'} 
                    onChange={(e) => handleUpdate('profile', 'bioColor', e.target.value)} 
                    className="w-12 h-10 rounded border border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={data.profile.bioColor || 'rgba(255, 255, 255, 0.9)'} 
                    onChange={(e) => handleUpdate('profile', 'bioColor', e.target.value)} 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                handleUpdate('profile', 'nameColor', '#ffffff');
                handleUpdate('profile', 'subtitleColor', '#bfdbfe');
                handleUpdate('profile', 'locationColor', 'rgba(255, 255, 255, 0.8)');
                handleUpdate('profile', 'bioColor', 'rgba(255, 255, 255, 0.9)');
              }}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Reset to Default Colors
            </button>
          </div>
        </div>
      </div>

      {/* Theming */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-purple-500">🎭</span>
          Theming
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preset Themes</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Default Light', 'Midnight Dark', 'Minimalist'] as const).map((p) => (
                <button 
                  key={p} 
                  onClick={() => handleThemePresetChange(p)} 
                  className={`p-3 rounded-lg border text-left text-sm hover:border-blue-500 transition-colors ${
                    data.theme.preset === p ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium">{p}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="backgroundType"
                  value="solid"
                  checked={data.theme.backgroundType === 'solid'}
                  onChange={(e) => handleUpdate('theme', 'backgroundType', e.target.value)}
                  className="mr-2"
                />
                Solid Color
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="backgroundType"
                  value="gradient"
                  checked={data.theme.backgroundType === 'gradient'}
                  onChange={(e) => handleUpdate('theme', 'backgroundType', e.target.value)}
                  className="mr-2"
                />
                Gradient
              </label>
            </div>
          </div>
          
          {data.theme.backgroundType === 'solid' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={data.theme.backgroundColor} 
                  onChange={(e) => handleUpdate('theme', 'backgroundColor', e.target.value)} 
                  className="w-12 h-10 rounded border border-gray-300" 
                />
                <input 
                  type="text" 
                  value={data.theme.backgroundColor} 
                  onChange={(e) => handleUpdate('theme', 'backgroundColor', e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Direction</label>
              <select
                value={data.theme.gradientDirection}
                onChange={(e) => handleUpdate('theme', 'gradientDirection', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              >
                <option value="135deg">Diagonal (Top-left to Bottom-right)</option>
                <option value="45deg">Diagonal (Bottom-left to Top-right)</option>
                <option value="0deg">Horizontal (Left to Right)</option>
                <option value="90deg">Vertical (Top to Bottom)</option>
                <option value="180deg">Horizontal (Right to Left)</option>
                <option value="270deg">Vertical (Bottom to Top)</option>
              </select>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Colors</label>
              <div className="space-y-2">
                {data.theme.gradientColors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => {
                        const newColors = [...data.theme.gradientColors];
                        newColors[index] = e.target.value;
                        handleUpdate('theme', 'gradientColors', newColors);
                      }} 
                      className="w-12 h-10 rounded border border-gray-300" 
                    />
                    <input 
                      type="text" 
                      value={color} 
                      onChange={(e) => {
                        const newColors = [...data.theme.gradientColors];
                        newColors[index] = e.target.value;
                        handleUpdate('theme', 'gradientColors', newColors);
                      }} 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    />
                    {data.theme.gradientColors.length > 2 && (
                      <button
                        onClick={() => {
                          const newColors = data.theme.gradientColors.filter((_, i) => i !== index);
                          handleUpdate('theme', 'gradientColors', newColors);
                        }}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {data.theme.gradientColors.length < 5 && (
                  <button
                    onClick={() => {
                      const newColors = [...data.theme.gradientColors, '#000000'];
                      handleUpdate('theme', 'gradientColors', newColors);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add Color
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={data.theme.primaryColor} 
                onChange={(e) => handleUpdate('theme', 'primaryColor', e.target.value)} 
                className="w-12 h-10 rounded border border-gray-300" 
              />
              <input 
                type="text" 
                value={data.theme.primaryColor} 
                onChange={(e) => handleUpdate('theme', 'primaryColor', e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select 
              value={data.theme.font} 
              onChange={(e) => handleUpdate('theme', 'font', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="'Inter', sans-serif">Inter</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Lato', sans-serif">Lato</option>
              <option value="'Montserrat', sans-serif">Montserrat</option>
              <option value="'Raleway', sans-serif">Raleway</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Poppins', sans-serif">Poppins</option>
              <option value="'Source Sans Pro', sans-serif">Source Sans Pro</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Media */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-500">🖼️</span>
          Media
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📱 Wallpaper Image URL</label>
            <input 
              type="url" 
              value={data.media.wallpaperUrl} 
              onChange={(e) => handleUpdate('media', 'wallpaperUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            {data.media.wallpaperUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallpaper Opacity: {data.media.wallpaperOpacity || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={data.media.wallpaperOpacity || 100}
                  onChange={(e) => handleUpdate('media', 'wallpaperOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📹 Video Wallpaper URL</label>
            <input 
              type="url" 
              value={data.media.videoUrl} 
              onChange={(e) => handleUpdate('media', 'videoUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            {data.media.videoUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Opacity: {data.media.videoOpacity || 100}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={data.media.videoOpacity || 100}
                  onChange={(e) => handleUpdate('media', 'videoOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">🌟 Favicon URL</label>
            <input 
              type="url" 
              value={data.media.faviconUrl} 
              onChange={(e) => handleUpdate('media', 'faviconUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
        </div>
      </div>

      {/* Marketing & Tracking Pixels */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing & Tracking Pixels</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add tracking pixels and scripts that will be injected into the public page.
        </p>
        <div className="space-y-4">
          {(Object.keys(data.pixels) as Array<keyof typeof data.pixels>).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <textarea
                value={data.pixels[key]}
                onChange={(e) => handleUpdate('pixels', key, e.target.value)}
                placeholder={`Paste your ${key.replace(/([A-Z])/g, ' $1')} code here...`}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
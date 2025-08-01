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
        newTheme = { backgroundColor: '#F8FAFC', primaryColor: '#3B82F6', font: 'Inter, sans-serif' };
        break;
      case 'Midnight Dark':
        newTheme = { backgroundColor: '#111827', primaryColor: '#8B5CF6', font: 'Inter, sans-serif' };
        break;
      case 'Minimalist':
        newTheme = { backgroundColor: '#FFFFFF', primaryColor: '#000000', font: 'Inter, sans-serif' };
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
        }
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
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select 
              value={data.theme.font} 
              onChange={(e) => handleUpdate('theme', 'font', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Poppins, sans-serif">Poppins</option>
              <option value="Montserrat, sans-serif">Montserrat</option>
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📹 Video Wallpaper URL</label>
            <input 
              type="url" 
              value={data.media.videoUrl} 
              onChange={(e) => handleUpdate('media', 'videoUrl', e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
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
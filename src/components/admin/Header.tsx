import React from 'react';
import { ExternalLink, LogOut, Save, Check } from 'lucide-react';

interface HeaderProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onLogout: () => void;
  saving: boolean;
  showSuccess: boolean;
  error: string | null;
}

const Header: React.FC<HeaderProps> = ({ 
  hasUnsavedChanges, 
  onSave, 
  onLogout, 
  saving, 
  showSuccess,
  error 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Bio Page Admin</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Page
          </a>
          
          <button
            onClick={onSave}
            disabled={!hasUnsavedChanges || saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showSuccess ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </>
            )}
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
      
      {hasUnsavedChanges && (
        <div className="mt-3 px-3 py-2 bg-orange-100 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-sm font-medium">⚠️ Unsaved changes</p>
        </div>
      )}

      {error && (
        <div className="mt-3 px-3 py-2 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">❌ {error}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PageData } from '../types';
import { getPageData, savePageData } from '../services/pageService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/admin/Header';
import ControlPanel from '../components/admin/ControlPanel';
import MobilePreview from '../components/admin/MobilePreview';

// Favicon update utility for admin preview
const updateFavicon = (faviconUrl: string) => {
  if (!faviconUrl) return;
  
  // Remove existing favicon links
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(link => link.remove());
  
  // Add new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
  
  // Also add as shortcut icon for better browser support
  const shortcutLink = document.createElement('link');
  shortcutLink.rel = 'shortcut icon';
  shortcutLink.href = faviconUrl;
  document.head.appendChild(shortcutLink);
};

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [draftData, setDraftData] = useState<PageData | null>(null);
  const [liveData, setLiveData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasUnsavedChanges = JSON.stringify(draftData) !== JSON.stringify(liveData);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await getPageData();
        setDraftData(data);
        setLiveData(data);
        
        // Update favicon in admin as well
        if (data.media.faviconUrl) {
          updateFavicon(data.media.faviconUrl);
        }
      } catch (err) {
        setError('Failed to load page data. Please try refreshing.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleSaveChanges = async () => {
    if (!draftData) return;
    setIsSaving(true);
    setError(null);

    try {
      await savePageData(draftData);
      setLiveData(draftData);
      
      // Update favicon when saving changes
      if (draftData.media.faviconUrl) {
        updateFavicon(draftData.media.faviconUrl);
      }
      
      setShowSuccess(true);
      console.log('✅ Changes saved successfully! Your live site has been updated.');
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save changes. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to logout?');
      if (!confirmed) return;
    }
    
    await logout();
    navigate('/admin/login');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !draftData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!draftData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSaveChanges}
        onLogout={handleLogout}
        saving={isSaving}
        showSuccess={showSuccess}
        error={error}
      />

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto">
        <div className="lg:col-span-2">
          <ControlPanel data={draftData} setData={setDraftData} />
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <MobilePreview data={draftData} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
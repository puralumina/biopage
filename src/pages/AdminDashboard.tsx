// src/pages/AdminDashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PageData } from '../types/pageTypes';
import { getPageData, savePageData } from '../services/pageService';
import { useNavigate } from 'react-router-dom';

// Import your components (assuming you have these)
import Header from '../components/admin/Header';
import ControlPanel from '../components/admin/ControlPanel';
import MobilePreview from '../components/admin/MobilePreview';
import LoadingSpinner from '../components/admin/LoadingSpinner'; // A simple spinner component

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // State for the data being edited (the "draft")
  const [draftData, setDraftData] = useState<PageData | null>(null);
  // State to hold the original data for checking for unsaved changes
  const [liveData, setLiveData] = useState<PageData | null>(null);

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasUnsavedChanges = JSON.stringify(draftData) !== JSON.stringify(liveData);

  // Fetch initial data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await getPageData();
        setDraftData(data);
        setLiveData(data); // Set the initial "saved" state
      } catch (err) {
        setError('Failed to load page data. Please try refreshing.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Required for modern browsers
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
      setLiveData(draftData); // Update the "live" state to match the new draft
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000); // Hide after 2s
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };
  
  // Render loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Render error state
  if (error || !draftData) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Could not load data.'}</div>;
  }

  // Render the main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* The main header */}
      <Header
        onSave={handleSaveChanges}
        onLogout={handleLogout}
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        showSuccess={showSuccess}
      />

      {/* Main content grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto">
        {/* Left Column: Controls */}
        <div className="lg:col-span-2">
          {/* We will pass draftData and setDraftData to the control panel */}
          {/* <ControlPanel data={draftData} setData={setDraftData} /> */}
          <ControlPanel data={draftData} setData={setDraftData} />
        </div>

        {/* Right Column: Preview */}
        <div className="hidden lg:block lg:col-span-1">
           {/* The preview ONLY needs the draftData to display it */}
          <MobilePreview data={draftData} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
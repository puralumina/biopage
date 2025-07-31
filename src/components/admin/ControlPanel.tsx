// src/components/admin/ControlPanel.tsx
import React, { useState } from 'react';
import { PageData } from '../../types/pageTypes';
import SettingsTab from './SettingsTab';
import { Settings, Link, BarChart3 } from 'lucide-react';
import LinksTab from './LinksTab';
import AnalyticsTab from './AnalyticsTab';

interface ControlPanelProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

type Tab = 'settings' | 'links' | 'analytics';

const ControlPanel: React.FC<ControlPanelProps> = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState<Tab>('settings');

  // In src/components/admin/ControlPanel.tsx

const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsTab data={data} setData={setData} />;
      case 'links':
        return <LinksTab data={data} setData={setData} />; 
      case 'analytics':
        // The placeholder is now replaced with the actual component
        return <AnalyticsTab data={data} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; icon: React.ReactNode; label: string }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
        activeTab === tabName
          ? 'bg-blue-600 text-white shadow'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div>
      <div className="flex space-x-2 mb-6">
        <TabButton tabName="settings" icon={<Settings size={16} />} label="Settings" />
        <TabButton tabName="links" icon={<Link size={16} />} label="Links & Content" />
        <TabButton tabName="analytics" icon={<BarChart3 size={16} />} label="Analytics" />
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default ControlPanel;
import React from 'react';
import { Palette, Link2, BarChart3 } from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'settings', label: 'Page Branding', icon: Palette },
    { id: 'content', label: 'Links & Content', icon: Link2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminTabs;
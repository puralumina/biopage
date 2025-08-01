import React, { useMemo } from 'react';
import { Eye, Users, MousePointerClick } from 'lucide-react';
import { PageData } from '../../types';

interface AnalyticsTabProps {
  data: PageData;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ data }) => {
  const sortedLinks = useMemo(() => {
    const linksWithClicks = data.links.map(link => ({
      ...link,
      clicks: data.analytics.linkClicks[link.id] || 0,
    }));

    return linksWithClicks.sort((a, b) => b.clicks - a.clicks);
  }, [data.links, data.analytics]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 rounded-lg p-2">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">Total Page Views</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {data.analytics.pageViews.toLocaleString()}
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 rounded-lg p-2">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">Unique Visitors</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {data.analytics.uniqueVisitors.toLocaleString()}
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 rounded-lg p-2">
                <MousePointerClick className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600">Total Clicks</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {data.analytics.totalClicks.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 Link Performance</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Clicks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLinks.length > 0 ? (
                sortedLinks.map(({ id, title, url, clicks }) => (
                  <tr key={id}>
                    <td className="px-6 py-4 font-medium text-gray-900">{title}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 truncate max-w-xs">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {clicks.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No link clicks recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-right">
          Data loaded at: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
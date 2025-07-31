// src/services/defaultData.ts
import { PageData } from "../types/pageTypes";

export const defaultPageData: PageData = {
  profile: {
    name: 'Wise FOSSI',
    subtitle: 'Pro BMX Athlete | Content Creator',
    location: 'Douala, Cameroon',
    bio: 'I travel around the world with my BMX creating nice memories and inspiring the world. Let\'s collaborate!',
    imageUrl: 'https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/526285757_122248344026224158_2650356844423284755_n.jpg',
  },
  theme: {
    preset: 'Default Light',
    backgroundColor: '#FFFFFF',
    primaryColor: '#111827',
    font: 'Inter',
  },
  media: {
    wallpaperUrl: '',
    videoUrl: '',
    faviconUrl: '',
  },
  pixels: {
    metaPixel: '',
    googleTag: '',
    tiktokPixel: '',
    snapchatPixel: '',
    pinterestTag: '',
    customHeaderScripts: '',
  },
  links: [
    {
      id: '1',
      type: 'standard',
      title: 'My Portfolio',
      url: 'https://example.com/portfolio',
      order: 0,
      active: true,
    },
    {
      id: '2',
      type: 'videoEmbed',
      title: 'Latest Project Video',
      url: 'https://vimeo.com/123456789',
      order: 1,
      active: true,
    },
    {
      id: '3',
      type: 'musicEmbed',
      title: 'My Favorite Lo-fi Playlist',
      url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      order: 2,
      active: true,
    }
  ],
  analytics: {
    pageViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    linkClicks: {},
  },
};
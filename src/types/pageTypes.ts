// src/types/pageTypes.ts

export type LinkType = 
  | 'standard' 
  | 'videoEmbed' 
  | 'musicEmbed' 
  | 'imageBanner' 
  | 'photoCarousel'
  | 'latestYouTube'
  | 'liveTwitch'
  | 'product';

export interface Link {
  id: string;
  type: LinkType;
  order: number;
  active: boolean;
  title: string;
  url: string;
  thumbnailUrl?: string; // Optional thumbnail for standard links
  password?: string; // Optional password protection
  schedule?: {
    start: string; // ISO date string
    end: string;   // ISO date string
  };
  // Add other type-specific properties if needed
  // e.g., for photo carousel: images?: string[];
}

export interface Profile {
  name: string;
  subtitle: string;
  location: string;
  bio: string;
  imageUrl: string;
}

export interface Theme {
  preset: 'Default Light' | 'Midnight Dark' | 'Minimalist' | 'Custom';
  backgroundColor: string;
  primaryColor: string;
  font: string;
}

export interface Media {
  wallpaperUrl: string;
  videoUrl: string;
  faviconUrl: string;
}

export interface Pixels {
  metaPixel: string;
  googleTag: string;
  tiktokPixel: string;
  snapchatPixel: string;
  pinterestTag: string;
  customHeaderScripts: string;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  linkClicks: { [linkId: string]: number };
}

// This is the main data object for the entire page
export interface PageData {
  profile: Profile;
  theme: Theme;
  media: Media;
  pixels: Pixels;
  links: Link[];
  analytics: Analytics;
}
export interface User {
  uid: string;
  email: string;
}

export interface BioData {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  bio: string;
  profileImage: string;
  theme: Theme;
  content: ContentBlock[];
  settings: BioSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  name: string;
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  wallpaperImage?: string;
  videoWallpaper?: string;
  favicon?: string;
}

export interface BioSettings {
  marketingPixels: MarketingPixels;
  isPublic: boolean;
  customDomain?: string;
}

export interface MarketingPixels {
  metaPixel?: string;
  googleAnalytics?: string;
  tiktokPixel?: string;
  snapchatPixel?: string;
  pinterestTag?: string;
  customHeaderScripts?: string;
}

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  url?: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  isPasswordProtected: boolean;
  password?: string;
  isScheduled: boolean;
  scheduleStart?: Date;
  scheduleEnd?: Date;
  order: number;
  embedCode?: string;
  images?: string[];
  artist?: string;
  platform?: string;
}

export type ContentBlockType = 
  | 'link' 
  | 'video' 
  | 'music' 
  | 'image' 
  | 'carousel' 
  | 'youtube' 
  | 'twitch' 
  | 'product';

export interface Analytics {
  totalPageViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  linkClicks: { [linkId: string]: number };
  dailyViews: { [date: string]: number };
  lastUpdated: Date;
}

export interface DraftState {
  bioData: BioData;
  hasUnsavedChanges: boolean;
}
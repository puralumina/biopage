export interface User {
  uid: string;
  email: string;
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
  backgroundType: 'solid' | 'gradient';
  gradientDirection: string;
  gradientColors: string[];
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
  thumbnailUrl?: string;
  password?: string;
  schedule?: {
    start: string;
    end: string;
  };
  artist?: string;
  platform?: string;
  description?: string;
  images?: string[];
  price?: string;
  currency?: string;
  channelId?: string;
  styling?: {
    backgroundColor?: string;
    borderColor?: string;
    opacity?: number;
  };
}

export interface PageData {
  profile: Profile;
  theme: Theme;
  media: Media;
  pixels: Pixels;
  links: Link[];
  analytics: Analytics;
}

export interface DraftState {
  pageData: PageData;
  hasUnsavedChanges: boolean;
}
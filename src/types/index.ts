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
  | 'product'
  | 'featuredProducts';
  | 'textSection'
  | 'paragraphSpacing';

export interface Link {
  id: string;
  type: LinkType;
  order: number;
  active: boolean;
  title: string;
  url: string;
  thumbnailUrl?: string;
  thumbnailType?: 'image' | 'video';
  password?: string;
  openInNewWindow?: boolean;
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
  layout?: 'fullWidth' | 'twoColumns';
  products?: Product[];
  stripePaymentLink?: string;
  styling?: {
    backgroundColor?: string;
    borderColor?: string;
    opacity?: number;
  };
  spacingSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom';
  customSpacing?: number;
  textContent?: {
    type: 'heading' | 'paragraph';
    content: string;
    styles: {
      fontSize?: string;
      fontWeight?: 'normal' | 'bold';
      fontStyle?: 'normal' | 'italic';
      textAlign?: 'left' | 'center' | 'right';
      color?: string;
      textDecoration?: 'none' | 'underline';
    };
  }[];
  topSpacing?: number;
  bottomSpacing?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
export interface PageData {
  profile: Profile;
  theme: Theme;
  media: Media;
  pixels: Pixels;
  links: Link[];
  analytics: Analytics;
  products?: Product[];
  categories?: Category[];
}

export interface DraftState {
  pageData: PageData;
  hasUnsavedChanges: boolean;
}
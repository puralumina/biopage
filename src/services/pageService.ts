import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { PageData } from '../types';

const pageDocRef = doc(db, 'pages', 'main');

const defaultPageData: PageData = {
  profile: {
    name: 'Wise FOSSI',
    subtitle: 'Pro BMX Athlete | Content Creator',
    location: 'Douala, Cameroon',
    bio: 'I create captivating visuals and user experiences. Let\'s collaborate!',
    imageUrl: 'https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/526285757_122248344026224158_2650356844423284755_n.jpg',
  },
  theme: {
    preset: 'Default Light',
    backgroundColor: '#F8FAFC',
    backgroundType: 'solid',
    gradientDirection: '135deg',
    gradientColors: ['#F8FAFC', '#E0E7FF'],
    primaryColor: '#3B82F6',
    font: "'Inter', sans-serif",
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
      title: 'Official Website',
      url: 'https://wisefossi.com',
      order: 0,
      active: true,
    },
    {
      id: '2',
      type: 'standard',
      title: 'Official Facebook Page',
      url: 'https://facebook.com/fossiwise',
      order: 1,
      active: true,
    },
    {
      id: '3',
      type: 'standard',
      title: 'Behance',
      url: 'https://behance.net/sophiacarter',
      order: 2,
      active: true,
    },
    {
      id: '4',
      type: 'videoEmbed',
      title: 'Latest Project Video',
      url: 'https://vimeo.com/example',
      thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      order: 3,
      active: true,
    },
    {
      id: '5',
      type: 'musicEmbed',
      title: 'Midnight Dreams',
      artist: 'Alex Bennett',
      platform: 'Spotify',
      thumbnailUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
      url: 'https://open.spotify.com/track/example',
      order: 4,
      active: true,
    },
    {
      id: '6',
      type: 'imageBanner',
      title: 'Project Showcase',
      description: 'A collection of my latest design work',
      thumbnailUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      url: 'https://portfolio.sophiacarter.com',
      order: 5,
      active: true,
    },
    {
      id: '7',
      type: 'photoCarousel',
      title: 'Art Collection',
      images: [
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'
      ],
      url: 'https://gallery.sophiacarter.com',
      order: 6,
      active: true,
      styling: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        opacity: 1
      }
    },
    {
      id: '8',
      type: 'featuredProducts',
      title: 'Featured Products',
      url: '/shop',
      order: 7,
      active: true,
      products: [
        {
          id: '1',
          name: 'Camera',
          price: 250,
          currency: 'USD',
          image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
          description: 'Professional camera for photography',
          category: 'cameras',
          inStock: true,
        },
        {
          id: '2',
          name: 'Lens',
          price: 150,
          currency: 'USD',
          image: 'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg',
          description: 'High-quality camera lens',
          category: 'lenses',
          inStock: true,
        },
        {
          id: '3',
          name: 'Photography Kit',
          price: 300,
          currency: 'USD',
          image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
          description: 'Complete photography starter kit',
          category: 'accessories',
          inStock: true,
        },
      ],
    },
    {
      id: '9',
      type: 'standard',
      title: '🛍️ Visit Our Shop',
      url: '/shop',
      order: 8,
      active: true,
      thumbnailUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      styling: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        opacity: 1
      }
    },
    {
      id: '10',
      type: 'standard',
      title: '📷 Professional Camera - $250',
      url: '/product/1',
      order: 9,
      active: true,
      thumbnailUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      styling: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        opacity: 1
      }
    }
  ],
  analytics: {
    pageViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    linkClicks: {},
  },
};

export const getPageData = async (): Promise<PageData> => {
  try {
    const docSnap = await getDoc(pageDocRef);
    if (docSnap.exists()) {
      const firestoreData = docSnap.data();
      // Merge with default data to ensure all properties exist
      return {
        ...defaultPageData,
        ...firestoreData,
        profile: { ...defaultPageData.profile, ...firestoreData.profile },
        theme: { ...defaultPageData.theme, ...firestoreData.theme },
        media: { ...defaultPageData.media, ...firestoreData.media },
        pixels: { ...defaultPageData.pixels, ...firestoreData.pixels },
        analytics: { ...defaultPageData.analytics, ...firestoreData.analytics },
        links: firestoreData.links || defaultPageData.links,
      } as PageData;
    } else {
      console.log("Document doesn't exist. Creating default document...");
      // Try to create the document with default data if it doesn't exist
      try {
        await setDoc(pageDocRef, defaultPageData);
        return defaultPageData;
      } catch (createError) {
        console.log("Could not create document (likely due to permissions). Returning default data for public view.");
        // If we can't create (no auth), return default data for public viewing
      }
      return defaultPageData;
    }
  } catch (error) {
    console.error("Error getting page data:", error);
    console.log("Returning default data due to error. This might be because the document doesn't exist yet.");
    return defaultPageData;
  }
};

export const savePageData = async (data: PageData): Promise<void> => {
  try {
    // Check if user is authenticated
    const { auth } = await import('../firebase');
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error("You must be logged in to save changes.");
    }
    
    console.log("Current user UID:", user.uid);
    
    await setDoc(pageDocRef, data);
  } catch (error) {
    console.error("Error saving page data:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('Missing or insufficient permissions')) {
        throw new Error("Access denied. Your account doesn't have permission to save changes. Please contact the administrator.");
      }
      if (error.message.includes('You must be logged in')) {
        throw error;
      }
    }
    
    throw new Error("Could not save changes to the database. Please try again.");
  }
};

export const trackLinkClick = async (linkId: string): Promise<void> => {
  try {
    await updateDoc(pageDocRef, {
      [`analytics.linkClicks.${linkId}`]: increment(1),
      'analytics.totalClicks': increment(1)
    });
  } catch (error) {
    console.warn("Could not track link click:", error);
  }
};

export const trackPageView = async (): Promise<void> => {
  try {
    await updateDoc(pageDocRef, {
      'analytics.pageViews': increment(1)
    });
  } catch (error) {
    console.warn("Could not track page view:", error);
  }
};
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment,
  serverTimestamp,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from './firebase';
import { BioData, Analytics, ContentBlock } from '../types';

const BIO_DOC_ID = 'main-bio';
const ANALYTICS_DOC_ID = 'analytics';

export const getBioData = async (): Promise<BioData | null> => {
  try {
    const docRef = doc(db, 'bioData', BIO_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        content: data.content?.map((block: any) => ({
          ...block,
          scheduleStart: block.scheduleStart?.toDate(),
          scheduleEnd: block.scheduleEnd?.toDate(),
        })) || []
      } as BioData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching bio data:', error);
    return null;
  }
};

export const saveBioData = async (bioData: BioData): Promise<void> => {
  try {
    const docRef = doc(db, 'bioData', BIO_DOC_ID);
    await setDoc(docRef, {
      ...bioData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving bio data:', error);
    throw error;
  }
};

export const subscribeToAgeData = (callback: (data: BioData | null) => void): Unsubscribe => {
  const docRef = doc(db, 'bioData', BIO_DOC_ID);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      const bioData = {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        content: data.content?.map((block: any) => ({
          ...block,
          scheduleStart: block.scheduleStart?.toDate(),
          scheduleEnd: block.scheduleEnd?.toDate(),
        })) || []
      } as BioData;
      callback(bioData);
    } else {
      callback(null);
    }
  });
};

export const trackPageView = async (): Promise<void> => {
  try {
    const analyticsRef = doc(db, 'analytics', ANALYTICS_DOC_ID);
    const today = new Date().toISOString().split('T')[0];
    
    await updateDoc(analyticsRef, {
      totalPageViews: increment(1),
      [`dailyViews.${today}`]: increment(1),
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const trackLinkClick = async (linkId: string): Promise<void> => {
  try {
    const analyticsRef = doc(db, 'analytics', ANALYTICS_DOC_ID);
    await updateDoc(analyticsRef, {
      totalClicks: increment(1),
      [`linkClicks.${linkId}`]: increment(1),
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error tracking link click:', error);
  }
};

export const getAnalytics = async (): Promise<Analytics | null> => {
  try {
    const docRef = doc(db, 'analytics', ANALYTICS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        totalPageViews: data.totalPageViews || 0,
        uniqueVisitors: data.uniqueVisitors || 0,
        totalClicks: data.totalClicks || 0,
        linkClicks: data.linkClicks || {},
        dailyViews: data.dailyViews || {},
        lastUpdated: data.lastUpdated?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
};

export const initializeDefaultData = async (): Promise<void> => {
  const existingData = await getBioData();
  if (existingData) return;

  const defaultBioData: BioData = {
    id: BIO_DOC_ID,
    name: 'Sophia Carter',
    subtitle: 'Digital Artist & Designer',
    location: 'Los Angeles, CA',
    bio: 'I create captivating visuals and user experiences. Let\'s collaborate!',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    theme: {
      name: 'Default Light',
      primaryColor: '#3B82F6',
      backgroundColor: '#F8FAFC',
      fontFamily: 'Inter, sans-serif'
    },
    content: [
      {
        id: '1',
        type: 'link',
        title: 'Official Website',
        url: 'https://sophiacarter.com',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 1
      },
      {
        id: '2',
        type: 'link',
        title: 'Official Facebook Page',
        url: 'https://facebook.com/sophiacarter',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 2
      },
      {
        id: '3',
        type: 'link',
        title: 'Behance',
        url: 'https://behance.net/sophiacarter',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 3
      },
      {
        id: '4',
        type: 'video',
        title: 'Latest Project Video',
        url: 'https://vimeo.com/example',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 4
      },
      {
        id: '5',
        type: 'music',
        title: 'Midnight Dreams',
        artist: 'Alex Bennett',
        platform: 'Spotify',
        thumbnail: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 5
      },
      {
        id: '6',
        type: 'image',
        title: 'Project Showcase',
        description: 'A collection of my latest design work',
        thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 6
      },
      {
        id: '7',
        type: 'carousel',
        title: 'Art Collection',
        images: [
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
          'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
          'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'
        ],
        isActive: true,
        isPasswordProtected: false,
        isScheduled: false,
        order: 7
      }
    ],
    settings: {
      marketingPixels: {},
      isPublic: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await saveBioData(defaultBioData);

  // Initialize analytics
  const analyticsRef = doc(db, 'analytics', ANALYTICS_DOC_ID);
  await setDoc(analyticsRef, {
    totalPageViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    linkClicks: {},
    dailyViews: {},
    lastUpdated: serverTimestamp()
  });
};
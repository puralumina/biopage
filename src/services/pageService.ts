// src/services/pageService.ts
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { PageData } from '../types/pageTypes';
import { defaultPageData } from './defaultData'; // We'll create this file next

// Define the path to our single document
const pageDocRef = doc(db, 'pages', 'main');

/**
 * Fetches the entire page data object from Firestore.
 * If the document doesn't exist, it returns the default data.
 */
export const getPageData = async (): Promise<PageData> => {
  try {
    const docSnap = await getDoc(pageDocRef);
    if (docSnap.exists()) {
      // Return the existing data, cast to our PageData type
      return docSnap.data() as PageData;
    } else {
      // Document doesn't exist, maybe it's the first run.
      // Let's create it with default data and return that.
      console.log("No such document! Initializing with default data.");
      await setDoc(pageDocRef, defaultPageData);
      return defaultPageData;
    }
  } catch (error) {
    console.error("Error getting page data:", error);
    // Return default data as a fallback in case of an error
    return defaultPageData;
  }
};

/**
 * Saves the entire page data object to Firestore.
 * This is used by the admin dashboard's "Save Changes" button.
 * @param data The complete PageData object to save.
 */
export const savePageData = async (data: PageData): Promise<void> => {
  try {
    await setDoc(pageDocRef, data);
  } catch (error) {
    console.error("Error saving page data:", error);
    throw new Error("Could not save changes to the database.");
  }
};

/**
 * Atomically increments the click count for a specific link and the total clicks.
 * This is safe to call from many clients at once.
 * @param linkId The ID of the link that was clicked.
 */
export const trackLinkClick = async (linkId: string): Promise<void> => {
    try {
        await updateDoc(pageDocRef, {
            [`analytics.linkClicks.${linkId}`]: increment(1),
            'analytics.totalClicks': increment(1)
        });
    } catch (error) {
        // It's okay if this fails silently on the client side
        console.warn("Could not track link click:", error);
    }
}

/**
 * Atomically increments the page view count.
 */
export const trackPageView = async (): Promise<void> => {
    try {
        await updateDoc(pageDocRef, {
            'analytics.pageViews': increment(1)
        });
    } catch (error) {
        console.warn("Could not track page view:", error);
    }
}

// We can add unique visitor tracking later if needed, as it's more complex.
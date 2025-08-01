import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for demo authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (isAuthenticated === 'true' && storedUser) {
      // Create a mock user object for demo purposes
      const mockUser = JSON.parse(storedUser);
      setUser(mockUser as User);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Try to create demo user if it doesn't exist
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, 'admin@biopage.com', 'biopage123');
          setUser(userCredential.user);
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            // User already exists, that's fine
          }
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      // For demo purposes, accept the demo credentials
      if (email === 'admin@biopage.com' || email === 'admin') {
        const userCredential = await signInWithEmailAndPassword(auth, 'admin@biopage.com', 'biopage123');
        setUser(userCredential.user);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userCredential.user));
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        setUser(userCredential.user);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userCredential.user));
      }
    } catch (error) {
      // Fallback to localStorage for demo
      if (email === 'admin' && pass === 'biopage123') {
        const mockUser = { email: 'admin@biopage.com', uid: 'demo-user' };
        setUser(mockUser as User);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
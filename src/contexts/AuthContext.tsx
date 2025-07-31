// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase'; // <-- Import from our new firebase.ts file
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean; // <-- Add a loading state
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
  const [loading, setLoading] = useState(true); // <-- Start in loading state

  useEffect(() => {
    // This listener runs when the component mounts, and whenever
    // the user's authentication state changes.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // <-- Stop loading once we know the auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass).then(() => {});
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  // Don't render children until we're done loading the auth state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}
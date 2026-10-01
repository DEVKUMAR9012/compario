import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
});

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  wishlist: string[];
  priceAlerts: { productId: string; targetPrice: number }[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  sendOTP: (email: string, name?: string) => Promise<{ isNewUser: boolean }>;
  verifyOTP: (email: string, otp: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Try to restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('compario_token');
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    API.get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('compario_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const sendOTP = useCallback(async (email: string, name?: string) => {
    const res = await API.post('/auth/send-otp', { email, name });
    return { isNewUser: res.data.isNewUser };
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string, name?: string) => {
    const res = await API.post('/auth/verify-otp', { email, otp, name });
    const { user: userData, token } = res.data;
    if (token) {
      localStorage.setItem('compario_token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setUser(userData);
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(async () => {
    await API.post('/auth/logout').catch(() => {});
    localStorage.removeItem('compario_token');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <AuthContext.Provider value={{ user, loading, sendOTP, verifyOTP, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

// Admin credentials
const ADMIN_EMAIL = 'admin@h2cobar.com';
const ADMIN_PASSWORD = 'toicomotngoisaonhoxiutrenbautroi';

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const adminSession = localStorage.getItem('adminAuth');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Set a flag to indicate the page is being refreshed
    sessionStorage.setItem('pageRefreshed', 'true');
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Auto logout when leaving admin routes (but keep session on refresh)
  useEffect(() => {
    const handleRouteChange = () => {
      if (isAuthenticated && !window.location.pathname.startsWith('/admin')) {
        logout();
      }
    };

    // Check current path on mount and when location changes
    const checkCurrentPath = () => {
      if (isAuthenticated && !window.location.pathname.startsWith('/admin')) {
        logout();
      }
    };

    // Handle tab close/browser close - only clear session when actually closing (not refreshing)
    const handleBeforeUnload = () => {
      // Check if this is a refresh or actual close
      const isRefresh = sessionStorage.getItem('pageRefreshed');
      if (!isRefresh) {
        localStorage.removeItem('adminAuth');
      }
      // Clear the refresh flag
      sessionStorage.removeItem('pageRefreshed');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check immediately
    checkCurrentPath();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated, logout]);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

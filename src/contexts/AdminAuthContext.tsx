import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const sessionData = localStorage.getItem('adminSession');
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const { data, error } = await supabase
            .rpc('get_admin_by_email', { email_input: session.email });
          
          if (data && !error) {
            setUser(data);
            setIsAuthenticated(true);
          } else {
            // Session is invalid, clear it
            localStorage.removeItem('adminSession');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('adminSession');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .rpc('authenticate_admin', { 
          email_input: email, 
          password_input: password 
        });

      if (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
      }

      if (data && data.success) {
        // Store session data
        const sessionData = {
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Log admin activity
        try {
          await supabase.from('activity_logs').insert({
            action: 'admin_login',
            details: { email: data.user.email, login_time: new Date().toISOString() },
            user_id: data.user.id
          });
        } catch (logError) {
          console.error('Error logging admin activity:', logError);
        }
        
        return { success: true, message: 'Đăng nhập thành công' };
      } else {
        return { success: false, message: data?.message || 'Thông tin đăng nhập không chính xác' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Log admin activity
      if (user) {
        try {
          await supabase.from('activity_logs').insert({
            action: 'admin_logout',
            details: { email: user.email, logout_time: new Date().toISOString() },
            user_id: user.id
          });
        } catch (logError) {
          console.error('Error logging admin logout:', logError);
        }
      }
    } catch (error) {
      console.error('Error logging logout:', error);
    } finally {
      // Clear session
      localStorage.removeItem('adminSession');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Auto logout when leaving admin routes
  useEffect(() => {
    const handleRouteChange = () => {
      if (isAuthenticated && !window.location.pathname.startsWith('/admin')) {
        logout();
      }
    };

    const checkCurrentPath = () => {
      if (isAuthenticated && !window.location.pathname.startsWith('/admin')) {
        logout();
      }
    };

    // Handle tab close/browser close
    const handleBeforeUnload = () => {
      // Clear session on actual close (not refresh)
      const isRefresh = sessionStorage.getItem('pageRefreshed');
      if (!isRefresh) {
        localStorage.removeItem('adminSession');
      }
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
  }, [isAuthenticated, user]);

  // Session timeout (24 hours)
  useEffect(() => {
    if (!isAuthenticated) return;

    const sessionData = localStorage.getItem('adminSession');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      const loginTime = new Date(session.loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        logout();
      }
    }
  }, [isAuthenticated]);

  const value: AdminAuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AdminAuthContext.Provider value={value}>
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
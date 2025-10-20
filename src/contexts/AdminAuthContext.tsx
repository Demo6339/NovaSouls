import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Types and Interfaces
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthResponse {
  success: boolean;
  message: string;
  user?: AdminUser;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

// Create context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Provider Component
export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(() => {
    // Try to restore user from localStorage
    const sessionStr = localStorage.getItem('adminSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        return session;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Đang kiểm tra session...');
        const sessionStr = localStorage.getItem('adminSession');
        
        if (!sessionStr) {
          console.log('Không có session');
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        const session = JSON.parse(sessionStr);
        
        // Validate session data
        if (!session.id || !session.email) {
          console.log('Session không hợp lệ');
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Check expiration
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          console.log('Session hết hạn');
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Verify with server
        const { data: userData, error } = await supabase
          .rpc('get_admin_by_email', {
            email_input: session.email
          });

        if (userData) {
          setUser(session);
          setIsAuthenticated(true);
          console.log('Đã khôi phục session thành công');
        } else {
          console.error('Lỗi khôi phục session:', error);
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Lỗi kiểm tra session:', err);
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login handler
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      console.log('Đang đăng nhập...');

      const { data, error } = await supabase
        .rpc('authenticate_admin', {
          email_input: email,
          password_input: password
        });

      if (error) {
        console.error('Lỗi đăng nhập:', error);
        return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
      }

      if (data?.success && data.user) {
        const sessionData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          loginTime: new Date().toISOString()
        };

        // Save session and update state
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        setUser(data.user);
        setIsAuthenticated(true);

        // Log activity
        await supabase.from('activity_logs').insert({
          action: 'admin_login',
          details: {
            email: data.user.email,
            login_time: new Date().toISOString()
          },
          user_id: data.user.id
        });

        console.log('Đăng nhập thành công');
        return { success: true, message: 'Đăng nhập thành công' };
      }

      return { success: false, message: data?.message || 'Thông tin đăng nhập không chính xác' };
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      if (user) {
        await supabase.from('activity_logs').insert({
          action: 'admin_logout',
          details: {
            email: user.email,
            logout_time: new Date().toISOString()
          },
          user_id: user.id
        });
      }
    } catch (error) {
      console.error('Lỗi ghi log logout:', error);
    } finally {
      localStorage.removeItem('adminSession');
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/admin/login';
    }
  };

  // Save session state on page unload
  useEffect(() => {
    const handleUnload = () => {
      if (isAuthenticated && user) {
        const session = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('adminSession', JSON.stringify(session));
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [isAuthenticated, user]);

  // Context value
  const value = {
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

// Custom hook for using auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
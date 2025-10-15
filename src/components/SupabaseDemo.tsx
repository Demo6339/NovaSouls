import React, { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

export const SupabaseDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // Test kết nối cơ bản
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError && !authError.message.includes('No user')) {
        throw authError;
      }
      
      setConnectionStatus('connected');
      loadProducts();
    } catch (err) {
      console.error('Connection error:', err);
      setConnectionStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10);

      if (error) {
        if (error.message.includes('relation "public.products" does not exist')) {
          setError('Bảng products chưa được tạo. Vui lòng chạy migration SQL trên Supabase Dashboard.');
        } else {
          setError(error.message);
        }
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const addSampleProduct = async () => {
    // Sample product creation removed - no mock data
    setError('Sample product creation has been disabled. Please add products through the admin panel.');
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-blue-800">Đang kiểm tra kết nối Supabase...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Supabase Demo - NovaSouls</h1>
      
      {/* Connection Status */}
      <div className={`mb-6 p-4 rounded-lg ${
        connectionStatus === 'connected' 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`font-medium ${
            connectionStatus === 'connected' ? 'text-green-800' : 'text-red-800'
          }`}>
            {connectionStatus === 'connected' 
              ? '✅ Kết nối Supabase thành công!' 
              : '❌ Lỗi kết nối Supabase'}
          </span>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Products Section */}
      {connectionStatus === 'connected' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sản phẩm</h2>
            <button
              onClick={addSampleProduct}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed transition-colors"
              disabled
            >
              Thêm sản phẩm mẫu (Đã tắt)
            </button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Chưa có sản phẩm nào.</p>
              <p className="text-sm mt-2">
                {error?.includes('Bảng products chưa được tạo') 
                  ? 'Vui lòng chạy migration SQL trên Supabase Dashboard.'
                  : 'Click "Thêm sản phẩm mẫu" để tạo sản phẩm đầu tiên.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-green-600 font-bold">
                      {product.price?.toLocaleString('vi-VN')} VNĐ
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.category === 'coffee' ? 'bg-amber-100 text-amber-800' :
                      product.category === 'tea' ? 'bg-green-100 text-green-800' :
                      product.category === 'food' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Tồn kho: {product.stock_quantity || 0}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">📋 Hướng dẫn tiếp theo:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>Truy cập Supabase Dashboard</li>
          <li>Vào SQL Editor và chạy migration SQL</li>
          <li>Refresh trang này để xem kết quả</li>
          <li>Bắt đầu phát triển các tính năng của bạn!</li>
        </ol>
      </div>
    </div>
  );
};

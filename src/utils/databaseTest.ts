// Database Test Utilities
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseTestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export class DatabaseTester {
  // Test kết nối cơ bản
  static async testConnection(): Promise<DatabaseTestResult> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('count')
        .limit(1);

      if (error) {
        return {
          success: false,
          message: 'Kết nối thất bại',
          error: error.message
        };
      }

      return {
        success: true,
        message: 'Kết nối thành công',
        data: data
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi kết nối',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Test quyền đọc dữ liệu
  static async testReadPermissions(): Promise<DatabaseTestResult> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5);

      if (error) {
        return {
          success: false,
          message: 'Không có quyền đọc dữ liệu',
          error: error.message
        };
      }

      return {
        success: true,
        message: `Đọc thành công ${data?.length || 0} sản phẩm`,
        data: data
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi đọc dữ liệu',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Test quyền ghi dữ liệu
  static async testWritePermissions(): Promise<DatabaseTestResult> {
    try {
      const testProduct = {
        name: 'Test Product - ' + Date.now(),
        price: 10000,
        category: 'coffee' as const,
        is_available: true,
        stock_quantity: 1
      };

      const { data, error } = await supabase
        .from('products')
        .insert(testProduct)
        .select();

      if (error) {
        return {
          success: false,
          message: 'Không có quyền ghi dữ liệu',
          error: error.message
        };
      }

      // Xóa sản phẩm test
      if (data && data[0]) {
        await supabase
          .from('products')
          .delete()
          .eq('id', data[0].id);
      }

      return {
        success: true,
        message: 'Ghi dữ liệu thành công',
        data: data
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi ghi dữ liệu',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Test quyền cập nhật dữ liệu
  static async testUpdatePermissions(): Promise<DatabaseTestResult> {
    try {
      // Tạo sản phẩm test
      const { data: insertData, error: insertError } = await supabase
        .from('products')
        .insert({
          name: 'Update Test Product',
          price: 10000,
          category: 'coffee' as const,
          is_available: true,
          stock_quantity: 1
        })
        .select();

      if (insertError) {
        return {
          success: false,
          message: 'Không thể tạo sản phẩm test',
          error: insertError.message
        };
      }

      if (!insertData || !insertData[0]) {
        return {
          success: false,
          message: 'Không có dữ liệu để test',
          error: 'No data returned'
        };
      }

      // Test cập nhật
      const { data: updateData, error: updateError } = await supabase
        .from('products')
        .update({ price: 15000 })
        .eq('id', insertData[0].id)
        .select();

      if (updateError) {
        // Xóa sản phẩm test
        await supabase
          .from('products')
          .delete()
          .eq('id', insertData[0].id);

        return {
          success: false,
          message: 'Không có quyền cập nhật dữ liệu',
          error: updateError.message
        };
      }

      // Xóa sản phẩm test
      await supabase
        .from('products')
        .delete()
        .eq('id', insertData[0].id);

      return {
        success: true,
        message: 'Cập nhật dữ liệu thành công',
        data: updateData
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi cập nhật dữ liệu',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Test quyền xóa dữ liệu
  static async testDeletePermissions(): Promise<DatabaseTestResult> {
    try {
      // Tạo sản phẩm test
      const { data: insertData, error: insertError } = await supabase
        .from('products')
        .insert({
          name: 'Delete Test Product',
          price: 10000,
          category: 'coffee' as const,
          is_available: true,
          stock_quantity: 1
        })
        .select();

      if (insertError) {
        return {
          success: false,
          message: 'Không thể tạo sản phẩm test',
          error: insertError.message
        };
      }

      if (!insertData || !insertData[0]) {
        return {
          success: false,
          message: 'Không có dữ liệu để test',
          error: 'No data returned'
        };
      }

      // Test xóa
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        return {
          success: false,
          message: 'Không có quyền xóa dữ liệu',
          error: deleteError.message
        };
      }

      return {
        success: true,
        message: 'Xóa dữ liệu thành công'
      };
    } catch (err) {
      return {
        success: false,
        message: 'Lỗi xóa dữ liệu',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Chạy tất cả test
  static async runAllTests(): Promise<{
    connection: DatabaseTestResult;
    read: DatabaseTestResult;
    write: DatabaseTestResult;
    update: DatabaseTestResult;
    delete: DatabaseTestResult;
  }> {
    const connection = await this.testConnection();
    const read = await this.testReadPermissions();
    const write = await this.testWritePermissions();
    const update = await this.testUpdatePermissions();
      const deletePermission = await this.testDeletePermissions();

    return {
      connection,
      read,
      write,
      update,
      delete: deletePermission
    };
  }
}

// Helper function để format kết quả test
export const formatTestResult = (result: DatabaseTestResult): string => {
  const status = result.success ? '✅' : '❌';
  const message = result.message;
  const error = result.error ? `\n   Lỗi: ${result.error}` : '';
  
  return `${status} ${message}${error}`;
};

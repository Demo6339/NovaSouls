import React, { useState } from 'react';
import { DatabaseTester, formatTestResult, DatabaseTestResult } from '@/utils/databaseTest';

export const DatabasePermissionTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{
    connection: DatabaseTestResult;
    read: DatabaseTestResult;
    write: DatabaseTestResult;
    update: DatabaseTestResult;
    delete: DatabaseTestResult;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = async () => {
    setIsRunning(true);
    try {
      const results = await DatabaseTester.runAllTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const runSingleTest = async (testName: keyof typeof testResults) => {
    setIsRunning(true);
    try {
      let result: DatabaseTestResult;
      
      switch (testName) {
        case 'connection':
          result = await DatabaseTester.testConnection();
          break;
        case 'read':
          result = await DatabaseTester.testReadPermissions();
          break;
        case 'write':
          result = await DatabaseTester.testWritePermissions();
          break;
        case 'update':
          result = await DatabaseTester.testUpdatePermissions();
          break;
        case 'delete':
          result = await DatabaseTester.testDeletePermissions();
          break;
        default:
          return;
      }

      setTestResults(prev => prev ? { ...prev, [testName]: result } : null);
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔐 Database Permission Test</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">📋 Hướng dẫn cấp quyền</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>1. Truy cập Supabase Dashboard:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Vào <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://supabase.com/dashboard</a></li>
            <li>Chọn project của bạn</li>
            <li>Vào <strong>Authentication</strong> → <strong>Users</strong></li>
          </ul>
          
          <p><strong>2. Cấp quyền Admin:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Vào <strong>SQL Editor</strong></li>
            <li>Chạy lệnh SQL sau (thay thế email của bạn):</li>
          </ul>
          
          <div className="bg-gray-100 p-3 rounded mt-2">
            <code className="text-xs">
{`INSERT INTO admin_users (id, email, name, role, is_active)
VALUES (
  'your-user-id-here',
  'your-email@example.com',
  'Your Name',
  'admin',
  true
);`}
            </code>
          </div>
          
          <p><strong>3. Kiểm tra RLS Policies:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Vào <strong>Authentication</strong> → <strong>Policies</strong></li>
            <li>Đảm bảo có policies cho các bảng cần thiết</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? '🔄 Đang test...' : '🧪 Chạy tất cả test'}
        </button>
        
        <button
          onClick={() => setTestResults(null)}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          🗑️ Xóa kết quả
        </button>
      </div>

      {testResults && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">📊 Kết quả test</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Connection Test */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">🔌 Kết nối</h3>
                <button
                  onClick={() => runSingleTest('connection')}
                  disabled={isRunning}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  Test lại
                </button>
              </div>
              <p className="text-sm">{formatTestResult(testResults.connection)}</p>
              {testResults.connection.error && (
                <p className="text-xs text-red-600 mt-1">{testResults.connection.error}</p>
              )}
            </div>

            {/* Read Test */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">📖 Đọc dữ liệu</h3>
                <button
                  onClick={() => runSingleTest('read')}
                  disabled={isRunning}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  Test lại
                </button>
              </div>
              <p className="text-sm">{formatTestResult(testResults.read)}</p>
              {testResults.read.error && (
                <p className="text-xs text-red-600 mt-1">{testResults.read.error}</p>
              )}
            </div>

            {/* Write Test */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">✏️ Ghi dữ liệu</h3>
                <button
                  onClick={() => runSingleTest('write')}
                  disabled={isRunning}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  Test lại
                </button>
              </div>
              <p className="text-sm">{formatTestResult(testResults.write)}</p>
              {testResults.write.error && (
                <p className="text-xs text-red-600 mt-1">{testResults.write.error}</p>
              )}
            </div>

            {/* Update Test */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">🔄 Cập nhật</h3>
                <button
                  onClick={() => runSingleTest('update')}
                  disabled={isRunning}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  Test lại
                </button>
              </div>
              <p className="text-sm">{formatTestResult(testResults.update)}</p>
              {testResults.update.error && (
                <p className="text-xs text-red-600 mt-1">{testResults.update.error}</p>
              )}
            </div>

            {/* Delete Test */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">🗑️ Xóa dữ liệu</h3>
                <button
                  onClick={() => runSingleTest('delete')}
                  disabled={isRunning}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  Test lại
                </button>
              </div>
              <p className="text-sm">{formatTestResult(testResults.delete)}</p>
              {testResults.delete.error && (
                <p className="text-xs text-red-600 mt-1">{testResults.delete.error}</p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">📈 Tóm tắt</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div className="text-center">
                <div className="font-medium">Kết nối</div>
                <div className={testResults.connection.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.connection.success ? '✅' : '❌'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Đọc</div>
                <div className={testResults.read.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.read.success ? '✅' : '❌'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Ghi</div>
                <div className={testResults.write.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.write.success ? '✅' : '❌'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Cập nhật</div>
                <div className={testResults.update.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.update.success ? '✅' : '❌'}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium">Xóa</div>
                <div className={testResults.delete.success ? 'text-green-600' : 'text-red-600'}>
                  {testResults.delete.success ? '✅' : '❌'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Troubleshooting */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">🔧 Troubleshooting</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>Nếu test thất bại:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Kiểm tra file <code>.env</code> có đúng API keys không</li>
            <li>Đảm bảo đã chạy migration SQL</li>
            <li>Kiểm tra RLS policies trong Supabase Dashboard</li>
            <li>Đảm bảo user có quyền admin</li>
            <li>Kiểm tra console browser để xem lỗi chi tiết</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

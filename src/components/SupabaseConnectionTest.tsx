import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupabaseConnectionTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Basic connection
      addResult('🔍 Testing Supabase connection...');
      const { data, error } = await supabase.from('products').select('count').limit(1);
      if (error) {
        addResult(`❌ Connection failed: ${error.message}`);
        return;
      }
      addResult('✅ Supabase connection successful');

      // Test 2: Check admin_users table
      addResult('🔍 Testing admin_users table...');
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('email, name, role')
        .limit(1);
      
      if (adminError) {
        addResult(`❌ admin_users table error: ${adminError.message}`);
      } else {
        addResult(`✅ admin_users table accessible, found ${adminData?.length || 0} records`);
        if (adminData && adminData.length > 0) {
          addResult(`📧 Admin email: ${adminData[0].email}`);
        }
      }

      // Test 3: Test authentication function
      addResult('🔍 Testing authenticate_admin function...');
      const { data: authData, error: authError } = await supabase
        .rpc('authenticate_admin', {
          email_input: 'admin@h2cobar.com',
          password_input: 'toicomotngoisaonhoxiutrenbautroi'
        });
      
      if (authError) {
        addResult(`❌ Authentication function error: ${authError.message}`);
      } else {
        addResult(`✅ Authentication function working: ${JSON.stringify(authData)}`);
      }

    } catch (error) {
      addResult(`❌ Unexpected error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Testing...' : 'Test Supabase Connection'}
        </Button>
        
        {testResults.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseConnectionTest;

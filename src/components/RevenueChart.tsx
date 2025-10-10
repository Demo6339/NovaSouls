import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { RefreshCw, TrendingUp, Activity, Clock } from 'lucide-react';

// Dữ liệu mẫu cho các khoảng thời gian khác nhau với nhiều metrics
const revenueData = {
  '1': [
    { time: '00:00', revenue: 0, orders: 0, profit: 0 },
    { time: '04:00', revenue: 120000, orders: 3, profit: 24000 },
    { time: '08:00', revenue: 350000, orders: 8, profit: 70000 },
    { time: '12:00', revenue: 680000, orders: 15, profit: 136000 },
    { time: '16:00', revenue: 920000, orders: 22, profit: 184000 },
    { time: '20:00', revenue: 1150000, orders: 28, profit: 230000 },
    { time: '24:00', revenue: 1280000, orders: 32, profit: 256000 },
  ],
  '7': [
    { time: 'T2', revenue: 1200000, orders: 45, profit: 240000 },
    { time: 'T3', revenue: 1500000, orders: 52, profit: 300000 },
    { time: 'T4', revenue: 1100000, orders: 38, profit: 220000 },
    { time: 'T5', revenue: 1800000, orders: 65, profit: 360000 },
    { time: 'T6', revenue: 2200000, orders: 78, profit: 440000 },
    { time: 'T7', revenue: 2500000, orders: 89, profit: 500000 },
    { time: 'CN', revenue: 1900000, orders: 68, profit: 380000 },
  ],
  '30': [
    { time: 'Tuần 1', revenue: 8500000, orders: 320, profit: 1700000 },
    { time: 'Tuần 2', revenue: 9200000, orders: 345, profit: 1840000 },
    { time: 'Tuần 3', revenue: 8800000, orders: 330, profit: 1760000 },
    { time: 'Tuần 4', revenue: 10500000, orders: 395, profit: 2100000 },
  ],
};

// Thời gian cập nhật realtime
const updateIntervals = {
  '1m': 60000,    // 1 phút
  '5m': 300000,   // 5 phút
  '1h': 3600000,  // 1 giờ
  '6h': 21600000, // 6 giờ
  '12h': 43200000 // 12 giờ
};

const RevenueChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7');
  const [selectedUpdateInterval, setSelectedUpdateInterval] = useState<string>('5m');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case '1': return '1 ngày';
      case '7': return '7 ngày';
      case '30': return '30 ngày';
      default: return '7 ngày';
    }
  };

  const getUpdateIntervalLabel = (interval: string) => {
    switch (interval) {
      case '1m': return '1 phút';
      case '5m': return '5 phút';
      case '1h': return '1 giờ';
      case '6h': return '6 giờ';
      case '12h': return '12 giờ';
      default: return '5 phút';
    }
  };

  const getChartData = () => {
    return revenueData[selectedPeriod as keyof typeof revenueData] || revenueData['7'];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // In a real app, you would fetch new data here
    }, updateIntervals[selectedUpdateInterval as keyof typeof updateIntervals]);

    return () => clearInterval(interval);
  }, [isLive, selectedUpdateInterval]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
          <p className="text-sm font-semibold text-foreground mb-2">{`Thời gian: ${label}`}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-foreground">
                  {entry.dataKey === 'revenue' && 'Doanh thu: '}
                  {entry.dataKey === 'orders' && 'Đơn hàng: '}
                  {entry.dataKey === 'profit' && 'Lợi nhuận: '}
                </span>
                <span className="text-sm font-bold text-primary">
                  {entry.dataKey === 'revenue' || entry.dataKey === 'profit' 
                    ? formatCurrency(entry.value)
                    : `${entry.value} đơn`
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const data = getChartData();
    
    if (chartType === 'area') {
      return (
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="time" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            name="Doanh thu"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#profitGradient)"
            name="Lợi nhuận"
          />
        </AreaChart>
      );
    } else if (chartType === 'bar') {
      return (
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="time" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Doanh thu" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#10b981" name="Lợi nhuận" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    } else {
      return (
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="time" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            name="Doanh thu"
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            name="Lợi nhuận"
          />
        </LineChart>
      );
    }
  };

  return (
    <Card className="animate-fade-up shadow-2xl border-0 bg-gradient-to-br from-background to-secondary/5">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl lg:text-2xl">Doanh thu {getPeriodLabel(selectedPeriod)}</CardTitle>
              {isLive && (
                <Badge variant="destructive" className="animate-pulse">
                  <Activity className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm lg:text-base">
              Biểu đồ doanh thu theo {selectedPeriod === '1' ? 'giờ' : selectedPeriod === '7' ? 'ngày' : 'tuần'}
              {isLive && (
                <span className="ml-2 text-xs text-muted-foreground">
                  • Cập nhật lần cuối: {lastUpdate.toLocaleTimeString('vi-VN')}
                </span>
              )}
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Type Selector */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <Button
                variant={chartType === 'area' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('area')}
                className="rounded-none border-0"
              >
                Area
              </Button>
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="rounded-none border-0"
              >
                Line
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="rounded-none border-0"
              >
                Bar
              </Button>
            </div>

            {/* Live Toggle */}
            <Button
              variant={isLive ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="gap-2"
            >
              <Activity className="h-4 w-4" />
              {isLive ? 'Tắt' : 'Bật'} Live
            </Button>

            {/* Update Interval Selector */}
            {isLive && (
              <Select value={selectedUpdateInterval} onValueChange={setSelectedUpdateInterval}>
                <SelectTrigger className="w-[120px]">
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 phút</SelectItem>
                  <SelectItem value="5m">5 phút</SelectItem>
                  <SelectItem value="1h">1 giờ</SelectItem>
                  <SelectItem value="6h">6 giờ</SelectItem>
                  <SelectItem value="12h">12 giờ</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Period Selector */}
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Chọn thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 ngày</SelectItem>
                <SelectItem value="7">7 ngày</SelectItem>
                <SelectItem value="30">30 ngày</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
        
        {/* Advanced Statistics */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Tổng doanh thu</p>
            <p className="text-xl lg:text-2xl font-bold text-primary">
              {formatCurrency(getChartData().reduce((sum, item) => sum + item.revenue, 0))}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
            <p className="text-sm text-muted-foreground mb-1">Tổng lợi nhuận</p>
            <p className="text-xl lg:text-2xl font-bold text-green-600">
              {formatCurrency(getChartData().reduce((sum, item) => sum + item.profit, 0))}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-xl border border-orange-500/20">
            <p className="text-sm text-muted-foreground mb-1">Trung bình/ngày</p>
            <p className="text-xl lg:text-2xl font-bold text-orange-600">
              {formatCurrency(getChartData().reduce((sum, item) => sum + item.revenue, 0) / getChartData().length)}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20">
            <p className="text-sm text-muted-foreground mb-1">Tổng đơn hàng</p>
            <p className="text-xl lg:text-2xl font-bold text-purple-600">
              {getChartData().reduce((sum, item) => sum + item.orders, 0)} đơn
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

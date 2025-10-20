import { forwardRef } from 'react';
import { Order } from '@/contexts/OrderContext';

interface InvoicePrintProps {
  order: Order;
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    taxId?: string;
  };
}

export const InvoicePrint = forwardRef<HTMLDivElement, InvoicePrintProps>(
  ({ order, companyInfo }, ref) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div ref={ref} className="p-6 bg-white max-w-[80mm]">
        {/* Company Info */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold">{companyInfo?.name || 'Nova Souls'}</h1>
          <p className="text-sm">{companyInfo?.address || '123 Main St, City'}</p>
          <p className="text-sm">{companyInfo?.phone || '(123) 456-7890'}</p>
          {companyInfo?.taxId && (
            <p className="text-sm">MST: {companyInfo.taxId}</p>
          )}
        </div>

        {/* Invoice Title */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">HÓA ĐƠN BÁN HÀNG</h2>
          <p className="text-sm">#{order.orderNumber}</p>
          <p className="text-sm">{formatDate(order.orderDetails.orderTime)}</p>
        </div>

        {/* Customer Info */}
        <div className="mb-4 text-sm">
          <p><strong>Khách hàng:</strong> {order.customerInfo.name}</p>
          <p><strong>SĐT:</strong> {order.customerInfo.phone}</p>
          {order.customerInfo.address && (
            <p><strong>Địa chỉ:</strong> {order.customerInfo.address.fullAddress}</p>
          )}
        </div>

        {/* Order Type & Payment Method */}
        <div className="mb-4 text-sm">
          <p>
            <strong>Loại đơn hàng:</strong> {
              order.orderDetails.orderType === 'delivery' ? 'Giao hàng' :
              order.orderDetails.orderType === 'pickup' ? 'Mang về' : 'Tại quán'
            }
          </p>
          <p>
            <strong>Thanh toán:</strong> {
              order.orderDetails.paymentMethod === 'cash' ? 'Tiền mặt' :
              order.orderDetails.paymentMethod === 'card' ? 'Thẻ' :
              'Chuyển khoản'
            }
          </p>
        </div>

        {/* Items */}
        <div className="mb-4">
          <div className="border-b border-t py-2 text-sm">
            <div className="grid grid-cols-12 font-bold">
              <div className="col-span-6">Món</div>
              <div className="col-span-2 text-center">SL</div>
              <div className="col-span-4 text-right">T.Tiền</div>
            </div>
          </div>
          <div className="text-sm">
            {order.items.map((item, index) => (
              <div key={index} className="py-2 border-b">
                <div className="grid grid-cols-12">
                  <div className="col-span-6">{item.name}</div>
                  <div className="col-span-2 text-center">{item.quantity}</div>
                  <div className="col-span-4 text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
                {item.addons?.length > 0 && (
                  <div className="pl-4 text-xs text-gray-600">
                    {item.addons.map((addon, i) => (
                      <div key={i}>
                        + {addon.name} ({formatCurrency(addon.price)})
                      </div>
                    ))}
                  </div>
                )}
                {item.notes && (
                  <div className="text-xs text-gray-600 mt-1">
                    Ghi chú: {item.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Tổng tiền hàng:</span>
            <span>{formatCurrency(order.orderDetails.subtotal)}</span>
          </div>
          {order.orderDetails.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Phí giao hàng:</span>
              <span>{formatCurrency(order.orderDetails.deliveryFee)}</span>
            </div>
          )}
          {order.orderDetails.serviceFee > 0 && (
            <div className="flex justify-between">
              <span>Phí dịch vụ:</span>
              <span>{formatCurrency(order.orderDetails.serviceFee)}</span>
            </div>
          )}
          {order.orderDetails.discount > 0 && (
            <div className="flex justify-between">
              <span>Giảm giá:</span>
              <span>-{formatCurrency(order.orderDetails.discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Tổng cộng:</span>
            <span>{formatCurrency(order.orderDetails.totalAmount)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
          <p>Hẹn gặp lại!</p>
        </div>
      </div>
    );
  }
);
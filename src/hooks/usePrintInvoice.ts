import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Order } from '@/contexts/OrderContext';
import { InvoicePrint } from '@/components/admin/InvoicePrint';

interface PrintOptions {
  copies?: number;
  orientation?: 'portrait' | 'landscape';
  pageSize?: {
    width: number;
    height: number;
  };
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    taxId?: string;
  };
}

export const usePrintInvoice = () => {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Hóa đơn',
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  const printInvoice = (order: Order, options?: PrintOptions) => {
    // Tạo một element tạm thời để in
    const printContainer = document.createElement('div');
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    document.body.appendChild(printContainer);

    // Render hóa đơn vào element tạm thời
    const printElement = (
      <InvoicePrint
        ref={printRef}
        order={order}
        companyInfo={options?.companyInfo}
      />
    );

    // In số bản copy theo yêu cầu
    const copies = options?.copies || 1;
    for (let i = 0; i < copies; i++) {
      handlePrint();
    }

    // Cleanup
    document.body.removeChild(printContainer);
  };

  // Xuất PDF
  const exportPDF = async (order: Order, options?: PrintOptions) => {
    if (!printRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: options?.orientation || 'portrait',
        unit: 'mm',
        format: [
          options?.pageSize?.width || 80,
          options?.pageSize?.height || 297
        ]
      });

      // Calculate dimensions to fit the content
      const imgWidth = options?.pageSize?.width || 80;
      const pageHeight = options?.pageSize?.height || 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save with order number
      pdf.save(`invoice-${order.orderNumber}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw error;
    }
  };

  return {
    printRef,
    printInvoice,
    exportPDF
  };
};
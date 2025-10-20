import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Printer, FileDown, Settings, X } from "lucide-react";
import { Order } from "@/contexts/OrderContext";
import { InvoicePrint } from "./InvoicePrint";
import { usePrintInvoice } from "@/hooks/usePrintInvoice";

interface PrintInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const PrintInvoiceModal = ({ order, onClose }: PrintInvoiceModalProps) => {
  const { printRef, printInvoice, exportPDF } = usePrintInvoice();
  const [copies, setCopies] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Nova Souls',
    address: '123 Street Name, City',
    phone: '0123456789',
    taxId: ''
  });

  if (!order) return null;

  const handlePrint = () => {
    printInvoice(order, {
      copies,
      companyInfo
    });
    onClose();
  };

  const handleExportPDF = async () => {
    try {
      await exportPDF(order, {
        companyInfo
      });
      onClose();
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>In hóa đơn #{order.orderNumber}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Print Preview */}
          <Card className="p-4 overflow-auto max-h-[600px] bg-white">
            <InvoicePrint ref={printRef} order={order} companyInfo={companyInfo} />
          </Card>

          {/* Print Options */}
          <div className="space-y-6">
            {/* Basic Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Số bản in</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={copies}
                  onChange={(e) => setCopies(parseInt(e.target.value))}
                />
              </div>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt in
              </Button>
            </div>

            {/* Advanced Settings */}
            {showSettings && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Thông tin công ty</h3>
                <div className="space-y-2">
                  <div>
                    <Label>Tên công ty</Label>
                    <Input
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Địa chỉ</Label>
                    <Input
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <Input
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Mã số thuế (nếu có)</Label>
                    <Input
                      value={companyInfo.taxId}
                      onChange={(e) => setCompanyInfo(prev => ({
                        ...prev,
                        taxId: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleExportPDF}>
            <FileDown className="h-4 w-4 mr-2" />
            Xuất PDF
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            In hóa đơn
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
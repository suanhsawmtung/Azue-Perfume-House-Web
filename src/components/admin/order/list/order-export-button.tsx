import { ExportButton } from "@/components/admin/shared/export-button";
import {
  getCsvFilename,
  isOrderPaymentStatus,
  isOrderSource,
  isOrderStatus,
} from "@/lib/utils";
import { exportAdminOrders } from "@/services/order/api";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function OrderExportButton() {
  const [searchParams] = useSearchParams();

  const handleExport = async () => {
    const search = searchParams.get("search") || "";
    const statusParam = searchParams.get("status");
    const paymentStatusParam = searchParams.get("paymentStatus");
    const sourceParam = searchParams.get("source");
    const condition = searchParams.get("condition") || undefined;

    try {
      const exportParams = {
        ...(search && { search }),
        ...(isOrderStatus(statusParam) && { status: statusParam }),
        ...(isOrderPaymentStatus(paymentStatusParam) && {
          paymentStatus: paymentStatusParam,
        }),
        ...(isOrderSource(sourceParam) && { source: sourceParam }),
        ...(condition && { condition }),
      };
      const blob = await exportAdminOrders(exportParams);
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = getCsvFilename("orders", exportParams);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    } catch {
      toast.error("Failed to export orders");
    }
  };

  return (
    <ExportButton
      onExport={handleExport}
      text="Export CSV"
      className="h-12 flex-1 cursor-pointer sm:w-56 sm:flex-none"
    />
  );
}

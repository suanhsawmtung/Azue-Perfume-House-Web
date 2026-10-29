import { ExportButton } from "@/components/admin/shared/export-button";
import { exportAdminInventories } from "@/services/inventory/api";
import type { InventoryType } from "@/types/inventory.type.ts";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

interface InventoryExportButtonProps {
  type: InventoryType;
}

export function InventoryExportButton({ type }: InventoryExportButtonProps) {
  const [searchParams] = useSearchParams();

  const handleExport = async () => {
    const search = searchParams.get("search") || "";

    try {
      const blob = await exportAdminInventories(type, {
        ...(search && { search }),
      });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "inventories.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    } catch {
      toast.error("Failed to export inventories");
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

import { ExportButton } from "@/components/admin/shared/export-button";
import {
  getCsvFilename,
  isConcentration,
  isGender,
  parseBoolean,
} from "@/lib/utils";
import { exportAdminProducts } from "@/services/product/api";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function ProductExportButton() {
  const [searchParams] = useSearchParams();

  const handleExport = async () => {
    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || undefined;
    const genderParam = searchParams.get("gender");
    const concentrationParam = searchParams.get("concentration");
    const isActive = parseBoolean(searchParams.get("isActive"));
    const isLimited = parseBoolean(searchParams.get("isLimited"));

    try {
      const exportParams = {
        ...(search && { search }),
        ...(brand && { brandSlug: brand }),
        ...(isGender(genderParam) && { gender: genderParam }),
        ...(isConcentration(concentrationParam) && {
          concentration: concentrationParam,
        }),
        ...(typeof isActive === "boolean" && { isActive }),
        ...(typeof isLimited === "boolean" && { isLimited }),
      };
      const blob = await exportAdminProducts(exportParams);
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = getCsvFilename("products", exportParams);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    } catch {
      toast.error("Failed to export products");
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

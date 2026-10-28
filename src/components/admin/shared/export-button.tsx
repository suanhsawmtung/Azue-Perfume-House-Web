import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState, type ComponentProps } from "react";

interface ExportButtonProps
  extends Omit<ComponentProps<typeof Button>, "onClick" | "children"> {
  onExport: () => Promise<void>;
  text?: string;
  loadingText?: string;
}

export function ExportButton({
  onExport,
  text = "Export",
  loadingText = "Exporting...",
  className,
  disabled,
  ...props
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;

    setIsExporting(true);
    try {
      await onExport();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={handleExport}
      disabled={disabled || isExporting}
      {...props}
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {isExporting ? loadingText : text}
    </Button>
  );
}

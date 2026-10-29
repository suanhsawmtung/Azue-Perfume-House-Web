import { InventoriesList } from "@/components/admin/inventory/list/inventories-list";
import { InventoryExportButton } from "@/components/admin/inventory/list/inventory-export-button";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { DEFAULT_LIMIT } from "@/services/inventory/api";
import { useListInventories } from "@/services/inventory/queries/useGetInventories";
import { type InventoryType } from "@/types/inventory.type.ts";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function AdminInventoriesPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<InventoryType>("PURCHASE");

  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") || "";
  const offset = (page - 1) * DEFAULT_LIMIT;

  const { data } = useListInventories(activeTab, {
    limit: DEFAULT_LIMIT,
    offset,
    search,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Inventory Management" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <CreateButton
              text="Create Inventory"
              to="/admin/inventories/create"
            />
            <InventoryExportButton type={activeTab} />
          </div>

          <FilterBar />
        </div>

        {data && (
          <InventoriesList
            inventories={data.items}
            total={data.totalPages}
            page={data.currentPage}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </section>
  );
}

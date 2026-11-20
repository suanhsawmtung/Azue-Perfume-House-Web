import { OrderFilterDialog } from "@/components/admin/order/list/order-filter-dialog";
import { OrderList } from "@/components/admin/order/list/order-list";
import { OrderExportButton } from "@/components/admin/order/list/order-export-button";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { MoreFilterButton } from "@/components/admin/shared/more-filter-button";
import { isOrderPaymentStatus, isOrderSource, isOrderStatus } from "@/lib/utils";
import { ADMIN_DEFAULT_LIMIT } from "@/services/order/api";
import { useListOrders } from "@/services/order/queries/admin/useGetOrders";
import { useSearchParams } from "react-router";

const AdminOrdersPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") ?? 1);

  const statusParam = searchParams.get("status");
  const status = isOrderStatus(statusParam) ? statusParam : undefined;

  const paymentStatusParam = searchParams.get("paymentStatus");
  const paymentStatus = isOrderPaymentStatus(paymentStatusParam) ? paymentStatusParam : undefined;

  const sourceParam = searchParams.get("source");
  const source = isOrderSource(sourceParam) ? sourceParam : undefined;

  const offset = (page - 1) * ADMIN_DEFAULT_LIMIT;

  const { data } = useListOrders({
    offset,
    search,
    limit: ADMIN_DEFAULT_LIMIT,
    status,
    paymentStatus,
    source,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Orders" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <CreateButton text="Create Order" to="/admin/orders/create" />
            <OrderExportButton />

            <div className="block sm:hidden">
              <OrderFilterDialog>
                <MoreFilterButton />
              </OrderFilterDialog>
            </div>
          </div>

          <FilterBar>
            <OrderFilterDialog>
              <MoreFilterButton />
            </OrderFilterDialog>
          </FilterBar>
        </div>

        {data && (
          <OrderList
            orders={data.items}
            total={data.totalPages}
            page={data.currentPage}
            size={data.pageSize}
          />
        )}

      </div>
    </section>
  );
};

export default AdminOrdersPage;

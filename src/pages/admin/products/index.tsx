import { ProductFilterDialog } from "@/components/admin/product/list/product-filter-dialog";
import { ProductList } from "@/components/admin/product/list/products-list";
import { ProductExportButton } from "@/components/admin/product/list/product-export-button";
import AdminHeaderSection from "@/components/admin/shared/admin-header-section";
import { CreateButton } from "@/components/admin/shared/create-button";
import { FilterBar } from "@/components/admin/shared/filter-bar";
import { MoreFilterButton } from "@/components/admin/shared/more-filter-button";
import { isConcentration, isGender, parseBoolean } from "@/lib/utils";
import { DEFAULT_LIMIT } from "@/services/product/api";
import { useListProducts } from "@/services/product/queries/admin/useGetProducts";
import { useSearchParams } from "react-router";

const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const genderParam = searchParams.get("gender");
  const concentrationParam = searchParams.get("concentration");
  const isActiveParam = searchParams.get("isActive");
  const isLimitedParam = searchParams.get("isLimited");
  const page = Number(searchParams.get("page") ?? 1);
  const brandParam = searchParams.get("brand");
  const brand =
    typeof brandParam === "string" && brandParam.trim().length > 0
      ? brandParam.trim()
      : undefined;

  const offset = (page - 1) * DEFAULT_LIMIT;

  const isActive = parseBoolean(isActiveParam);
  const isLimited = parseBoolean(isLimitedParam);

  const gender = isGender(genderParam) ? genderParam : undefined;
  const concentration = isConcentration(concentrationParam)
    ? concentrationParam
    : undefined;

  const { data } = useListProducts({
    offset,
    search,
    limit: DEFAULT_LIMIT,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  });

  return (
    <section className="w-full">
      <AdminHeaderSection title="Products" />

      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <CreateButton text="Create Product" to="/admin/products/create" />
            <ProductExportButton />

            <div className="block sm:hidden">
              <ProductFilterDialog>
                <MoreFilterButton />
              </ProductFilterDialog>
            </div>
          </div>

          <FilterBar>
            <ProductFilterDialog>
              <MoreFilterButton />
            </ProductFilterDialog>
          </FilterBar>
        </div>

        {data && (
          <ProductList
            products={data.items}
            total={data.totalPages}
            page={data.currentPage}
            size={data.pageSize}
          />
        )}
      </div>
    </section>
  );
};

export default AdminProductsPage;

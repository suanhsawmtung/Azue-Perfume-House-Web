import api from "@/lib/api";
import type {
  AdminProductDetailType,
  Concentration,
  CreateProductParams,
  CreateProductResponse,
  CreateProductVariantResponse,
  DeleteProductResponse,
  DeleteProductVariantResponse,
  Gender,
  ProductCardType,
  ProductDetailType,
  ProductListResult,
  ProductQueryParams,
  ProductVariantDetailType,
  UpdateProductParams,
  UpdateProductResponse
} from "@/types/product.type";
import type { ProductListQueryOptions } from "./key";
import type { CursorPaginationResultT, SelectOptionT } from "@/types";

export const DEFAULT_LIMIT = 8;
export const ADMIN_DEFAULT_LIMIT = 10;

export async function fetchProducts(options: ProductListQueryOptions): Promise<ProductListResult<ProductCardType>> {
  const {
    offset = 0,
    search,
    limit = DEFAULT_LIMIT,
    brand,
    gender,
    concentration,
    isLimited,
  } = options;

  const queryParams: ProductQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(brand && { brandSlug: brand }),
    ...(gender && { gender }),
    ...(concentration && { concentration }),
    ...(typeof isLimited === "boolean" && { isLimited }),
    isActive: true,
  };

  const response = await api.get("/products", {
    params: queryParams,
  });

  return response.data?.data;
}

export async function fetchProduct(slug: string, params: { variant: string | null }): Promise<ProductDetailType> {
  const response = await api.get(`/products/${slug}`, {
    params
  });
  return response.data?.data;
}

export async function fetchAdminProducts(options: {
  offset?: number;
  search?: string;
  limit?: number;
  brand?: string;
  gender?: Gender;
  concentration?: Concentration;
  isActive?: boolean;
  isLimited?: boolean;
}): Promise<ProductListResult> {
  const {
    offset = 0,
    search,
    limit = ADMIN_DEFAULT_LIMIT,
    brand,
    gender,
    concentration,
    isActive,
    isLimited,
  } = options;

  const queryParams: ProductQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(brand && { brandSlug: brand }),
    ...(gender && { gender }),
    ...(concentration && { concentration }),
    ...(typeof isActive === "boolean" && { isActive }),
    ...(typeof isLimited === "boolean" && { isLimited }),
  };

  const response = await api.get("/admin/products", {
    params: queryParams,
  });

  // Backend returns: { success: true, data: { products, currentPage, totalPages, pageSize }, message: null }
  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
  };
}

export async function exportAdminProducts(
  params: Pick<
    ProductQueryParams,
    "search" | "brandSlug" | "gender" | "concentration" | "isActive" | "isLimited"
  >,
): Promise<Blob> {
  const response = await api.get<Blob>("/admin/products/export", {
    params,
    responseType: "blob",
  });

  return response.data;
}

export async function fetchAdminProduct(slug: string): Promise<AdminProductDetailType> {
  const response = await api.get(`/admin/products/${slug}`);

  // Backend returns: { success: true, data: { product }, message: null }
  return response.data?.data;
}

export async function fetchAdminProductVariants(
  slug: string,
): Promise<AdminProductDetailType> {
  const response = await api.get(`/admin/products/${slug}/variants`);

  // Backend returns: { success: true, data: { product }, message: null }
  return response.data?.data;
}

export async function fetchAdminProductVariant(
  slug: string,
  variantSlug: string,
): Promise<ProductVariantDetailType> {
  const response = await api.get(
    `/admin/products/${slug}/variants/${variantSlug}`,
  );

  // Backend returns: { success: true, data: { variant }, message: null }
  return response.data?.data;
}

export async function createProduct(
  params: CreateProductParams,
): Promise<CreateProductResponse> {
  const response = await api.post("/admin/products", params);

  // Backend returns: { success: true, data: { product }, message: string }
  return response.data;
}

export async function updateProduct(
  slug: string,
  params: UpdateProductParams,
): Promise<UpdateProductResponse> {
  const response = await api.patch(`/admin/products/${slug}`, params);

  // Backend returns: { success: true, data: { product }, message: string }
  return response.data;
}

export async function deleteProduct({
  slug,
}: {
  slug: string;
}): Promise<DeleteProductResponse> {
  const response = await api.delete(`/admin/products/${slug}`);

  // Backend returns: { success: true, message: string }
  return response.data;
}

export async function createProductVariant(
  slug: string,
  formData: FormData,
): Promise<CreateProductVariantResponse> {
  const response = await api.post(
    `/admin/products/${slug}/variants/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  // Backend returns: { success: true, data: { variant }, message: string }
  return response.data;
}

export async function updateProductVariant(
  slug: string,
  variantSlug: string,
  formData: FormData,
): Promise<CreateProductVariantResponse> {
  const response = await api.patch(
    `/admin/products/${slug}/variants/${variantSlug}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  // Backend returns: { success: true, data: { variant }, message: string }
  return response.data;
}

export async function deleteProductVariant({
  productSlug,
  variantSlug,
}: {
  productSlug: string;
  variantSlug: string;
}): Promise<DeleteProductVariantResponse> {
  const response = await api.delete(
    `/admin/products/${productSlug}/variants/${variantSlug}`,
  );

  // Backend returns: { success: true, message: string }
  return response.data;
}

export async function fetchProductSelectOptions(params: {
  search: string;
  cursor: number | null;
}): Promise<CursorPaginationResultT<SelectOptionT>> {
  const { search, cursor } = params;

  const response = await api.get("/products/select-options", {
    params: {
      search,
      limit: 15,
      ...(cursor && { cursor }),
    },
  });

  // Backend returns: { success: true, data: { items: [{ id, name, slug }], nextCursor }, message: null }
  return response.data?.data;
}

export async function fetchProductVariantSelectOptions(params: {
  productSlug: string | null;
  search: string;
  cursor: number | null;
}): Promise<CursorPaginationResultT<SelectOptionT>> {
  const { productSlug, search, cursor } = params;

  if (!productSlug) {
    return {
      items: [],
      nextCursor: null,
      totalCount: 0
    };
  }

  const response = await api.get(`/products/${productSlug}/variants/select-options`, {
    params: {
      search,
      limit: 15,
      ...(cursor && { cursor }),
    },
  });

  // Backend returns: { success: true, data: { items: [{ id, name, slug }], nextCursor }, message: null }
  return response.data?.data;
}

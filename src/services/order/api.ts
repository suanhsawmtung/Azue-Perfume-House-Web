import api from "@/lib/api";
import type { CursorPaginationResultT } from "@/types";
import type {
  CancelOrderValues,
  OrderDetailType,
  OrderListResult,
  OrderQueryParams,
  OrderType,
} from "@/types/order.type.ts";

export const ADMIN_DEFAULT_LIMIT = 10;
export const DEFAULT_LIMIT = 5;

export async function fetchOrders(
  params: OrderQueryParams,
): Promise<CursorPaginationResultT<OrderType>> {
  const { cursor, search, limit = DEFAULT_LIMIT, condition } = params;
  const queryParams: OrderQueryParams = {
    limit,
    cursor,
    ...(search && { search }),
    ...(condition && { condition }),
  };

  const response = await api.get("/orders", {
    params: queryParams,
  });

  return response.data?.data;
}

export async function fetchAdminOrders(
  params: OrderQueryParams,
): Promise<OrderListResult> {
  const {
    offset = 0,
    search,
    limit = ADMIN_DEFAULT_LIMIT,
    status,
    paymentStatus,
    source,
  } = params;
  const queryParams: OrderQueryParams = {
    limit,
    offset,
    ...(search && { search }),
    ...(status && { status }),
    ...(paymentStatus && { paymentStatus }),
    ...(source && { source }),
  };

  const response = await api.get("/admin/orders", {
    params: queryParams,
  });

  return {
    items: response.data?.data?.items || [],
    currentPage: response.data?.data?.currentPage || 0,
    totalPages: response.data?.data?.totalPages || 0,
    pageSize: response.data?.data?.pageSize || 10,
  };
}

export async function exportAdminOrders(
  params: Pick<
    OrderQueryParams,
    "search" | "status" | "paymentStatus" | "source" | "condition"
  >,
): Promise<Blob> {
  const response = await api.get<Blob>("/admin/orders/export", {
    params,
    responseType: "blob",
  });

  return response.data;
}

export async function fetchAdminOrder(code: string): Promise<OrderDetailType> {
  const response = await api.get(`/admin/orders/${code}`);
  return response.data?.data;
}

export async function createOrder(params: FormData): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.post("/admin/orders", params);
  return response.data;
}

export async function updateOrder(
  code: string,
  params: FormData,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.patch(`/admin/orders/${code}`, params);
  return response.data;
}

export async function cancelOrder(
  code: string,
  params: CancelOrderValues,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await api.patch(`/orders/${code}/cancel`, params);
  return response.data;
}

export async function placeOrder(formData: FormData) {
  const response = await api.post("/orders", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

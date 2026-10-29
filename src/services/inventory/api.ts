import api from "@/lib/api";
import {
  type CreateInventoryParams,
  type InventoryListResult,
  type InventoryQueryParams,
  type InventoryType,
} from "@/types/inventory.type.ts";

export const DEFAULT_LIMIT = 10;

export const listInventories = async (
  type: string,
  params: InventoryQueryParams
): Promise<InventoryListResult> => {
  const response = await api.get(`/admin/inventories/${type}`, {
    params,
  });

  return response.data.data;
};

export const exportAdminInventories = async (
  type: InventoryType,
  params: Pick<InventoryQueryParams, "search">,
): Promise<Blob> => {
  const response = await api.get<Blob>("/admin/inventories/export", {
    params: {
      type,
      ...params,
    },
    responseType: "blob",
  });

  return response.data;
};

export const createInventory = async (params: CreateInventoryParams) => {
  const response = await api.post("/admin/inventories", params);
  return response.data;
};

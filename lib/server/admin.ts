import { UpdateUserData } from "@/app/model";

import { apiClient } from "../axios";

export const updateAdminUser = async (data: UpdateUserData) => {
  return await apiClient.put("/api/auth/update", data);
};

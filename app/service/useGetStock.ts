import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useGetStock = () => {
  return useQuery({
    queryFn: () =>
      apiClient.get("/api/amrod/stock").then((res) => {
        return res.data;
      }),
    queryKey: ["amrod-stock"],
  });
};

export default useGetStock;

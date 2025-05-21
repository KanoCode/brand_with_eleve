import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useGetProducts = () => {


  return useQuery({
    queryFn: () =>
      apiClient.get("/api/amrod/product/all_products").then((res) => {
        return res.data;
      }),
    queryKey: ["amrod-products"],
  });
};

export default useGetProducts;

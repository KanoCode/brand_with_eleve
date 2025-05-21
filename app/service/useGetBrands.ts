import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";
// import useGetForex from "./useGetForexExchangeRate";
// import { useProductStore } from "@/app/store/productsStore";
import { shallow } from "zustand/shallow";

const useGetBrands = () => {
  return useQuery({
    queryFn: () =>
      apiClient.get("/api/amrod/brand").then((res) => {
        return res.data;
      }),
    queryKey: ["brands"],
  });
};

export default useGetBrands;

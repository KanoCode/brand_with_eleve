import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useGetAllFeaturedProducts = () => {
  return useQuery({
    queryFn: () =>
      apiClient.get("/api/markethubPartners").then((res) => {
        return res.data;
      }),
    queryKey: ["get-markethub-partners"],
  });
};

export default useGetAllFeaturedProducts;

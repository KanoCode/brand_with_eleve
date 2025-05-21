import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";

const useGetCategories = () => {
  return useQuery({
    queryFn: () => apiClient.get("/api/amrod/category").then((res) => res.data),
    queryKey: ["amrod-categories"],
  });
};

export default useGetCategories;

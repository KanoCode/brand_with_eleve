import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";


const useGetCurrentRate = () => {
  return useQuery({
    queryFn: () =>
      apiClient.get("/api/markethub_rate").then((res) => {
        return res.data;
      }),
    queryKey: ["current-rate"],
  });
};

export default useGetCurrentRate;

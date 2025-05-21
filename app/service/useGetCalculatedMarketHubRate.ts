import { apiClient } from "@/lib/axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

const useGetCalculatedRate = () => {
  return useQuery({
    queryFn: () =>
      apiClient.get("/api/markethub_rate").then((res) => {
        return res.data;
      }),
    queryKey: ["markethub-calculated-rate"],
  });
};

export default useGetCalculatedRate;

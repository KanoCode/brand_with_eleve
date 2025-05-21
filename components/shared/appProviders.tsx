"use client";

import { QueryClient, QueryClientProvider } from "react-query";
// import { getQueryClient } from "@/lib/query";
import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "react-query/devtools";
interface Props {
  children: React.ReactNode;
}

const AppProviders: FC<Props> = async ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="top-right"
          theme="light"
          expand={true}
          closeButton
          richColors
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default AppProviders;

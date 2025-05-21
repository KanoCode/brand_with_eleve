"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { QueryClient, QueryClientProvider } from 'react-query';


import UpdateGeneralPrice from "./components/updateGeneralPrices";

import { Suspense } from "react";

const Page = () => {
  // Create a client
const queryClient = new QueryClient();
  return (
    
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle>General Prices</CardTitle>
        <CardDescription>
          Provide the following to update the general price percentage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loader />}>
          <UpdateGeneralPrice />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Page;

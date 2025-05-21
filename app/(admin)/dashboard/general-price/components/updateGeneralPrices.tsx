"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import ActionAlert from "@/components/shared/ActionAlert";
import { db } from "@/app/firebase/config";
import { collection, setDoc, doc } from "firebase/firestore";
//Form validation schema
const FormSchema = z.object({
  overrallPercentage: z
    .string()
    .min(1, { message: "Overall percentage is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message:
        "Overall percentage must be a valid numeric value with up to 2 decimal places",
    }),
});

const UpdateGeneralPrice = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      overrallPercentage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // get the query client
    const body = {
      id: "7d851579-d046-4c87-8857-2735e31320f6",
      generalPercentage: values.overrallPercentage,
    };

    try {
      const generalPercentageRef = collection(db, "generalPrices");

      await setDoc(doc(generalPercentageRef, "generalPrice"), { ...body });

      toast.success("General Price percentage Succesffully Updated");
      queryClient.invalidateQueries({
        queryKey: ["markethub-calculated-rate"],
      });
      form.reset({
        overrallPercentage: "0",
      });
      router.push("/dashboard/products-prices");
      setLoading(false);
      // refetch();
    } catch (error) {
      toast.error(
        "There was a problem updating general price check console for details"
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="overrallPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Overrall Products Percentage
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g 10" {...field} />
              </FormControl>
              <FormMessage />

              <FormDescription>
                Please note all store products will increase by this percentage
              </FormDescription>
            </FormItem>
          )}
        />

        <ActionAlert
          actionProps={{
            onClick: () => form.handleSubmit(onSubmit)(),
          }}
          actionTitle={
            loading ? <Loader2 className="w-7 h-7 animate-spin" /> : "save"
          }
          alertDescription="This Action will save and change your website general prices"
          alertTile="Save General Price"
          triggerButtonProps={{
            type: "button",
          }}
        />
      </form>
    </Form>
  );
};

export default UpdateGeneralPrice;

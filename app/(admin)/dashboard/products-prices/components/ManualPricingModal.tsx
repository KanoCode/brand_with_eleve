import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useState } from "react";
import { db } from "@/app/firebase/config";
import { setDoc, doc } from "firebase/firestore";

//Form validation schema

const FormSchema = z.object({
  productCode: z
    .string()
    .min(5, { message: "Enter the correct product format" })
    .regex(/^[A-Z0-9]+(-[A-Z0-9]+)+$/, {
      message: "This product code is not in the format expected",
    }),

  manualPricing: z
    .string()
    .min(1, { message: "Set a manual price " })
    .regex(/[0-9]/, {
      message: "This field should be valid number",
    }),
});

export function ManualPriceDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const body = {
      productId: values.productCode,
      price: values.manualPricing,
    };

    try {
      await setDoc(doc(db, "manualPrices", body.productId), body);
      toast.success(
        "You have successfully changed the pricing of this product"
      );
      setDialogOpen(false);
    } catch (error) {
      toast.error("uh oh something went wrong");
      setDialogOpen(false);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Set up manual product price </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Set Manual Price </DialogTitle>
          <DialogDescription>
            Make changes to your product pricing here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Product code</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manualPricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary"> New Price</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

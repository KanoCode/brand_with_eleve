"use client";

import { Button } from "@/components/ui/button";
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
import Loader from "@/components/ui/loader";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import ActionAlert from "@/components/shared/ActionAlert";
import { addPartnerLink } from "@/app/actions";
//Form validation schema
const FormSchema = z.object({
  partnerLink: z.string(),
});

const UpdateGeneralPrice = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      partnerLink:
        "https://storyblok.pleinaircdn.com/f/110020/x/57992d833b/bojangles.svg",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const body = {
      link: values.partnerLink,
    };

    // await addPartnerLink(body)

    try {
      console.log("body===>", body);
    } catch (error) {}

    // console.log(body);
    // createPartnerLinkMutation(body, {
    //   onSuccess: () => {
    //     toast.success("You have successfully updated your list of partners");
    //     form.reset();
    //   },
    //   onError: (err) => {
    //     console.log(err);
    //     toast.error("An error occurred check the logs for more information");
    //   },
    // });
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="partnerLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                Paste a link to the brand logo below
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <ActionAlert
          actionProps={{
            onClick: () => form.handleSubmit(onSubmit)(),
          }}
          actionTitle={
            isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : "save"
          }
          alertDescription="This Action will save and change you website general prices"
          alertTile="Save General Price"
          triggerButtonProps={{
            type: "button",
          }}
        /> */}
      </form>
    </Form>
  );
};

export default UpdateGeneralPrice;

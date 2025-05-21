"use client";
import React, { useState } from "react";

import { Button, Button as ButtonPrimary } from "../ui/button";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactUser } from "@/lib/server/contactUser";
import { toast } from "sonner";
const formSchema = z.object({
  email: z.string().min(16),
});

const Subscribe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: sendEmailToMarketHub, isLoading: isUpdating } = useMutation({
    mutationFn: contactUser,
    mutationKey: "send-email-to-user",
  });

  async function onSubmit({ email }: z.infer<typeof formSchema>) {
    let body = {
      email,
    };

    // setLoading(true);

    sendEmailToMarketHub(body, {
      onSuccess: () => {
        toast.success("please check your email");
        form.reset();
      },
      onError: (err: any) => {
        setLoading(false);
        toast.error("An error occurred" + err.message);
        console.log(err);
      },
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletter = {
    heading: "Drop your email below and receive a free consultation package",
  };
  return (
    <div className="items-start space-y-5 p-5 mx-10 rounded-2xl bg-black/10">
      <Form {...form}>
        <h3 className="text-xl font-medium">{newsletter.heading}</h3>

        <form
          className="grid grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full sm:w-full py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 v\border-b-2 border-transparent border-b-neutral-400 bg-transparent placeholder:text-sm placeholder:text-neutral-600 focus:border-transparent"
                    placeholder="Your email@email.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <Button
              type="submit"
              className="bg-primary text-white font-bold py-2 px-3 rounded-full hover:bg-red-500 transition duration-300"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Subscribe;

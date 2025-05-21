import { useEffect, useState } from "react";
// import { Steps, StepsProvider, useSteps } from "react-step-builder";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { contactUs } from "@/lib/server/contact";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "react-query";
import { Button } from "../ui/button";

interface FormInputs {
  test: string;
}

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(16),
  phoneNumber: z.string().min(10),
  message: z.string().min(20),
});

export default function contactForm() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: sendEmailToMarketHub, isLoading: isUpdating } = useMutation({
    mutationFn: contactUs,
    mutationKey: "send-email-to-market-hub",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });
  async function onSubmit({
    email,
    firstName,
    lastName,
    phoneNumber,
    message,
  }: z.infer<typeof formSchema>) {
    let body = {
      email,
      phoneNumber,
      firstName,
      lastName,
      message,
    };

    setLoading(true);

    sendEmailToMarketHub(body, {
      onSuccess: () => {
        toast.success("Message sent successfully");
        form.reset();
      },
      onError: (err: any) => {
        setLoading(false);
        toast.error("An error occurred" + err.message);
        console.log(err);
      },
    });
  }

  return (
    <>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-red-600 mb-4">
          DROP US A LINE..
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          We would sure like to hear from you, use the form below or email us at{" "}
          <a
            href="mailto:sales.markethub.zm@gmail.com"
            className="text-red-500"
          >
            sales.markethub.zm@gmail.com
          </a>
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      placeholder="Enter First Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surname Field */}

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Last Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      placeholder="Enter Email Address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Contact Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Message / Comment"
                      rows={4}
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-500 transition duration-300"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

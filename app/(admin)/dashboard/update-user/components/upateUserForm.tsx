"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ActionAlert from "@/components/shared/ActionAlert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateAdminUser } from "@/lib/server/admin";
import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

//Form validation schema

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Password must contain at least one special character",
  });
const FormSchema = z
  .object({
    newUserName: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"],
  });
const UpdateUserForm = () => {
  const router = useRouter();
  const session = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newUserName: "",
      newPassword: "",
      currentPassword: "",
    },
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: updateAdminUser,
    mutationKey: ["update-admin-user"],
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const data = {
      ...values,
      userName: session.data?.user.userName,
    };
    mutate(data, {
      onSuccess: () => {
        toast.success("user credentials successfully updated");
        signOut({ callbackUrl: "/auth/login" });
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1  gap-4"
      >
        <div>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Password123@"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />

                <FormDescription>
                  Please enter your admin password.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="newUserName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">New User Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., john_doe" {...field} />
                </FormControl>
                <FormMessage />

                <FormDescription>
                  Please enter your new admin username.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Password123@"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />

                <FormDescription>
                  Please enter your new admin password.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPasswordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Confirmation Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />

                <FormDescription>You passwords must much</FormDescription>
              </FormItem>
            )}
          />

          <div className="mt-4">
            <ActionAlert
              actionProps={{
                onClick: () => form.handleSubmit(onSubmit)(),
              }}
              actionTitle={
                isLoading ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  "save"
                )
              }
              alertDescription="This Action will update you admin credentials. make sure to securely keep you password"
              alertTile="Update Admin Credentials"
              triggerButtonProps={{
                type: "button",
              }}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;

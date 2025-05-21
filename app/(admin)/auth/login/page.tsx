"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { logo1 } from "@/asserts/img";
import { toast } from "sonner";
import { auth } from "@/app/firebase/config";

//Form validation schema
const FormSchema = z.object({
  userName: z
    .string()
    .trim()
    .email("email is invalid")
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "email cannot exceed 30 characters" }),
  password: z
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
    }),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const handleSignIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      if (res) {
        sessionStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    } catch (e) {
      console.error(e);
      return e;
    }
  };

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  let alertContent: ReactNode | null = null;

  const onSubmit = async ({
    userName,
    password,
  }: z.infer<typeof FormSchema>) => {
    await handleSignIn(userName, password)
      .then((res: any) => {
        console.log(res.user);
        router.push("/dashboard/products-prices");
        toast.success("Successfully signed in");
      })
      .catch((e) => {
        console.log(e);
        toast.error("User not found or invalid credentials");
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-yellow bg-opacity-20 p-4">
      <div className=" flex  flex-col gap-2 bg-white shadow-lg w-full md:w-[450px] rounded-md top p-10">
        <div className="flex flex-col justify-center gap-[2px] items-center">
          <Image
            height={553}
            width={1080}
            src={logo1}
            alt="Logo"
            className="w-[90px] h-[60px]"
          />
          <div className="font-bold text-center mt-4">Login Admin</div>
        </div>
        {alertContent}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., john_doe" {...field} />
                  </FormControl>
                  <FormMessage />

                  <FormDescription>
                    Please enter your admin username.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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

            <Button disabled={loading} type="submit" className="mt-4">
              Login
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Page;

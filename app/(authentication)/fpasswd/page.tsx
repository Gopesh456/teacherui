"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeft, Fingerprint } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { ForgetPasswdService } from "@/service/forgetpasswd.service";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const ForgetpasswdService = new ForgetPasswdService();
  const router = useRouter();
  const { toast } = useToast();
  const FormSchema = z.object({
    email: z.string().email().min(5),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    if (data.email) {
      ForgetpasswdService.resetEmail(data)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            toast({
              title: "Email sent",
              description: "We have sent you an email with reset instructions",
              duration: 5000,
            });
            router.push("/otp/" + res.id);
          } else {
            toast({
              title: "Error",
              description: "This email is not registered with us",
              duration: 5000,
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }

  return (
    <div className="w-screen h-screen grid place-content-center">
      <Form {...form}>
        <div className="grid grid-rows-2 gap place-content-center justify-center">
          <div className="grid row-span-1 place-content-center justify-center">
            <div className="border-2 rounded-md p-2">
              <Fingerprint size={40} strokeWidth={2} />
            </div>
          </div>
          <div className="grid row-span-1 place-content-center mb-5 justify-center">
            <h1 className=" text-center text-3xl ">Forgot password?</h1>
            <p className="text-gray-500 ">
              {" "}
              No worries, we'll send you reset informations.
            </p>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[25rem]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="   text-lg">Email</FormLabel> */}
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your registered Email ID"
                    className=" py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-[25rem]"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid mt-5 place-content-center justify-center w-[25rem] ">
            <Button
              type="submit"
              variant="outline"
              size="default"
              className="py-6 px-7"
            >
              Reset Password
            </Button>
            <Button
              type="submit"
              variant="link"
              size="default"
              className="py-6    px-7 mt-5"
              asChild
            >
              <a href="/login">
                <MoveLeft size={20} />
                <span className="px-2">Back to Login</span>
              </a>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;

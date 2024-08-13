"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MailOpen, MoveLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ForgetPasswdService } from "@/service/forgetpasswd.service";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { toast, useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const OTPPage = () => {
  const ForgetpasswdService = new ForgetPasswdService();
  const params = useParams<{ id: string }>();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();
  setTheme("dark");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onSubmit",
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    let obj = { otp: data.pin, id: params.id };
    ForgetpasswdService.resetOtp(obj)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          toast({
            title: "Success",
            description: "Change your password",
            duration: 5000,
          });
          router.push("/reset-password/" + params.id);
        } else {
          toast({
            title: "Error",
            description: "Invalid one-time password",
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Invalid one-time password",
          duration: 5000,
        });
      });
  }

  return (
    <div className="w-screen h-screen grid place-content-center ">
      <div className="otp-box grid place-content-center justify-center">
        <div className="grid grid-rows-2 gap place-content-center justify-center">
          <div className="grid row-span-1 place-content-center justify-center">
            <div className="border-2 rounded-md p-2">
              <MailOpen size={40} strokeWidth={1} />
            </div>
          </div>
          <div className="grid row-span-1 place-content-center mb-5 justify-center">
            <h1 className="text-white text-center text-3xl ">Password reset</h1>
            <p className="text-gray-500 ">
              {" "}
              Please enter the one-time password sent to your email.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 grid place-content-center justify-center w-full"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="grid justify-center place-content-center">
                  <FormControl>
                    <div className="grid justify-center place-content-center">
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="text-2xl p-4 m-1 w-16 h-16 border rounded-md"
                          />
                          <InputOTPSlot
                            index={1}
                            className="text-2xl m-1 p-4 w-16 h-16 border rounded-md"
                          />
                          <InputOTPSlot
                            index={2}
                            className="text-2xl m-1 p-4 w-16 h-16 border rounded-md"
                          />
                          <InputOTPSlot
                            index={3}
                            className="text-2xl  m-1 p-4 w-16 h-16 border rounded-md"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-[20rem]">
              Continue
            </Button>
            <Button
              variant="link"
              size="default"
              className="py-6 text-white px-7 mt-5"
              asChild
            >
              <a href="/login">
                <MoveLeft size={20} />
                <span className="px-2">Back to Login</span>
              </a>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default OTPPage;

"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { SignInService } from "@/service/login.service";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";
// install shadcn
// install zod
// install reacthookform

const LoginPage = () => {
  const signInService = new SignInService();
  const { setTheme } = useTheme();
  const router = useRouter();
  const { toast } = useToast();
  setTheme("system");
  const UserSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6).max(100),
  });
  type formFields = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({ resolver: zodResolver(UserSchema) });
  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log(data);
    signInService
      .signIn(data)
      .then((res) => {
        console.log("res", res);
        console.log("success");
        if (res.status === 200) {
          toast({ title: "Login Success" });
          router.push("/studentlist/" + res.id);
        } else if (res.status === 402) {
          // wrong email
          toast({ title: "Email not found" });
        }
      })
      .catch((error) => {
        console.log("error", error);
        console.log("err");
        toast({ title: "Wrong Password" });
      });
  };
  return (
    <div className="container-lg grid justify-center w-screen h-screen content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container login-box w-[500px] h-[330px] grid grid-rows-5 gap-4">
          <div className=" text-5xl content-center text-nowrap font-bold row-span-1 text-white grid grid-cols-3 ">
            Log in
          </div>
          <div className="row-span-1 h-[4rem]">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
            />
            <p className="text-red-500 ">{errors.email?.message}</p>
          </div>
          <div className="row-span-1 h-fit">
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>

          <div className="grid grid-rows-3 row-span-2 gap-4 h-fit mt-5">
            <div className="row-span-1 h-fit">
              <Button
                type="submit"
                variant="outline"
                className="  rounded-sm font-[500] h-[3rem] text-[1.187rem] w-full "
              >
                Log in
              </Button>
            </div>
            <div className="row-span-1 h-fit">
              <Button
                variant="outline"
                asChild
                className="   row-span-1 rounded-sm font-[500] h-[3rem] text-[1.187rem] w-full "
              >
                <a href="/signup">Register</a>
              </Button>
            </div>
            <div className="row-span-1 h-fit grid justify-center">
              <Button variant="link" asChild className="text-white text-[1rem]">
                <a href="/fpasswd">Forgot Password</a>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

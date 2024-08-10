"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MoveLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const router = useRouter();
  const UserSchema = z
    .object({
      fname: z.string().min(1),
      phone: z
        .string()
        .min(10)
        .regex(/^((\+971)|0)?5[024568][0-9]{7}$/, "Invalid UAE phone number"),
      email: z.string().email().min(1),
      passwd: z.string().min(6),
      cpasswd: z.string().min(6),
    })
    .refine((data) => data.passwd === data.cpasswd, {
      message: "Passwords do not match",
      path: ["cpasswd"],
    });

  type User = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(UserSchema), mode: "onTouched" });
  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    router.push("/qualification");
  };
  return (
    <div className="w-screen h-screen grid place-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container register-box w-full h-auto grid grid-rows-6 gap-5 place-content-center ">
          <div className="title text-white font-bold text-[3rem] w-full grid justify-start row-span-1 h-auto place-content-end">
            Create an account
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full place-content-start row-span-1 h-auto">
            <div className="fname col-span-1 w-[22.5rem]">
              <label
                htmlFor="fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Full Name
              </label>
              <Input
                type="text"
                id="fname"
                {...register("fname", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter your full name"
              />
              <p className="text-red-500 pl-2">{errors.fname?.message}</p>
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="phone"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Phone Number
              </label>
              <Input
                type="text"
                id="phone"
                {...register("phone", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter your Phone number"
              />
              <p className="text-red-500 pl-2">{errors.phone?.message}</p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 place-content-start row-span-1 h-auto">
            <div className="email col-span-1 ">
              <label
                htmlFor="email"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Email
              </label>
              <Input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter your Email ID"
              />
              <p className="text-red-500 pl-2">{errors.email?.message}</p>
            </div>
          </div>
          <div className=" grid grid-cols-2 h-auto gap-5 place-content-start row-span-1">
            <div className="passwd col-span-1 ">
              <label
                htmlFor="passwd"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Password
              </label>
              <Input
                type="password"
                id="passwd"
                {...register("passwd", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter a Strong Password"
              />
              <p className="text-red-500 pl-2">{errors.passwd?.message}</p>
            </div>
            <div className="cpasswd col-span-1">
              <label
                htmlFor="cpasswd"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Confirm-Password
              </label>
              <Input
                type="password"
                id="cpasswd"
                {...register("cpasswd", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Re-enter your Password"
              />
              <p className="text-red-500 pl-2">{errors.cpasswd?.message}</p>
            </div>
          </div>
          <div className="next-btn grid justify-center row-span-2 place-content-end">
            <Button
              type="submit"
              variant="outline"
              size="default"
              className="py-6 px-7 mt-8 "
            >
              <ArrowRight size={28} />
            </Button>
            <Button
              type="submit"
              variant="link"
              size="default"
              className="py-6 text-white px-7 mt-5 row-span-2"
              asChild
            >
              <a href="/login">
                <MoveLeft size={20} />
                <span className="px-2">Back to Login</span>
              </a>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

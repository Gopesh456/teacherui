"use client";
import React from "react";
import { RectangleEllipsis } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswdService } from "@/service/forgetpasswd.service";
import { useParams } from "next/navigation";
const ResetPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const ForgetpasswdService = new ForgetPasswdService();
  const UserSchema = z
    .object({
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
    if (data.passwd === data.cpasswd) {
      let obj = { password: data.passwd, id: params.id };
      ForgetpasswdService.resetPassword(obj)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            router.push("/done");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <div className="grid h-screen w-screen place-content-center justify-center">
      <div className="container reset-box">
        <div className="heading">
          <div className="grid row-span-1 place-content-center justify-center">
            <div className="border-2 rounded-md p-2">
              <RectangleEllipsis size={40} strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-white text-center text-3xl ">Set new password</h1>
          <p className="text-gray-500 text-center ">
            {" "}
            Must be atleast 8 characters.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="body grid-rows-2 gap-2">
            <div className="grid row-span-1 mt-6 p-2 place-content-center justify-center">
              <Input
                type="password"
                {...register("passwd")}
                className=" py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-[25rem]"
                placeholder="New password"
              />
              <p className="text-red-500">{errors.passwd?.message}</p>
            </div>
            <div className="grid row-span-1 pb-2 place-content-center justify-center">
              <Input
                {...register("cpasswd")}
                type="password"
                className=" py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-[25rem]"
                placeholder="Confirm password"
              />
              <p className="text-red-500">{errors.cpasswd?.message}</p>
            </div>
          </div>
          <div className="grid place-content-center  justify-center">
            <Button type="submit" className="py-6 px-7 mt-5 w-[25rem]">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;

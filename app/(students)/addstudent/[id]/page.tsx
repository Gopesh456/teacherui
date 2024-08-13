"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MoveLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { StudentService } from "@/service/student.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

const LoginPage = () => {
  const studentService = new StudentService();
  const params = useParams<{ id: string }>();

  const router = useRouter();
  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const UserSchema = z.object({
    fname: z.string().min(1, { message: "First name is required." }),
    lname: z.string().min(1, { message: "Last name is required." }),
    gender: z.enum(["male", "female"], {
      message: "Gender is required",
    }),
    grade: z.enum(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      {
        message: "Grade is required",
      }
    ),
    f_fname: z.string().min(1, { message: "Father's first name is required" }),
    m_fname: z
      .string()
      .min(10)
      .regex(/^((\+971)|0)?5[024568][0-9]{7}$/, "Invalid UAE phone number"),
    email: z.string().email().min(1),
    image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  });

  type User = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(UserSchema), mode: "onTouched" });
  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("its working");
    console.log(data);
    let obj = {
      firstName: data.fname,
      lastName: data.lname,
      gender: data.gender,
      grade: data.grade,
      parentName: data.f_fname,
      parentEmail: data.email,
      parentPhone: data.m_fname,
      displayImage: data.image[0],
      teacher: params.id,
    };
    console.log("obj", obj);
    studentService
      .addStudent(obj)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          console.log("success");
          // router.push("/studentlist/" + params.id);
        } else if (res.status === 400) {
          console.log("Invalid request");
        }
      })
      .catch((error) => {
        console.log("error", error);
        console.log("err");
      });
    // router.push("/studentlist/" + params.id);
  };
  const [selectedOption, setSelectedOption] = useState("apple");

  return (
    <div className="w-screen h-screen grid place-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container register-box w-full h-auto grid grid-rows-8 gap-5 place-content-center ">
          <div className="title text-white font-bold text-[3rem] w-full grid justify-start row-span-1 h-auto place-content-end">
            Add a student
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full place-content-start row-span-1 h-auto">
            <div className="fname col-span-1 w-[22.5rem]">
              <label
                htmlFor="fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Student's First name
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
                htmlFor="lname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Student's Last Name
              </label>
              <Input
                type="text"
                id="lname"
                {...register("lname", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter your Last name"
              />
              <p className="text-red-500 pl-2">{errors.lname?.message}</p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full place-content-start row-span-1 h-auto">
            <div className="gender col-span-1 w-[22.5rem]">
              <label
                htmlFor="gender"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Gender
              </label>
              <Select
                onValueChange={(value) => {
                  console.log(value);
                  setValue("gender", value, {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger
                  className="w-full"
                  id="gender"
                  {...register("gender", { required: true })}
                >
                  <SelectValue placeholder="Select a Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-red-500 pl-2">{errors.gender?.message}</p>
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="grade"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Grade
              </label>
              <Select
                onValueChange={(value) => {
                  console.log(value);
                  setValue("grade", value, {
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger
                  className="w-full"
                  id="grade"
                  {...register("grade", { required: true })}
                >
                  <SelectValue placeholder="Select a Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 pl-2">{errors.grade?.message}</p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full place-content-start row-span-1 h-auto">
            <div className="fname col-span-1 w-[22.5rem]">
              <label
                htmlFor="fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Parent's Full name
              </label>
              <Input
                type="text"
                id="f_fname"
                {...register("f_fname", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter the Father's full name"
              />
              <p className="text-red-500 pl-2">{errors.f_fname?.message}</p>
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="m_fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Parent's phone number
              </label>
              <Input
                type="text"
                id="lname"
                {...register("m_fname", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter the Parent's phone number"
              />
              <p className="text-red-500 pl-2">{errors.m_fname?.message}</p>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 place-content-start row-span-1 h-auto">
            <div className="email col-span-1 ">
              <label
                htmlFor="email"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Parent's Email
              </label>
              <Input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="  py-3 rounded-sm col-span-full h-[3rem] focus:outline-slate-800 w-full"
                placeholder="Enter the Parent's Email ID"
              />
              <p className="text-red-500 pl-2">{errors.email?.message}</p>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="picture">Student's Picture</label>
              <Input id="picture" type="file" {...register("image")} />
              <p className="text-red-500 pl-2">{errors?.image?.message}</p>
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
              <a href="/studentlist">
                <MoveLeft size={20} />
                <span className="px-2">Back to Student List</span>
              </a>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

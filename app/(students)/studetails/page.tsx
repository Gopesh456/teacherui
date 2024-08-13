"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MoveLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LoginPage = () => {
  const router = useRouter();
  const MAX_FILE_SIZE = 500000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  return (
    <div className="w-screen h-screen grid place-content-center">
        <div className="container register-box w-full h-auto grid grid-rows-8 gap-5 place-content-center ">
          <div className="title text-white font-bold text-[3rem] w-full grid justify-start row-span-1 h-auto place-content-end">
            Student Details
          </div>
          <div className=" grid grid-cols-2 gap-5 w-full place-content-start row-span-1 h-auto">
            <div className="fname col-span-1 w-[22.5rem]">
              <label
                htmlFor="fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Student's First name
              </label>
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                First name
              </label>
              
              
             
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="lname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Student's Last Name
              </label>
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Last name
              </label>
              
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
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Gender
              </label>

              
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="grade"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Grade
              </label>
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Grade
              </label>
              
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
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Parent Full name
              </label>
              
            </div>

            <div className="phone col-span-1 ">
              <label
                htmlFor="m_fname"
                className="text-white focus:outline-slate-800 w-[22.5rem] font-[400]"
              >
                Parent's phone number
              </label>
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Parent's phone number
              </label>
              
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
              <br/>
              <label
                className="text-white focus:outline-slate-800 font-[100] py-3 rounded-sm col-span-full h-[3rem]  w-[22.5rem]"
              >
                Parent's Email
              </label>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="picture">Student's Picture</label>
            </div>
          </div>

          <div className="next-btn grid justify-center row-span-2 place-content-end">
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
    </div>
  );
};

export default LoginPage;

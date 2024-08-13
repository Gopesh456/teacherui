"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SignUpService } from "@/service/signup.service";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

const QualificationPage = () => {
  const params = useParams<{ id: string }>();
  console.log(params.id);
  const [loading, setLoading] = useState(false);
  const signUpService = new SignUpService();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    let obj = {
      qualifications: data.bio,
      id: params.id,
    };
    console.log("data", obj);
    signUpService
      .qualification(obj)
      .then((res) => {
        console.log("signup is runnign");
        console.log("res: ", res);
        if (res.status === 201) {
          router.push("/login");
          console.log("success");
          toast({
            title: "Registration Successful",
            description: "Teacher Registed",
          });
        } else if (res.status === 400) {
          toast({
            title: "Registration Failed",
            description: "Invalid Qualification Request",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // router.push("/login");
  }
  return (
    <div className=" w-screen h-screen grid place-content-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Qualifications</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your Qualifications"
                    className="resize w-[25rem] h-[10rem]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className=" w-[25rem]">
                  You can <span>mention</span> your previous organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" w-[25rem]">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QualificationPage;

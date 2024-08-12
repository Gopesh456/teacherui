"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
const FormSchema = z.object({
  bio: z.string(),
});

const QualificationPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    toast({
      title: "Registration Successful",
      description: "Teacher Registed",
    });
    router.push("/login");
  }
  return (
    <div className="w-screen h-screen grid place-content-center">
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
                <FormLabel className="text-lg">Student Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description about the student"
                    className="resize w-[25rem] h-[10rem]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className=" w-[25rem]">
                  You can <span>AI</span> to generate your response.
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

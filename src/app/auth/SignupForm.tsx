"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LuGithub } from "react-icons/lu";
import { SiGoogle } from "react-icons/si";
import * as z from "zod";
import { SignupSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signup } from "../../actions/signup";

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      signup(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    });
    console.log(values)
  };

  return (
    <Card className="w-full max-w-sm p-4 border dark:border-white border-black">
      <CardTitle className="mb-3 text-xl">
        Sign Up now to Create an Account
      </CardTitle>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="text"
                      placeholder="Enter your Name"
                      className=" dark:border-white border-black border "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="me@example.com"
                      className=" dark:border-white border-black border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="Enter your Password"
                      className=" dark:border-white border-black border "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                <span>Please Wait</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </Button>
          <div className="w-full flex flex-col">
            <Label className="w-full flex mb-3 items-center justify-center font-semibold">
              Or Signup with{" "}
            </Label>
            <div className="w-full grid grid-cols-2 gap-1">
              <Button className="w-full" disabled={isPending}>
                <LuGithub size={20} />
              </Button>
              <Button className="w-full" disabled={isPending}>
                <SiGoogle size={20} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default SignupForm;

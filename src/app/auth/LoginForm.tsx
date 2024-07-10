"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
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
import React from "react";
import { useForm } from "react-hook-form";
import { LuGithub } from "react-icons/lu";
import { SiGoogle } from "react-icons/si";
import * as z from "zod";
import { LoginSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card className="w-full max-w-sm p-4 border dark:border-white border-black">
      <CardTitle className="mb-3 text-xl">Login to your account</CardTitle>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(() => {})}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...form}
                      placeholder="me@example.com"
                      className="text-gray-500 dark:border-white border-black border"
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
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...form}
                      type="password"
                      placeholder="Enter your Password"
                      className="text-gray-500 dark:border-white border-black border "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full">Login</Button>
          <CardFooter className="w-full flex flex-col">
            <Label className="w-full flex mb-3 items-center justify-center font-semibold">Or Login with </Label>
            <div className="w-full grid grid-cols-2 gap-2">
              <Button className="w-full"><LuGithub size={20}/></Button>
              <Button className="w-full"><SiGoogle size={20}/></Button>

            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;

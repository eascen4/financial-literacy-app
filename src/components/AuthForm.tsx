"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT, authSchema } from "@/lib/constants";
import { login, register } from "@/lib/server/actions";

import { useState } from "react";

const AuthForm = ({ type }: { type: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authSchema(type); // signup or login
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      if (type === "signup") {
        const success = await register(values);
        if (success) {
          const {email, password} = values
          await login({email, password})
        }
      } else {
        await login(values);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function useGithub() {
    await signIn("github", {redirect: true, callbackUrl: DEFAULT_LOGIN_REDIRECT});
  }

  return (
    <section className="auth-form">
      <header>
        <Link
          href="/"
          className="flex items-center font-semibold gap-3 text-xl"
        >
          <Image src="/rocket.svg" width={30} height={30} alt="rocket icon" />
          Rocket Finance
        </Link>
      </header>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {
              type === "signup" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>Submit</Button>
          </form>
        </Form>
        <Button onClick={useGithub} disabled={isLoading}>
          <Image src="/github_icon.svg" width={20} height={20} alt="github icon" className="mr-2"/>
          {type === "signup" ? "Signup with Github" : "Login with Github"}
        </Button>
      </section>

      <footer>
        <p>
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <Link href={type === "signup" ? "/login" : "/signup"}>
          {type === "signup" ? "Login" : "Signup"}
        </Link>
      </footer>
    </section>
  );
};
export default AuthForm;

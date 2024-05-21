"use client";

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

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

const emailSchema = z.object({
  email: z.string().email().min(5).max(50),
});

const AuthForm = ({ type }: { type: string }) => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    const { email } = values
    await signIn("resend", { email })
  }

  async function useGithub() {
    await signIn("github")
  }

  async function useGoogle() {
    await signIn("google")
  }

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="py-24 px-12 bg-indigo-900/80 rounded-lg flex flex-col justify-center items-center">
        <Link
          href="/"
          className="flex items-center font-semibold gap-3 text-xl md:text-3xl p-2 mb-2"
        >
          <Image src="/rocket.svg" width={40} height={40} alt="rocket icon" />
          Rocket Finance
        </Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="text-black" placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {type === "signup" ? "Sign up" : "Login"}
            </Button>
          </form>
        </Form>
        <div className="flex flex-wrap gap-2 mt-6">
          <Button onClick={useGithub} variant="secondary" className="flex-1 gap-2">
            <Image
              src="/github_icon.svg"
              width={20}
              height={20}
              alt="github icon"
            />
            {type === "signup" ? "Sign up with Github" : "Login with Github"}
          </Button>
          <Button onClick={useGoogle} variant="secondary" className="flex-1 gap-2">
            <Image src="/rocket.svg" width={20} height={20} alt="rocket icon" />
            {type === "signup" ? "Sign up with Google" : "Login with Google"}
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <p>
          {type === "signup"
            ? "Already have an Account?"
            : "Don't have an account?"}
        </p>
        <Link href={type === "signup" ? "/login" : "/signup"} className="text-blue-400 hover:underline">
          {type === "signup" ? "Login" : "Sign up"}
        </Link>
      </div>
    </section>
  );
};
export default AuthForm;

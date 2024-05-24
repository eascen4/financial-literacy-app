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
import { challengeOptionSchema } from "@/lib/constants";
import { createChallengeOption } from "@/lib/server/actions";
import { Switch } from "./ui/switch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";

const ChallengeOptionForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof challengeOptionSchema>>({
    resolver: zodResolver(challengeOptionSchema),
    defaultValues: {
      challengeId: 0,
      text: "",
      correct: false,
    },
  });

  async function onSubmit(values: z.infer<typeof challengeOptionSchema>) {
    startTransition(async () => {
      const response = await createChallengeOption(values);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <h2>Challenge Option Form</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Untitled Text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="challengeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenge ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="text-black"
                    placeholder="Ex: 2"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correct?</FormLabel>
                <FormControl>
                  <Switch 
                  className="block"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Create Challenge option
          </Button>
        </form>
      </Form>
    </>
  );
};
export default ChallengeOptionForm;

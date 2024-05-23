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
import { challengeSchema } from "@/lib/constants";
import { createChallenge } from "@/lib/server/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ChallengeForm = () => {
  const form = useForm<z.infer<typeof challengeSchema>>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      question: "",
      lessonId: 0,
      order: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof challengeSchema>) {
    const success = await createChallenge(values);
    if (success) console.log("Challenge created successfully");
    if (!success) console.log("Failed to create challenge");
  }

  return (
    <>
      <h2>Challenge Form</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Untitled Question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lessonId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson ID</FormLabel>
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
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
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
          <Button type="submit">Create Lesson</Button>
        </form>
      </Form>
    </>
  );
};
export default ChallengeForm;

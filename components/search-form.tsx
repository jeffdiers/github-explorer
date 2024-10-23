"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  githubSearch: z.string().min(1, {
    message: "Please enter a GitHub username or organization.",
  }),
});

export function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubSearch: searchParams.get("query")?.toString() || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.delete("sort");
    params.delete("order");
    if (values.githubSearch) {
      params.set("query", values.githubSearch);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2 mr-8 mb-4"
      >
        <FormField
          control={form.control}
          name="githubSearch"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Search for a GitHub username or organization."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}

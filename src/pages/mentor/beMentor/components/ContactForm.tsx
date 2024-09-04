import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SocialMediaSchema } from "@/schemas/mentorSchema";

export function ContactForm({
  onNext,
  onPrevious,
  data,
}: {
  onNext: (data: z.infer<typeof SocialMediaSchema>) => void;
  onPrevious: () => void;
  data: z.infer<typeof SocialMediaSchema>;
}) {
  const form = useForm<z.infer<typeof SocialMediaSchema>>({
    resolver: zodResolver(SocialMediaSchema),
    defaultValues: data,
  });
  const { isSubmitting } = form.formState;

  function handleSubmit(formData: z.infer<typeof SocialMediaSchema>) {
    onNext(formData);
  }
  return (
    <Form {...form}>
      <form className={` min-w-full flex flex-col justify-between h-full`} onSubmit={form.handleSubmit(handleSubmit)}>
        <div className=" flex flex-col gap-4 grow">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. www.facebook.com/Coursanity"
                    type="text"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. LinkedIn.com/Coursanity"
                    type="text"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Github.com/learnovate"
                    type="string"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-center gap-4 mt-8">
          <Button
            variant={"ghost"}
            className="min-w-24 text-royal-blue hover:text-royal-blue/80"
            type="reset"
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button className="min-w-24" type="submit">
            Send Application
          </Button>
        </div>
      </form>
    </Form>
  );
}

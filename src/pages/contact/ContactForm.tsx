import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  className?: string;
};
const contactSchema = z.object({
  name: z.string().min(1, "name can not be empty"),
  email: z.string().email("invalid email address"),
  message: z.string().min(1, "message can not be empty"),
});

export function ContactForm({ className = "" }: ContactFormProps) {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const handleFormSubmit = (values: z.infer<typeof contactSchema>) => {
    form.reset();
    toast.success(`Thank you, ${values.name}.\nMessage was sent successfully`);
  };
  return (
    <div className={twMerge("", className)}>
      <Form {...form}>
        <form action="" className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col lg:flex-row gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="font-[500]">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
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
              name="email"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel className="font-[500]">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel className="font-[500]">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="write your message here..."
                    className="rounded-lg border-[0.1rem] min-h-36 grow border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" sm:max-w-56">
            Accept
          </Button>
        </form>
      </Form>
    </div>
  );
}

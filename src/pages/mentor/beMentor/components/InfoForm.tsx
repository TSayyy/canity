import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "@/components/ui/DatePicker";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BasicInfoFormSchema } from "@/schemas/mentorSchema";

export function InfoForm({
  onNext,
  data,
}: {
  onNext: (data: z.infer<typeof BasicInfoFormSchema>) => void;
  data: z.infer<typeof BasicInfoFormSchema>;
}) {
  const form = useForm<z.infer<typeof BasicInfoFormSchema>>({
    resolver: zodResolver(BasicInfoFormSchema),
    defaultValues: { ...data, dob: undefined },
  });
  const { isSubmitting } = form.formState;

  async function handleSubmit(formData: z.infer<typeof BasicInfoFormSchema>) {
    onNext(formData);
  }
  return (
    <Form {...form}>
      <form className={` min-w-full flex flex-col justify-between h-full`} onSubmit={form.handleSubmit(handleSubmit)}>
        <div className=" grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" flex gap-6  flex-col items-start md:items-center md:flex-row">
                    <ImageUploader {...field} />
                    <ul className="text-sm list-disc">
                      <li>Facial features must be visible.</li>
                      <li> The image must have a white background.</li>
                      <li>
                        The image file must be <span className="text-royal-blue"> .jpg </span>,
                        <span className="text-royal-blue"> .jpeg </span>, or
                        <span className="text-royal-blue"> .png </span>.
                      </li>
                    </ul>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. John Doe"
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. JohnDoe@gmail.com"
                    type="email"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. +20**********"
                    type="number"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <DatePicker {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Egypt"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Cairo"
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
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const value = e.target.value;
                      const values = value.split(",");

                      field.onChange(values);
                    }}
                    placeholder="e.g. English, Arabic, etc."
                    type="text"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end items-center gap-4 mt-8">
          <Button className="min-w-24" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

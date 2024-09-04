import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PdfUploader } from "@/components/ui/PdfUploader";
import Selector from "@/components/ui/Selector";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTracks } from "@/hooks/useTracks";
import { ProSectionSchema } from "@/schemas/mentorSchema";

export function EducationForm({
  onNext,
  onPrevious,
  data,
}: {
  data: z.infer<typeof ProSectionSchema>;
  onNext: (data: z.infer<typeof ProSectionSchema>) => void;
  onPrevious: () => void;
}) {
  const form = useForm<z.infer<typeof ProSectionSchema>>({
    resolver: zodResolver(ProSectionSchema),
    defaultValues: data,
  });
  const { isSubmitting } = form.formState;

  function handleSubmit(formData: z.infer<typeof ProSectionSchema>) {
    onNext(formData);
  }
  const tracks = useTracks();
  return (
    <Form {...form}>
      <form className={` min-w-full flex flex-col justify-between h-full`} onSubmit={form.handleSubmit(handleSubmit)}>
        <div className=" grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. I am a web developer with 5 years of experience..."
                    className="rounded-lg resize-none border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Education</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Bachelor's degree in Computer Science from X University."
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
            name="workExp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Worked at ABC Tech as a Senior Frontend Developer"
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
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience in years</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 5 years"
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. Web Developer"
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
            name="trackName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track</FormLabel>
                <FormControl>
                  <Selector
                    options={tracks.map((track) => track.name)}
                    onChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select a track"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricePerHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per hour</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 10$"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV/Resume</FormLabel>
                <FormControl>
                  <PdfUploader {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

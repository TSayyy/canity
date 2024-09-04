import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUploader } from "@/components/ui/ImageUploader";
import Selector from "@/components/ui/Selector";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTracks } from "@/hooks/useTracks";
import { basicCourseInfoSchema } from "@/schemas/courseSchema";

import { KeyWordsForm } from "./Keywords";

type CourseInfoFormProps = {
  data: z.infer<typeof basicCourseInfoSchema> | undefined;
  handleCourseInfo: (data: z.infer<typeof basicCourseInfoSchema>) => void;
};
export function CourseInfoForm({ data, handleCourseInfo }: CourseInfoFormProps) {
  const addCourseForm = useForm<z.infer<typeof basicCourseInfoSchema>>({
    resolver: zodResolver(basicCourseInfoSchema),
    defaultValues: data?.keywords ? data : { ...data, keywords: [] },
  });
  const { isSubmitting } = addCourseForm.formState;
  const tracks = useTracks();
  return (
    <Form {...addCourseForm}>
      <form
        onSubmit={addCourseForm.handleSubmit(handleCourseInfo, (errors) => {
          console.log(errors, addCourseForm.getValues());
        })}
        className="h-full"
      >
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-1">
          <FormField
            control={addCourseForm.control}
            name="image"
            render={({ field }) => (
              <FormItem className=" md:row-span-2">
                <FormControl>
                  <ImageUploader className="w-full h-36  rounded-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addCourseForm.control}
            name="title"
            render={({ field }) => (
              <FormItem className=" col-span-1 lg:col-span-2">
                <FormLabel>Course Title</FormLabel>
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
            control={addCourseForm.control}
            name="trackName"
            render={({ field }) => (
              <FormItem className=" col-span-1">
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
            control={addCourseForm.control}
            name="cLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Selector
                    options={["Beginner", "Intermediate", "Advanced"]}
                    onChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select a level"
                    className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addCourseForm.control}
            name="noChapters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number Of chapters</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 10"
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
            control={addCourseForm.control}
            name="estimatedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated time</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g.10 hours"
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
            control={addCourseForm.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 10"
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
            control={addCourseForm.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <KeyWordsForm
                    keywords={field.value}
                    onAddition={(keyword) => {
                      field.onChange([...field.value, keyword]);
                    }}
                    onDeletion={(keyword) => {
                      field.onChange(field.value.filter((kw) => kw !== keyword));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={addCourseForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. this course introduce you to..."
                    className="rounded-lg resize-none border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <footer className="flex justify-end gap-2 mt-5">
          <Button type="submit" className="px-10" disabled={isSubmitting}>
            Next
          </Button>
        </footer>
      </form>
    </Form>
  );
}

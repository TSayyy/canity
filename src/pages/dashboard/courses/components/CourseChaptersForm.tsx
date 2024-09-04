import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { courseChaptersSchema } from "@/schemas/courseSchema";

type CourseChaptersFormProps = {
  noChapters: number;
  handleCourseChapters: (data: z.infer<typeof courseChaptersSchema>) => void;
  onPrev: () => void;
};
export function CourseChaptersForm({ noChapters, handleCourseChapters, onPrev }: CourseChaptersFormProps) {
  const courseChapterForm = useForm<z.infer<typeof courseChaptersSchema>>({
    resolver: zodResolver(courseChaptersSchema),
    defaultValues: {
      chapters: Array.from({ length: noChapters }).map(() => ({ chapterName: "", chapterLink: "" })),
    },
  });
  const { isSubmitting } = courseChapterForm.formState;
  return (
    <Form {...courseChapterForm}>
      <form onSubmit={courseChapterForm.handleSubmit(handleCourseChapters)} className="h-full space-y-3">
        <Accordion type="single" collapsible>
          {Array.from({ length: noChapters }).map((_, index) => (
            <AccordionItem value={`Chapter ${index + 1}`} key={index} className="hover:no-underline ">
              <AccordionTrigger className=" text-xl text-left gap-4 font-semibold hover:no-underline [&[data-state=open]]:text-royal-blue">
                Chapter {index + 1}
              </AccordionTrigger>
              <AccordionContent className="text-balance space-y-3 text-base px-2">
                <FormField
                  key={index}
                  control={courseChapterForm.control}
                  name={`chapters.${index}.chapterName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="e.g. Introduction to React"
                          type="text"
                          className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={courseChapterForm.control}
                  name={`chapters.${index}.chapterLink`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="e.g. https://www.youtube.com/"
                          type="text"
                          className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <footer className="flex justify-end gap-2 mt-5">
          <Button
            type="reset"
            onClick={onPrev}
            variant={"ghost"}
            className="px-10 text-royal-blue hover:text-royal-blue focus:text-royal-blue"
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button type="submit" className="px-10" disabled={isSubmitting}>
            Next
          </Button>
        </footer>
      </form>
    </Form>
  );
}

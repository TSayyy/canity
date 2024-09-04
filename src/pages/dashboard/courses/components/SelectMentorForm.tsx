import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { selectMentorFormSchema } from "@/schemas/mentorSchema";

type SelectMentorFormProps = {
  mentorId: string | undefined;
  handleSubmit: (data: z.infer<typeof selectMentorFormSchema>) => void;
  onPrev: () => void;
};

export default function SelectMentorForm({ mentorId, handleSubmit, onPrev }: SelectMentorFormProps) {
  const selectMentorForm = useForm<z.infer<typeof selectMentorFormSchema>>({
    resolver: zodResolver(selectMentorFormSchema),
    defaultValues: mentorId ? { mentorId } : {},
  });
  const { isSubmitting } = selectMentorForm.formState;
  return (
    <Form {...selectMentorForm}>
      <form
        onSubmit={selectMentorForm.handleSubmit(handleSubmit, (errors) => {
          console.log(errors, selectMentorForm.getValues());
        })}
        className="h-full"
      >
        <FormField
          control={selectMentorForm.control}
          name="mentorId"
          render={({ field }) => (
            <FormItem className=" ">
              <FormLabel>Course Mentor</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="Enter Mentor ID"
                  type="text"
                  className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            Submit
          </Button>
        </footer>
      </form>
    </Form>
  );
}

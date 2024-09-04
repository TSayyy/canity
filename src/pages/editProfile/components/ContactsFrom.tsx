import { Control, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TMentorEditProfileForm } from "../MentorEditProfile";
import { TStudentEditProfileForm } from "../StudentEditProfile";

type ContactsFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<TMentorEditProfileForm, any, undefined> | UseFormReturn<TStudentEditProfileForm, any, undefined>;
  formType: TMentorEditProfileForm | TStudentEditProfileForm;
};

export const ContactsForm = ({ form, formType }: ContactsFormProps) => {
  const { isSubmitting } = form.formState;

  return (
    <div className={` min-w-full flex flex-col justify-between h-full`}>
      <div className=" flex flex-col gap-4 grow">
        <FormField
          control={form.control as Control<typeof formType>}
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
          control={form.control as Control<typeof formType>}
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
          control={form.control as Control<typeof formType>}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="e.g. Github.com/Coursanity"
                  type="string"
                  className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

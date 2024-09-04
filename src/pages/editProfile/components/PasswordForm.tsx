import { Control, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TMentorEditProfileForm } from "../MentorEditProfile";
import { TStudentEditProfileForm } from "../StudentEditProfile";

type PasswordFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<TMentorEditProfileForm, any, undefined> | UseFormReturn<TStudentEditProfileForm, any, undefined>;
  formType: TMentorEditProfileForm | TStudentEditProfileForm;
};

export const PasswordForm = ({ form, formType }: PasswordFormProps) => {
  const { isSubmitting } = form.formState;
  return (
    <div className={` min-w-full flex flex-col justify-between h-full`}>
      <div className=" grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control as Control<typeof formType>}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className=" md:col-span-2">
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  placeholder="*************"
                  type="password"
                  className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<typeof formType>}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  type="password"
                  className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<typeof formType>}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isSubmitting}
                  type="password"
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authErrorSchema } from "@/schemas/authError";
import { forgotPasswordSchema } from "@/schemas/forgotPassword";

export function ForgotPassword() {
  useTitle("Coursanity | Forgot Password");
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>([]);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { isSubmitting } = form.formState;
  const forgetMutation = usePostData("/auth/forgot-password");

  const handleFormSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setError(undefined);
    const state = await forgetMutation.mutateAsync(values);
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    toast.success("reset password code sent to your email address!", { duration: 3500 });
    localStorage.setItem("reset-email", values.email);
    navigate("/auth/verification");
    form.reset();
  };

  return (
    <AuthLayout title="Forget Password?" subTitle="Enter your email address to receive security code.">
      <div className="my-6 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="space-y-4">
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
                        placeholder="john.doe@example.com"
                        type="email"
                        className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FromError messages={error} />}
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? "Loading..." : "Send"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}

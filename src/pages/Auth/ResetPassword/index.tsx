import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePatchData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { setUser } from "@/redux/slices/authSlice";
import { authErrorSchema } from "@/schemas/authError";
import { loginResponseSchema } from "@/schemas/login";
import { resetPasswordSchema } from "@/schemas/resetPassword";
import { userSchema } from "@/schemas/userSchema";
import { encrypt } from "@/utils/crypto";

export function ResetPassword() {
  const [resetEmail] = useState(localStorage.getItem("reset-email"));
  useTitle("Coursanity | Reset Password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>(undefined);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { isSubmitting } = form.formState;
  const resetPasswordMutation = usePatchData("/auth/reset-password");

  const handleFormSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setError(undefined);
    const email = resetEmail;
    const state = await resetPasswordMutation.mutateAsync({ ...values, email });
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    const response = loginResponseSchema.safeParse(state.data);
    if (response.success) {
      const { accessToken, data } = response.data;
      const userParse = userSchema.safeParse({ ...data, authStatus: true });
      if (userParse.success) {
        const encryptedToken = encrypt(accessToken, import.meta.env.VITE_TOKEN_SECRET);
        localStorage.setItem("token", encryptedToken);
        dispatch(setUser(userParse.data));
        toast.success("password reset successful!, welcome back!", { duration: 3000 });
        localStorage.removeItem("reset-email");
        form.reset();
        navigate("/");
        return;
      }
    }
    setError(["something went wrong!"]);
  };

  if (!resetEmail) {
    return <Navigate to="/auth/forgot-password" />;
  }

  return (
    <AuthLayout title="Forget Password?" subTitle="Enter your email address to receive security code.">
      <div className="my-6 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. ●●●●●●●●"
                        type="password"
                        className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="repeat your password"
                        type="password"
                        className="rounded-lg border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FromError messages={error} />}
              <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? "Loading..." : "Reset password"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}

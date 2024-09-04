import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { FromError } from "@/components/FormError";
import { FromSuccess } from "@/components/FormSuccess";
import { OrSeparator } from "@/components/ui/OrSeparator";
import { SocialButton } from "@/components/ui/SocialButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { setUser } from "@/redux/slices/authSlice";
import { authErrorSchema } from "@/schemas/authError";
import { loginResponseSchema, loginSchema } from "@/schemas/login";
import { userSchema } from "@/schemas/userSchema";
import { encrypt } from "@/utils/crypto";

import { GoogleTempModal } from "../GoogleTempModal";

export function LoginPage() {
  useTitle("Coursanity | Login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { isSubmitting } = form.formState;
  const login = usePostData<z.infer<typeof loginSchema>>("/auth/login");

  const handleFormSubmit = async (values: z.infer<typeof loginSchema>) => {
    // reset error and success
    setError(undefined);
    setSuccess(undefined);

    // extract email and password from values
    const { email, password } = values;

    // send request
    const state = await login.mutateAsync({ email, password });

    // handle response errors
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      return;
    }

    // handle response success, parse it and store token in local storage
    const response = loginResponseSchema.safeParse(state.data);
    if (response.success) {
      const { accessToken, data } = response.data;
      const userParse = userSchema.safeParse({ ...data, authStatus: true });
      if (userParse.success) {
        const user = JSON.stringify(userParse.data);
        const encryptedUser = encrypt(user, import.meta.env.VITE_TOKEN_SECRET);
        const encryptedToken = encrypt(accessToken, import.meta.env.VITE_TOKEN_SECRET);
        localStorage.setItem("token", encryptedToken);
        localStorage.setItem("user", encryptedUser);
        dispatch(setUser(userParse.data));
        setSuccess("Login successful!");
        form.reset();
        navigate("/");
        return;
      }
    }
    setError(["something went wrong!"]);
  };

  return (
    <AuthLayout title="Welcome Back" subTitle="Welcome back! Please enter your details.">
      <GoogleTempModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="my-6 space-y-4">
        <SocialButton
          text="Continue With Google"
          setIsModalOpen={setIsModalOpen}
          setError={setError}
          disabled={isSubmitting}
        />
        <OrSeparator />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
              <div className="flex justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="font-medium text-royal-blue text-sm hover:underline underline-offset-2"
                >
                  Forgot Password?
                </Link>
              </div>
              {error && <FromError messages={error} />}
              {success && <FromSuccess message={success} />}
              <div className="pt-0">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="text-balance text-center text-sm text-zinc-400">
          <span>Don't have an account?</span>{" "}
          <Link to="/auth/register" className="font-medium text-royal-blue text-sm hover:underline underline-offset-2">
            Register
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
import { authErrorSchema } from "@/schemas/authError";
import { registerSchema } from "@/schemas/register";

import { GoogleTempModal } from "../GoogleTempModal";

export function RegisterPage() {
  useTitle("Coursanity | Register");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string[] | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });
  const { isSubmitting } = form.formState;
  const registerReq = usePostData("/auth/signup");

  const handleFormSubmit = async (values: z.infer<typeof registerSchema>) => {
    // reset error and success
    setError(undefined);
    setSuccess(undefined);

    // extract values from form
    const { fullName: name, email, password } = values;
    // send request to server
    const state = await registerReq.mutateAsync({
      name,
      email,
      password,
      confirmPassword: password,
      role: "student",
    });

    // handle response
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
    } else {
      toast.success(state.data.message, { duration: 3000 });
      setSuccess("register successful!");
      navigate("/");
      form.reset();
    }
  };

  return (
    <AuthLayout title="Sign Up" subTitle="Create your account to get started.">
      <GoogleTempModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="my-6 space-y-3">
        <SocialButton
          text="Create With Google"
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="John Doe"
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
              <div className="text-sm text-pretty">
                <span>By continuing, you agree to Coursanity's</span>{" "}
                <Link to="/" className="underline-offset-4 hover:underline text-royal-blue">
                  Terms of Service
                </Link>{" "}
                <span>and acknowledge</span>{" "}
                <Link to="/" className="underline-offset-4 hover:underline text-royal-blue">
                  Privacy Policy
                </Link>{" "}
              </div>
              {error && <FromError messages={error} />}
              {success && <FromSuccess message={success} />}
              <div className="pt-0">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Loading..." : "Create an account"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className="text-balance text-center text-sm text-zinc-400">
          <span>Already have an account?</span>{" "}
          <Link to="/auth/login" className="font-medium underline-offset-4 hover:underline text-royal-blue">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

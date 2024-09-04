import { useState } from "react";
import { toast } from "react-hot-toast";
import OtpInput from "react-otp-input";
import { Navigate, useNavigate } from "react-router-dom";

import { FromError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { usePostData } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";
import { AuthLayout } from "@/layouts/AuthLayout";
import { authErrorSchema } from "@/schemas/authError";

export function VerificationPage() {
  const resetEmail = localStorage.getItem("reset-email");
  useTitle("Coursanity | Verification");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string[] | undefined>(undefined);
  const resetMutation = usePostData("/auth/forgot-password");
  const verificationMutation = usePostData("/auth/verify/password-reset-code");

  const handleResend = async () => {
    setError(undefined);
    if (!resetEmail) {
      toast.error("Something went wrong!");
      return;
    }
    setSending(true);
    const loadingToast = toast.loading(`sending reset code ...`);
    const state = await resetMutation.mutateAsync({ email: resetEmail });
    if (state.status === "failed") {
      toast.dismiss(loadingToast);
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        toast.error(errorMsg.join(", "));
      } else setError(["Something went wrong!"]);
      setSending(false);
      return;
    }

    toast.dismiss(loadingToast);
    toast.success("reset code sent to your email address!", { duration: 3000 });
    setSending(false);
  };

  const handleVerify = async () => {
    if (otp.length === 0) {
      setError(["verification code is required!"]);
      return;
    } else if (otp.length !== 6) {
      setError(["invalid code!"]);
      return;
    }
    setError(undefined);
    setLoading(true);
    const state = await verificationMutation.mutateAsync({ resetCode: otp });
    if (state.status === "failed") {
      const errors = authErrorSchema.safeParse(state.data.errors);
      if (errors.success === true) {
        const errorMsg = errors.data.map((error) => error.msg.toLocaleLowerCase());
        setError(errorMsg);
      } else setError(["Something went wrong!"]);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("verification successful!", { duration: 3000 });
    setOtp("");
    navigate("/auth/reset-password");
  };

  if (!resetEmail) {
    return <Navigate to="/auth/forgot-password" />;
  }

  return (
    <AuthLayout title="Verification" subTitle="Please enter the code we sent to your email address">
      <div className="my-6 space-y-5">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          placeholder="------"
          containerStyle={"flex justify-between gap-2.5 xs:gap-4 sm:gap-2 md:gap-4"}
          inputStyle={
            "bg-white border border-royal-blue p-2 text-dark-navy !w-[calc(100%/6)] text-2xl xxs:text-4xl rounded-md"
          }
        />
        <div className="">
          <p className="text-zinc-400">
            <span>{"Didn’t get a code?"}</span>{" "}
            <button
              className="font-medium text-royal-blue hover:underline underline-offset-2"
              onClick={handleResend}
              disabled={sending}
            >
              Resend
            </button>
          </p>
        </div>
        {error && <FromError messages={error} />}
        <Button className="w-full" type="button" onClick={handleVerify} disabled={loading}>
          {loading ? "Loading..." : "Verify"}
        </Button>
      </div>
    </AuthLayout>
  );
}

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { globalResponseFormat, postRequest } from "@/hooks/useApi";

type TSocialButtonProps = {
  text: string;
  setIsModalOpen: (value: boolean) => void;
  setError: (value: string[]) => void;
  disabled?: boolean;
};

export function SocialButton({ text, setIsModalOpen, setError, disabled }: TSocialButtonProps) {
  const googleAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const { code: token } = codeResponse;
      const data = await postRequest("/auth/continue-with-google", { token });
      const response = globalResponseFormat(data);

      if (response.status === "failed") {
        // setError(["Something went wrong!"]);
        console.log({ errorData: response.data });
        setIsModalOpen(true);
        return;
      }

      console.log(response.data);
    },
    onError: (error) => {
      console.log(error);
      setError(["Something went wrong!"]);
    },
  });

  return (
    <Button
      type="button"
      onClick={googleAuth}
      variant="outline"
      size="lg"
      disabled={disabled}
      className="w-full space-x-2 bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
    >
      <FcGoogle className="text-2xl" />
      <span>{text}</span>
    </Button>
  );
}

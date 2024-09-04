import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import verifyError from "@/assets/auth/verifyError.webp";
import verifyLoading from "@/assets/auth/verifyLoading.webp";
import verifySuccess from "@/assets/auth/verifySuccess.webp";
import { api, globalResponseFormat } from "@/hooks/useApi";
import { useTitle } from "@/hooks/useTitle";

export function Loader() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6 bg-white rounded-full animate-bounce"></div>
    </div>
  );
}

export function EmailVerificationPage() {
  useTitle("Coursanity | Email Verification");
  const { code } = useParams();
  const navigate = useNavigate();
  const [isLoadingDelay, setIsLoadingDelay] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: [`/auth/verify/email/${code}`],
    queryFn: async () => {
      try {
        const res = await api().post(`/auth/verify/email/${code}`);
        return globalResponseFormat(res);
      } catch (error) {
        return globalResponseFormat(error);
      }
    },
  });

  useEffect(() => {
    if (isLoadingDelay) {
      const delay = 2000;
      const delayTimeout = setTimeout(() => {
        setIsLoadingDelay(false);
      }, delay);

      return () => clearTimeout(delayTimeout);
    }
  }, [isLoading, isLoadingDelay]);

  useEffect(() => {
    if (data?.status === "success" && !isLoadingDelay) {
      const redirectDelay = 3000;
      const delayTimeout = setTimeout(() => {
        navigate("/auth/login");
      }, redirectDelay);

      return () => clearTimeout(delayTimeout);
    }
  }, [data, navigate, isLoadingDelay]);

  return (
    <main className="w-full h-screen bg-dark-navy flex justify-center items-center text-white text-center">
      <div className="container">
        {(isLoading || isLoadingDelay) && (
          <div>
            <img src={verifyLoading} alt="loading" className="w-80  mx-auto" />
            <h2 className="text-xl font-bold">Verifying Your Email</h2>
            <p className="mb-4">please wait, this may take a while</p>
            <Loader />
          </div>
        )}

        {data?.status === "success" && !isLoadingDelay && (
          <div>
            <img src={verifySuccess} alt="loading" className="w-80  mx-auto" />
            <h2 className="text-xl font-bold mb-1">Your email has been verified successfully</h2>
            <p className="mb-4">please wait while we redirect you</p>
            <Loader />
          </div>
        )}

        {data?.status === "failed" && !isLoadingDelay && (
          <div className="flex justify-center items-center flex-col">
            <img src={verifyError} alt="loading" className="w-80  mx-auto" />
            <h2 className="text-xl font-bold w-fit">Email Verification Failed</h2>
            <p>check your email and try again</p>
            <Link to="/" className="bg-royal-blue px-4 py-2 mt-2.5 rounded-md font-medium">
              Go Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

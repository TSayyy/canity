import "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import { decrypt } from "@/utils/crypto";

export const api = () => {
  const token = localStorage.getItem("token");
  const decryptedToken = token ? decrypt(token, import.meta.env.VITE_TOKEN_SECRET) : "";

  const instance: AxiosInstance = axios.create({
    baseURL: "https://coursanity.onrender.com",

    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${decryptedToken}`,
    },
  });
  return instance;
};

type TStatus = "success" | "failed";

export const globalResponseFormat = (res: unknown) => {
  let resStatus: TStatus;

  if (res instanceof AxiosError) {
    resStatus = "failed";
    return {
      status: resStatus,
      code: res.response?.status,
      data: res.response?.data,
    };
  }

  if (res instanceof Error) {
    resStatus = "failed";
    return {
      status: resStatus,
      code: 500,
      data: res.message,
    };
  }

  const { status, data } = res as AxiosResponse;
  resStatus = "success";
  return {
    status: resStatus,
    code: status,
    data,
  };
};

// GET request
export async function getRequest(endpoint: string) {
  try {
    const response = await api().get(endpoint);
    return response;
  } catch (error) {
    return error;
  }
}
export function useGetData(endpoint: string) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await getRequest(endpoint);
      return globalResponseFormat(res);
    },
  });
}

// POST request
export async function postRequest<T>(endpoint: string, data: T) {
  try {
    const response = await api().post(endpoint, data);
    return response;
  } catch (error) {
    return error;
  }
}
export function usePostData<T>(endpoint: string) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async (data: T) => {
      const res = await postRequest(endpoint, data);
      const formattedResponse = globalResponseFormat(res);
      if (formattedResponse.code === 401) navigate("/auth/login");
      return formattedResponse;
    },
  });
  return mutation;
}

// PATCH request
export async function patchRequest<T>(endpoint: string, data: T, configs?: AxiosRequestConfig<T>) {
  try {
    const response = await api().patch(endpoint, data, configs);
    return response;
  } catch (error) {
    return error;
  }
}
export function usePatchData<T>(endpoint: string, configs?: AxiosRequestConfig<T>) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async (data: T) => {
      const res = await patchRequest(endpoint, data, configs);
      const formattedResponse = globalResponseFormat(res);
      if (formattedResponse.code === 401) navigate("/auth/login");

      return formattedResponse;
    },
  });
  return mutation;
}

// DELETE request
export async function deleteRequest(endpoint: string) {
  try {
    const response = await api().delete(endpoint);
    return response;
  } catch (error) {
    return error;
  }
}
export function useDeleteData(endpoint: string) {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: [endpoint],
    mutationFn: async () => {
      const res = await deleteRequest(endpoint);
      const formattedResponse = globalResponseFormat(res);
      if (formattedResponse.code === 401) navigate("/auth/login");
      return formattedResponse;
    },
  });
  return mutation;
}

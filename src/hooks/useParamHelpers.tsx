import { useLocation, useSearchParams } from "react-router-dom";

export const useGetParam = (param: string) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
};

export const useSetParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return ({ param, value }: { param: string; value: string }) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };
};

export const useSetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: Record<string, string>) => {
    Object.entries(params).forEach(([param, value]) => {
      searchParams.set(param, value);
    });
    setSearchParams(searchParams);
  };
};

export const useClearParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (param: string) => {
    searchParams.delete(param);
    setSearchParams(searchParams);
  };
};

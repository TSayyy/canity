import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Coursanity";
    };
  }, [title]);
};

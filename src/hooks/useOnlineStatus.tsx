import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const status = typeof window !== "undefined" ? window.navigator.onLine : true;
  const [online, setOnline] = useState(status);

  useEffect(() => {
    function handleStatusChange() {
      setOnline(navigator.onLine);
    }

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [online]);

  return online;
};

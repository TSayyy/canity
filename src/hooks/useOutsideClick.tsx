import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, Propagation = true) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("click", handleClickOutside, Propagation);
    return () => {
      document.removeEventListener("click", handleClickOutside, Propagation);
    };
  }, [ref, handler, Propagation]);

  return ref;
}

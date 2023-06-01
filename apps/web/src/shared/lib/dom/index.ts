import { useEffect } from "react";

export const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const scrollToTop = (): void => {
  document.querySelector("html")?.scrollTo({ top: 0, behavior: "smooth" });
};

import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export const scrollToTop = () => {
  document.querySelector("html")?.scrollTo({ top: 0, behavior: "smooth" });
};

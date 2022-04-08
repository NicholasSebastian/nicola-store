import { useEffect } from "react";

const useScroll = (callback: ScrollCallback) => {
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
    const height = Math.max(
      document.body.scrollHeight, 
      document.body.offsetHeight, 
      document.documentElement.clientHeight, 
      document.documentElement.scrollHeight, 
      document.documentElement.offsetHeight
    );
    callback(scrollPos, height);
  }
}

export default useScroll;

type ScrollCallback = (scrollPos: number, documentHeight: number) => void;
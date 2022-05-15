import { RefObject, useEffect } from "react";

export default function useFullCanvas<T extends HTMLCanvasElement>(el: RefObject<T>, callback?: () => void) {
  const getSize = () => {
    if (el.current) {
      el.current.width = window.innerWidth;
      el.current.height = window.innerHeight;
      callback && callback();
    }
  };

  useEffect(() => {
    getSize();
    window.addEventListener('resize', getSize);
    return () => window.removeEventListener('resize', getSize);
  }, []);
};
// @ts-nocheck
// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
import { useLayoutEffect, useRef, useCallback } from 'react';

export default function useEvent(handler) {
  const handlerRef = useRef<any>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    return handlerRef.current(...args);
  }, []);
}
import { useEffect } from "react";
import { Event, EventSourcePolyfill, EventSourcePolyfillInit, MessageEvent } from "event-source-polyfill";

type ErrorEvent = Event & {
  status: number;
};

type UseSseOptions = {
  eventSourceOptions?: EventSourcePolyfillInit;
  onMessage?: (event: MessageEvent) => void;
  onOpen?: (event: Event) => void;
  onError?: (event: ErrorEvent) => void;
};

const useSse = (url: string, { eventSourceOptions, onMessage, onOpen, onError }: UseSseOptions = {}) => {
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(url, eventSourceOptions);

    eventSource.addEventListener("message", (event) => onMessage?.(event));

    eventSource.addEventListener("open", (event) => onOpen?.(event));

    eventSource.addEventListener("error", (event) => onError?.(event as ErrorEvent));

    return () => {
      eventSource.close();
    };
  }, [url]);
};

export default useSse;

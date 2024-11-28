import { RefObject, useEffect, useRef } from "react";

type KeybindProps = {
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  key: KeyboardEvent["key"];
  onKeyDown?: (event: KeyboardEvent) => void;
  targetRef?: RefObject<HTMLElement>;
};

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export function useKeybind({
  altKey, // optionキー ⌥
  ctrlKey, // controlキー ^
  metaKey, // commandキー ⌘
  shiftKey, // shiftキー ⇧
  key,
  onKeyDown,
  targetRef,
}: KeybindProps) {
  const onKeyDownLatest = useLatest(onKeyDown);

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) => {
      console.log("key, command ", event.key, event.metaKey)
      if (metaKey && !event.metaKey) {
        console.log("return");
      }
      if (altKey && !event.altKey) return;
      if (ctrlKey && !event.ctrlKey) return;
      if (metaKey && !event.metaKey) return;
      if (shiftKey && !event.shiftKey) return;
      if (event.key !== key) return;

      event.preventDefault();
      onKeyDownLatest.current?.(event);
    };

    if (targetRef?.current) {
      const target = targetRef.current;

      target.addEventListener("keydown", eventListener);
      return () => target.removeEventListener("keydown", eventListener);
    } else {
      window.addEventListener("keydown", eventListener);
      return () => window.removeEventListener("keydown", eventListener);
    }
  }, [altKey, ctrlKey, key, metaKey, onKeyDownLatest, shiftKey, targetRef]);
}

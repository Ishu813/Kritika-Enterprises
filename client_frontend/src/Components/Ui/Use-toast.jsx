import { useCallback, useState, useEffect } from "react";

let toastCount = 0;
const listeners = new Set();

function emitChange(toasts) {
  listeners.forEach((listener) => {
    listener(toasts);
  });
}

export function toast({ title, description, duration = 3000 }) {
  const id = ++toastCount;
  const newToast = { id, title, description };

  // Update toasts in all listeners
  emitChange((toasts) => [...toasts, newToast]);

  // Remove toast after duration
  setTimeout(() => {
    emitChange((toasts) => toasts.filter((toast) => toast.id !== id));
  }, duration);
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (toast) => {
      setToasts((currentToasts) => [...currentToasts, toast]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      );
    },
    [setToasts]
  );

  useEffect(() => {
    const listener = (update) => {
      if (typeof update === "function") {
        setToasts((currentToasts) => update(currentToasts));
      } else {
        setToasts(update);
      }
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { toasts, addToast, removeToast };
}
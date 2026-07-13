"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

function isEditableElement(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  );
}

function ThemeKeyboardShortcuts() {
  const { setTheme } = useTheme();

  useEffect(() => {
    function handleKeyDown(event) {
      if (isEditableElement(event.target)) return;

      const key = event.key.toLowerCase();

      if (event.altKey && event.ctrlKey && key === "s") {
        event.preventDefault();
        setTheme("system");
        return;
      }

      if (event.altKey && !event.ctrlKey && key === "n") {
        event.preventDefault();
        setTheme("dark");
        return;
      }

      if (event.altKey && !event.ctrlKey && key === "l") {
        event.preventDefault();
        setTheme("light");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return null;
}

export default ThemeKeyboardShortcuts;

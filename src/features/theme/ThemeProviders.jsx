"use client";

import { ThemeProvider } from "next-themes";
import ThemeKeyboardShortcuts from "@/features/theme/ThemeKeyboardShortcuts";

function ThemeProviders({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <ThemeKeyboardShortcuts />
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviders;

import { ThemeProvider } from "next-themes";

function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviders;

import { ThemeProvider } from "next-themes";

function ThemeProviders({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default ThemeProviders;

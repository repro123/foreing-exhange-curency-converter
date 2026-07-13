import localFont from "next/font/local";
import "./globals.css";
import ThemeProviders from "@/features/theme/ThemeProviders";
import NetworkStatusBanner from "@/features/cache/NetworkStatusBanner";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const myFont = localFont({
  src: "./fonts/jetbrains-mono-variable.ttf",
});

export const metadata = {
  title: "Foreign Exchange Currency Converter",
  description: "Convert currencies in real-time",
  applicationName: "Foreign exchange currency converter",
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${myFont.className} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProviders>
            <TooltipProvider>
              <NetworkStatusBanner />
              <Toaster position="top-center" />
              {children}
            </TooltipProvider>
          </ThemeProviders>
        </SerwistProvider>
      </body>
    </html>
  );
}

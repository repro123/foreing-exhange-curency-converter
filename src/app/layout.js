import localFont from "next/font/local";
import "./globals.css";
import ThemeProviders from "@/features/theme/ThemeProviders";
import NetworkStatusBanner from "@/features/cache/NetworkStatusBanner";
import ServiceWorkerRegistration from "@/features/pwa/ServiceWorkerRegistration";

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
        <ThemeProviders>
          <ServiceWorkerRegistration />
          <NetworkStatusBanner />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}

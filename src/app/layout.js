import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "./fonts/jetbrains-mono-variable.ttf",
});

console.log(myFont);

export const metadata = {
  title: "Foreign Exchange Currency Converter",
  description: "Convert currencies in real-time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${myFont.className} antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

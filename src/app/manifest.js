export default function manifest() {
  return {
    name: "Foreign Exchange Currency Converter",
    short_name: "fx_converter",
    description:
      "A simple and efficient foreign exchange currency converter application.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#cef739",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

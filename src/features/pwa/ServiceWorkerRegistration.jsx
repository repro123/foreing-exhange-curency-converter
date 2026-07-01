"use client";

import { useEffect } from "react";

function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    async function register() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("✅ Service Worker registered:", registration);
      } catch (error) {
        console.error("❌ Service Worker registration failed:", error);
      }
    }

    register();
  }, []);

  return null;
}

export default ServiceWorkerRegistration;

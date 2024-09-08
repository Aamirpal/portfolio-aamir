"use client";

import { useEffect } from "react";

// Extend the window interface
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const GoogleAnalytics = () => {
  useEffect(() => {
    // Function to initialize Google Analytics
    const handleGTag = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-RLGTTVQFMQ"); // Replace with your Google Analytics ID
    };

    // Dynamically load the Google Analytics script
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-RLGTTVQFMQ";
    script.async = true;
    document.head.appendChild(script);

    handleGTag();
  }, []);

  return null; // No UI to render
};

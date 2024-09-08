"use client";

import { useEffect } from "react";

// Extend the window interface to include dataLayer and gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GoogleAnalytics = () => {
  useEffect(() => {
    // Check if gtag is already initialized
    if (!window.gtag) {
      // Initialize gtag function using function expression to avoid issues in strict mode
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      window.gtag = gtag;

      // Dynamically load the Google Analytics script
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-RLGTTVQFMQ";
      script.async = true;
      document.head.appendChild(script);

      // Initialize Google Analytics with the tracking ID
      window.gtag("js", new Date());
      window.gtag("config", "G-RLGTTVQFMQ"); // Replace with your Google Analytics ID
    }
  }, []);

  return null; // This component doesn't render anything visually
};

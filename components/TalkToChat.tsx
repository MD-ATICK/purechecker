"use client";

import { useEffect } from "react";

export default function TawkToChat() {
  useEffect(() => {
    // Check if the script is already loaded to prevent duplicate scripts
    if (typeof window !== "undefined" && !document.getElementById("tawk-to-script")) {
      const script = document.createElement("script");
      script.id = "tawk-to-script";
      script.async = true;
      script.src = "https://embed.tawk.to/6686eb659d7f358570d7265f/default";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }
  }, []);

  return null; // No visual elements, just the script
}

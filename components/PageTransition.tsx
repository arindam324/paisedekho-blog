import { useRouter } from "next/router";
import React, { useState, useEffect, ReactElement } from "react";

const PageTransition: React.FC<{ children: ReactElement }> = ({ children }) => {
  const router = useRouter();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    const handleStart = (url: URL) => {
      setIsPageTransitioning(true);
    };

    const handleComplete = (url: URL) => {
      setIsPageTransitioning(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  return (
    <div
      className={`page-transition ${
        isPageTransitioning ? "in-transition" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;

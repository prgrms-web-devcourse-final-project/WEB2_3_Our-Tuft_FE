"use client";

import { useEffect, useState } from "react";
import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

export default function ResponsiveContainer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <MobileContainer /> : <DesktopContainer />;
}

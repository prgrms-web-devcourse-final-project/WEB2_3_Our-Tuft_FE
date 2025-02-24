"use client";

import { useState, useEffect } from "react";
import DesktopContainer from "../../../../containers/game/drawingquiz/DesktopContainer";
import MobileContainer from "../../../../containers/game/drawingquiz/MobileContainer";

export default function DrawingQuiz() {
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

import { useEffect, useState } from "react";

// Matches the width where the PC layout (fixed sidebars, multi-column
// grids, hover-driven header) stops having room to work - below this the
// desktop pages visually break, so we fall back to the phone UI instead.
export const DESKTOP_BREAKPOINT = 1024;

function computeIsDesktop() {
  return (
    typeof window !== "undefined" &&
    window.innerWidth >= DESKTOP_BREAKPOINT
  );
}

export default function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(computeIsDesktop);

  useEffect(() => {
    const handleResize = () => setIsDesktop(computeIsDesktop());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

export function HorizontalScroller({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const { deltaY, deltaX, ctrlKey } = event;
      if (ctrlKey) return;
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return;

      event.preventDefault();
      container.scrollBy({ left: deltaY, behavior: "smooth" });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
    >
      {children}
    </div>
  );
}

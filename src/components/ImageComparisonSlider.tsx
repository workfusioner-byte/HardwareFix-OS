"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export default function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"; // damaged/unmounted placeholder (messy living room wall/cables)
  const afterImage = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&auto=format&fit=crop&q=80"; // premium mounted TV setup

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("clientX" in e) {
      handleMove(e.clientX);
    } else {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={containerRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        className="relative w-full max-w-4xl h-[450px] rounded-cards overflow-hidden shadow-lg border border-border select-none cursor-ew-resize bg-brand-navy/5"
      >
        {/* After Image (Base) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterImage}
            alt="After Repair"
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute bottom-4 right-4 bg-brand-blue/95 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-extrabold uppercase rounded-buttons tracking-wider shadow-sm">
            After Fix
          </div>
        </div>

        {/* Before Image (Overlay clipped by sliderPosition) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before Repair"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{ width: containerRef.current?.offsetWidth || "100%", height: "100%" }}
          />
          <div className="absolute bottom-4 left-4 bg-brand-navy/95 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-extrabold uppercase rounded-buttons tracking-wider shadow-sm">
            Before Fix
          </div>
        </div>

        {/* Slider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white hover:bg-brand-sky shadow-[0_0_8px_rgba(0,0,0,0.4)] cursor-ew-resize transition-all duration-75"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Badge */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-brand-blue hover:bg-brand-sky text-white border-2 border-white flex items-center justify-center shadow-lg transition-transform duration-100 hover:scale-105 active:scale-95">
            <MoveHorizontal className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray flex items-center gap-1.5">
        ← Drag the handle to compare standard installations →
      </span>
    </div>
  );
}

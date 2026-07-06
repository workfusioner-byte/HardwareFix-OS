"use client";

import React, { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { MapPin, Navigation, Compass, ShieldAlert, Award } from "lucide-react";

// Predefined route node path coordinates (x, y percentages in SVG space)
const ROUTE_POINTS = [
  { x: 15, y: 85, label: "Technician Hub (Madhapur)" },
  { x: 30, y: 80, label: "Mindspace Underpass" },
  { x: 42, y: 62, label: "Hitech City Metro Pillar" },
  { x: 55, y: 52, label: "Jubilee Hills Checkpost Road" },
  { x: 68, y: 45, label: "Inorbit Mall Intersection" },
  { x: 80, y: 25, label: "Customer Address (Hitech Residency)" }
];

export default function SimulatedMap() {
  const { techProgress, activeBooking } = useApp();

  // Interpolate position along the path based on progress (0 - 100)
  const currentPos = useMemo(() => {
    if (techProgress <= 0) return ROUTE_POINTS[0];
    if (techProgress >= 100) return ROUTE_POINTS[ROUTE_POINTS.length - 1];

    const totalSegments = ROUTE_POINTS.length - 1;
    const progressPerSegment = 100 / totalSegments;
    
    // Find active segment index
    const segmentIndex = Math.floor(techProgress / progressPerSegment);
    const segmentProgress = (techProgress % progressPerSegment) / progressPerSegment;

    const startPoint = ROUTE_POINTS[segmentIndex];
    const endPoint = ROUTE_POINTS[segmentIndex + 1];

    return {
      x: startPoint.x + (endPoint.x - startPoint.x) * segmentProgress,
      y: startPoint.y + (endPoint.y - startPoint.y) * segmentProgress,
      label: startPoint.label
    };
  }, [techProgress]);

  // Current road prompt based on position
  const currentRoadMessage = useMemo(() => {
    if (techProgress <= 0) return "Technician starting from Madhapur Hub.";
    if (techProgress < 20) return "Moving near Mindspace Junction.";
    if (techProgress < 40) return "Navigating Mindspace Underpass, traffic is light.";
    if (techProgress < 60) return "Passing Hitech City Metro Station, speed 45 km/h.";
    if (techProgress < 80) return "Turning right at Inorbit Mall intersection.";
    if (techProgress < 100) return "Entering Hitech Residency layout, searching block.";
    return "Technician has arrived at your gate!";
  }, [techProgress]);

  const booking = activeBooking || {
    id: "HF-882910",
    status: "en-route",
    eta: 12,
    distance: 2.1,
    technician: { name: "Aarav Sharma" }
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans">
      {/* Map Graphics Canvas wrapper */}
      <div className="relative w-full h-[360px] bg-neutral-100 dark:bg-brand-black rounded-cards overflow-hidden shadow-sm border border-border">
        {/* Abstract Stylized Map SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-neutral-300 dark:text-brand-navy fill-transparent stroke-current stroke-[0.5]"
        >
          {/* Grid Gridlines simulating block divisions */}
          <path d="M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80" className="stroke-neutral-200 dark:stroke-brand-navy/35" />
          <path d="M 20 0 L 20 100 M 40 0 L 40 100 M 60 0 L 60 100 M 80 0 L 80 100" className="stroke-neutral-200 dark:stroke-brand-navy/35" />

          {/* Park / Greenery zone */}
          <rect x="5" y="10" width="18" height="25" rx="3" className="fill-brand-emerald/10 dark:fill-brand-emerald/5 stroke-none" />
          <text x="7" y="24" className="fill-brand-emerald/50 dark:fill-brand-emerald/30 font-bold text-[3px] stroke-none select-none">Hitech City Park</text>
          
          {/* Water body */}
          <path d="M 85 60 Q 90 70 88 85 T 95 100" className="stroke-blue-200/50 dark:stroke-blue-900/40 fill-none stroke-[8]" />

          {/* Residential Blocks Layout */}
          <rect x="25" y="5" width="22" height="12" rx="2" className="fill-neutral-200/60 dark:fill-brand-navy/40 stroke-none" />
          <rect x="52" y="5" width="30" height="12" rx="2" className="fill-neutral-200/60 dark:fill-brand-navy/40 stroke-none" />
          <rect x="5" y="45" width="18" height="15" rx="2" className="fill-neutral-200/60 dark:fill-brand-navy/40 stroke-none" />
          <rect x="68" y="70" width="14" height="12" rx="2" className="fill-neutral-200/60 dark:fill-brand-navy/40 stroke-none" />

          {/* Central Roads / Street Paths */}
          <path d="M 15 0 L 15 100" className="stroke-neutral-300 dark:stroke-brand-navy/60 stroke-[1.8]" />
          <path d="M 0 85 L 100 85" className="stroke-neutral-300 dark:stroke-brand-navy/60 stroke-[1.8]" />
          <path d="M 80 0 L 80 100" className="stroke-neutral-300 dark:stroke-brand-navy/60 stroke-[1.8]" />
          <path d="M 0 25 L 100 25" className="stroke-neutral-300 dark:stroke-brand-navy/60 stroke-[1.8]" />
          
          {/* Routing Line (The path technician takes) */}
          <polyline
            points={ROUTE_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
            className="stroke-brand-blue/30 fill-none stroke-[1.8] stroke-dasharray-[3,3]"
          />
          <polyline
            points={ROUTE_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
            className="stroke-brand-blue fill-none stroke-[1.4] stroke-linecap-round"
          />

          {/* Technician Hub Marker */}
          <circle cx="15" cy="85" r="2.5" className="fill-brand-navy stroke-white stroke-[0.5]" />
          <circle cx="15" cy="85" r="0.8" className="fill-white" />

          {/* Customer Destination Marker */}
          <circle cx="80" cy="25" r="4" className="fill-brand-blue/30 animate-pulse" />
          <circle cx="80" cy="25" r="2" className="fill-brand-blue" />
        </svg>

        {/* Floating Destination Pin HUD */}
        <div className="absolute top-[25%] left-[80%] -translate-x-1/2 -translate-y-8 flex flex-col items-center">
          <div className="bg-brand-blue text-white px-2 py-1 text-[9px] font-bold rounded shadow-md border border-white/20 whitespace-nowrap">
            Your Home
          </div>
          <div className="w-1.5 h-1.5 bg-brand-blue rotate-45 -mt-1 shadow-sm"></div>
        </div>

        {/* Floating Moving Technician Pin */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
          style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
        >
          <div className="relative flex items-center justify-center h-10 w-10">
            {/* Ping aura */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-orange/30 animate-ping opacity-75"></span>
            
            {/* Tech Logo Circle */}
            <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-brand-orange border border-white shadow-md text-white">
              <Navigation className="w-4 h-4 rotate-45 transform" />
            </div>
          </div>
        </div>

        {/* Live HUD Dashboard Card */}
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-md rounded-md shadow-md border border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-full">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-dark dark:text-brand-gray tracking-wider">
                Live Status Tracker
              </span>
              <span className="text-xs font-bold text-brand-navy dark:text-brand-white block mt-0.5">
                {currentRoadMessage}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 border-l border-border pl-4">
            <span className="text-[10px] uppercase font-bold text-brand-dark dark:text-brand-gray tracking-wider">
              ETA
            </span>
            <span className="text-lg font-black font-mono text-brand-navy dark:text-brand-white block -mt-1">
              {booking.eta} <span className="text-xs font-sans font-semibold">Min</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 text-center">
          <span className="text-[10px] font-bold text-brand-dark dark:text-brand-gray block uppercase">
            Distance Left
          </span>
          <span className="text-base font-black font-mono text-brand-navy dark:text-brand-white mt-0.5 block">
            {booking.distance} km
          </span>
        </div>
        <div className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 text-center">
          <span className="text-[10px] font-bold text-brand-dark dark:text-brand-gray block uppercase">
            Vehicle Speed
          </span>
          <span className="text-base font-black font-mono text-brand-navy dark:text-brand-white mt-0.5 block">
            {techProgress >= 100 ? "0 km/h" : "38 km/h"}
          </span>
        </div>
        <div className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 text-center">
          <span className="text-[10px] font-bold text-brand-dark dark:text-brand-gray block uppercase">
            Route Condition
          </span>
          <span className="text-base font-black text-brand-emerald mt-0.5 block truncate">
            Clear Road
          </span>
        </div>
      </div>
    </div>
  );
}

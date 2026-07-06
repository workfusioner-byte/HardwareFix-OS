"use client";

import React, { useState } from "react";
import { Users, CheckCircle2, ShieldCheck, Flame } from "lucide-react";

interface CityData {
  name: string;
  technicians: number;
  jobsCompleted: string;
  avgEta: number;
  satisfaction: string;
  x: number; // percentage coordinate on map container
  y: number;
  popularService: string;
}

const COVERAGE_CITIES: CityData[] = [
  {
    name: "Delhi NCR",
    technicians: 720,
    jobsCompleted: "45K+",
    avgEta: 16,
    satisfaction: "4.9★",
    x: 41,
    y: 28,
    popularService: "Smart Door Locks"
  },
  {
    name: "Mumbai",
    technicians: 590,
    jobsCompleted: "31K+",
    avgEta: 20,
    satisfaction: "4.8★",
    x: 23,
    y: 59,
    popularService: "Kitchen Hardware Fix"
  },
  {
    name: "Pune",
    technicians: 340,
    jobsCompleted: "18K+",
    avgEta: 22,
    satisfaction: "4.8★",
    x: 27,
    y: 63,
    popularService: "Bathroom Hanger Setup"
  },
  {
    name: "Bengaluru",
    technicians: 650,
    jobsCompleted: "38K+",
    avgEta: 15,
    satisfaction: "4.9★",
    x: 37,
    y: 81,
    popularService: "Furniture Assembly"
  },
  {
    name: "Hyderabad",
    technicians: 480,
    jobsCompleted: "24K+",
    avgEta: 18,
    satisfaction: "4.9★",
    x: 42,
    y: 68,
    popularService: "TV Wall Mounting"
  }
];

export default function InteractiveMap() {
  const [selectedCity, setSelectedCity] = useState<CityData>(COVERAGE_CITIES[0]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card p-6 lg:p-10 rounded-cards shadow-md border border-border">
      {/* Map Graphic (Left 7 Cols) */}
      <div className="lg:col-span-7 flex justify-center items-center relative bg-brand-blue/5 dark:bg-brand-navy/20 rounded-lg p-6 overflow-hidden min-h-[460px]">
        {/* Map Container */}
        <div className="relative w-full max-w-[340px] aspect-[8.2/10] select-none">
          {/* Real India Outline SVG Map */}
          <img
            src="https://cdn.jsdelivr.net/npm/@svg-maps/india@1.0.1/india.svg"
            alt="Real Map of India"
            className="w-full h-full object-contain opacity-25 dark:opacity-30 filter sepia(0.8) hue-rotate(345deg) brightness(0.9) contrast(1.1)"
          />

          {/* Pulse Animations and City Markers */}
          {COVERAGE_CITIES.map((city) => {
            const isSelected = city.name === selectedCity.name;
            return (
              <div
                key={city.name}
                onClick={() => setSelectedCity(city)}
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
              >
                {/* Glowing Outer Pulse ring */}
                <div
                  className={`w-6 h-6 -ml-3 -mt-3 rounded-full bg-brand-sky/40 absolute scale-100 ${
                    isSelected ? "animate-ping opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                />
                
                {/* Solid Core Dot */}
                <div
                  className={`w-3.5 h-3.5 -ml-[7px] -mt-[7px] rounded-full border-2 border-white dark:border-brand-navy shadow-md transition-all duration-300 ${
                    isSelected ? "bg-brand-blue scale-120" : "bg-brand-navy dark:bg-brand-gray group-hover:bg-brand-blue"
                  }`}
                />

                {/* Text Label */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCity(city);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-9 left-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-md border transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? "bg-brand-blue text-white border-brand-blue scale-110 z-20"
                      : "bg-white border-border text-brand-navy hover:bg-brand-blue hover:text-white hover:border-brand-blue"
                  }`}
                >
                  {city.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card (Right 5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6 font-sans">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-sky">
            City Operations Map
          </span>
          <h3 className="text-2xl font-black text-brand-navy dark:text-brand-white mt-1">
            Now Servicing <span className="text-brand-blue">{selectedCity.name}</span>
          </h3>
          <p className="text-sm text-brand-dark dark:text-brand-gray mt-2 leading-relaxed">
            Get instant booking times and verified expert technicians dispatched near your local community in {selectedCity.name}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/40 border border-border/40 rounded-md flex flex-col gap-1">
            <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-blue" />
              On-Duty Experts
            </span>
            <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white">
              {selectedCity.technicians}+
            </span>
          </div>

          <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/40 border border-border/40 rounded-md flex flex-col gap-1">
            <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
              Jobs Completed
            </span>
            <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white">
              {selectedCity.jobsCompleted}
            </span>
          </div>

          <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/40 border border-border/40 rounded-md flex flex-col gap-1">
            <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-brand-orange" />
              Average ETA
            </span>
            <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white">
              {selectedCity.avgEta} <span className="text-xs font-sans font-normal">Mins</span>
            </span>
          </div>

          <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/40 border border-border/40 rounded-md flex flex-col gap-1">
            <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
              Avg Rating
            </span>
            <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white">
              {selectedCity.satisfaction}
            </span>
          </div>
        </div>

        <div className="p-4 border-l-4 border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10 rounded-r-md">
          <span className="text-xs font-bold text-brand-blue block uppercase tracking-wider">
            Trending Today
          </span>
          <span className="text-sm font-semibold text-brand-navy dark:text-brand-white mt-1 block">
            {selectedCity.popularService} Setup Request
          </span>
          <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">
            Heavy demand in corporate high-rises and apartments today.
          </p>
        </div>
      </div>
    </div>
  );
}

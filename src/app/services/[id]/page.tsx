"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import { ALL_SERVICES } from "@/app/page";
import { 
  Check, Calendar, Clock, Users, ArrowRight, ShieldCheck, 
  ChevronRight 
} from "lucide-react";

// Template configurations for each type of service
const SERVICE_TEMPLATES: Record<string, {
  galleryImages: string[];
  inclusions: string[];
  addons: { name: string; desc: string; price: number }[];
  param1: {
    label: string;
    options: { label: string; priceModifier: number }[];
  };
  param2: {
    label: string;
    options: { label: string; priceModifier: number }[];
  };
  param3: {
    label: string;
    options: { label: string; priceModifier: number }[];
  };
}> = {
  mounting: {
    galleryImages: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=600&auto=format&fit=crop&q=80"
    ],
    inclusions: [
      "Perfectly level alignment check with bubble tools",
      "Anchor holes drilling using dust-collecting drills",
      "Cable management routing and layout ties",
      "Structural integrity safety verification load-test",
      "Clean cleanup of post-drilling dust"
    ],
    addons: [
      { name: "Cable Concealer", desc: "Hide dangling cords cleanly", price: 199 },
      { name: "Premium Bracket", desc: "Heavy tilting bracket mount", price: 399 },
      { name: "Extra Shelf", desc: "Floating setup box stand", price: 299 }
    ],
    param1: {
      label: "Wall Material",
      options: [
        { label: "Brick Wall (Standard)", priceModifier: 0 },
        { label: "Concrete Wall (+Rs. 100)", priceModifier: 100 },
        { label: "Wooden Wall (+Rs. 150)", priceModifier: 150 },
        { label: "Plasterboard Wall (+Rs. 200)", priceModifier: 200 }
      ]
    },
    param2: {
      label: "Device/Item Size",
      options: [
        { label: "Small / Compact (Standard)", priceModifier: 0 },
        { label: "Medium (40\" - 55\") (Standard)", priceModifier: 0 },
        { label: "Large (55\" - 65\") (+Rs. 200)", priceModifier: 200 },
        { label: "Extra Large (65\"+) (+Rs. 400)", priceModifier: 400 }
      ]
    },
    param3: {
      label: "Mounting Height",
      options: [
        { label: "Standard Eye Level", priceModifier: 0 },
        { label: "High Level (6-8 ft) (+Rs. 150)", priceModifier: 150 },
        { label: "Ceiling Suspension (+Rs. 300)", priceModifier: 300 }
      ]
    }
  },
  assembly: {
    galleryImages: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=80"
    ],
    inclusions: [
      "Full hardware checks (cams, dowels, hinges)",
      "Precise structural assembly to manufacturer instructions",
      "Hinge and slider drawers leveling calibration",
      "Anti-scratch floor safety foam pads placement",
      "Complete assembly clean-up & packaging disposal helper"
    ],
    addons: [
      { name: "Premium Polish", desc: "Anti-dust wood finish treatment", price: 249 },
      { name: "Anti-Tip Safety Braces", desc: "Anchor heavy items to the wall", price: 199 },
      { name: "Extra Drawer Shelves", desc: "Custom dividers placement helper", price: 349 }
    ],
    param1: {
      label: "Item Complexity",
      options: [
        { label: "Simple (1-2 drawers) (Standard)", priceModifier: 0 },
        { label: "Standard (3-4 drawers) (+Rs. 150)", priceModifier: 150 },
        { label: "Complex Wardrobe/Cabinet (+Rs. 350)", priceModifier: 350 }
      ]
    },
    param2: {
      label: "Item Material",
      options: [
        { label: "Engineered Wood/MDF (Standard)", priceModifier: 0 },
        { label: "Solid Natural Timber Wood (+Rs. 200)", priceModifier: 200 },
        { label: "Metal/Alloy Structure (+Rs. 150)", priceModifier: 150 }
      ]
    },
    param3: {
      label: "Installation Area",
      options: [
        { label: "Ground Floor Room (Standard)", priceModifier: 0 },
        { label: "Upper Floors (No Elevator) (+Rs. 100)", priceModifier: 100 },
        { label: "Outdoor Patio Setup (+Rs. 150)", priceModifier: 150 }
      ]
    }
  },
  repair: {
    galleryImages: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
    ],
    inclusions: [
      "Fault diagnose & mechanical friction assessment",
      "Precise lock cylinders/hinges realignment check",
      "Screws tightening & replacement of broken fasteners",
      "High performance machine oil lubricating spray",
      "Post-repair locking safety integrity test"
    ],
    addons: [
      { name: "Extra Spare Cylinder", desc: "Standard 3 keys spare tumbler", price: 499 },
      { name: "Anti-Rust Spray Coat", desc: "WD40 hardware protector coat", price: 149 },
      { name: "Smart Lock Pairing Sync", desc: "App installation & Wi-Fi pairing help", price: 299 }
    ],
    param1: {
      label: "Fix Severity",
      options: [
        { label: "Minor Lock/Latch Jam (Standard)", priceModifier: 0 },
        { label: "Standard Lock/Mechanism Defect (+Rs. 150)", priceModifier: 150 },
        { label: "Heavy Strike Plate realigning (+Rs. 200)", priceModifier: 200 }
      ]
    },
    param2: {
      label: "Door/Frame Material",
      options: [
        { label: "Softwood Door Frame (Standard)", priceModifier: 0 },
        { label: "Heavy Teak Wood / Steel Door (+Rs. 200)", priceModifier: 200 },
        { label: "Glass & Aluminum Fitting (+Rs. 250)", priceModifier: 250 }
      ]
    },
    param3: {
      label: "Parts Inclusion",
      options: [
        { label: "Labor Only (Standard)", priceModifier: 0 },
        { label: "Premium Replacement Screws (+Rs. 50)", priceModifier: 50 },
        { label: "Standard Door Handles (+Rs. 400)", priceModifier: 400 }
      ]
    }
  }
};

const getTemplate = (id: string) => {
  if (["tv-mounting", "curtains", "bathroom-hardware", "safety"].includes(id)) {
    return SERVICE_TEMPLATES.mounting;
  }
  if (["furniture-assembly", "office-setup", "outdoor"].includes(id)) {
    return SERVICE_TEMPLATES.assembly;
  }
  return SERVICE_TEMPLATES.repair;
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params?.id as string || "tv-mounting";

  const { 
    setSelectedService,
    bookingForm, 
    updateBookingForm, 
    setCurrentRole, 
    availableTechnicians 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Look up current service definitions from exported array
  const currentService = useMemo(() => {
    return ALL_SERVICES.find((s) => s.id === serviceId) || {
      id: "tv-mounting",
      title: "TV Wall Mounting",
      price: 499,
      duration: "45 mins",
      desc: "Solid mounting on brick, concrete, or dry walls.",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&fit=crop&q=80"
    };
  }, [serviceId]);

  const template = useMemo(() => getTemplate(serviceId), [serviceId]);

  // Sync details on mount or routing change — only re-run when serviceId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const svc = ALL_SERVICES.find((s) => s.id === serviceId) || ALL_SERVICES[0];
    const tmpl = getTemplate(serviceId);

    setSelectedService({
      id: svc.id,
      title: svc.title,
      price: svc.price,
      duration: svc.duration,
      category: "Hardware",
      iconName: svc.id === "tv-mounting" ? "Tv" : "Wrench"
    });

    updateBookingForm({
      addons: [],
      wallType: tmpl.param1.options[0].label,
      tvSize: tmpl.param2.options[0].label,
      installationHeight: tmpl.param3.options[0].label
    });
    setActiveImageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // Dynamic Addons toggling
  const handleToggleAddon = (addon: string) => {
    const activeAddons = [...bookingForm.addons];
    if (activeAddons.includes(addon)) {
      updateBookingForm({ addons: activeAddons.filter((a) => a !== addon) });
    } else {
      updateBookingForm({ addons: [...activeAddons, addon] });
    }
  };

  // Dynamic price calculation
  const calculatedTotal = useMemo(() => {
    let basePrice = currentService.price;
    
    const opt1 = template.param1.options.find(o => o.label === bookingForm.wallType);
    if (opt1) basePrice += opt1.priceModifier;
    
    const opt2 = template.param2.options.find(o => o.label === bookingForm.tvSize);
    if (opt2) basePrice += opt2.priceModifier;
    
    const opt3 = template.param3.options.find(o => o.label === bookingForm.installationHeight);
    if (opt3) basePrice += opt3.priceModifier;
    
    let addonsPrice = 0;
    template.addons.forEach(addon => {
      if (bookingForm.addons.includes(addon.name)) {
        addonsPrice += addon.price;
      }
    });
    
    return basePrice + addonsPrice;
  }, [currentService.price, template, bookingForm.wallType, bookingForm.tvSize, bookingForm.installationHeight, bookingForm.addons]);

  const handleBookNow = () => {
    setCurrentRole("booking");
  };

  const timeSlots = [
    "Morning (09:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 03:00 PM)",
    "Evening (03:00 PM - 06:00 PM)",
    "Night (06:00 PM - 09:00 PM)"
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 font-sans">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-brand-dark dark:text-brand-gray mb-6">
          <button onClick={() => setCurrentRole("landing")} className="hover:text-brand-sky">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => setCurrentRole("landing")} className="hover:text-brand-sky">Services</button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-bold text-brand-navy dark:text-brand-white">{currentService.title}</span>
        </div>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Gallery View (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-video rounded-cards overflow-hidden shadow-sm border border-border group bg-neutral-100">
              <img
                src={template.galleryImages[activeImageIndex] || currentService.image}
                alt="Service Detail"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 text-xs font-bold rounded-buttons uppercase tracking-wider">
                Hardware Fix
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4">
              {template.galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 aspect-[16/10] rounded-md overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? "border-brand-sky scale-102"
                      : "border-border hover:border-brand-sky/50"
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Summary Widget (5 Cols) */}
          <div className="lg:col-span-5 bg-card p-6 rounded-cards border border-border shadow-md flex flex-col gap-5">
            <div>
              <span className="text-[10px] bg-brand-blue/15 text-brand-blue px-2.5 py-0.5 rounded-full font-bold uppercase w-fit tracking-wider">
                Expert Repair
              </span>
              <h1 className="text-3xl font-black text-brand-navy dark:text-brand-white mt-2">
                {currentService.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-amber-500 flex items-center gap-0.5">
                  ⭐ 4.9 <span className="text-xs text-brand-dark dark:text-brand-gray font-normal">(18K Reviews)</span>
                </span>
                <span className="text-xs text-brand-dark dark:text-brand-gray font-semibold">•</span>
                <span className="text-xs text-brand-dark dark:text-brand-gray font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-sky" />
                  {currentService.duration}
                </span>
              </div>
            </div>

            <div className="border-y border-border/40 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-dark dark:text-brand-gray block font-semibold">Dynamic Total Estimate</span>
                <span className="text-3xl font-black font-mono text-brand-navy dark:text-brand-white mt-1 block">
                  Rs. {calculatedTotal}
                </span>
              </div>
              <button
                onClick={handleBookNow}
                className="h-12 px-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-buttons shadow-sm flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
              >
                Book This Slot
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-brand-emerald bg-brand-emerald/10 p-3 rounded-md border border-brand-emerald/20 font-medium">
              <ShieldCheck className="w-4.5 h-4.5" />
              Includes 90-day post-service workmanship warranty.
            </div>
          </div>
        </div>

        {/* Details and Calculator grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inclusions & Calculator (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Price Calculator section */}
            <div className="bg-card p-6 rounded-cards border border-border shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">
                  Live Custom Price Calculator
                </h3>
                <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">
                  Select parameters representing your setup requirements and materials for an immediate quote calculation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Parameter 1 */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">{template.param1.label}</span>
                  <select
                    value={bookingForm.wallType}
                    onChange={(e) => updateBookingForm({ wallType: e.target.value })}
                    className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/30 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    {template.param1.options.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Parameter 2 */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">{template.param2.label}</span>
                  <select
                    value={bookingForm.tvSize}
                    onChange={(e) => updateBookingForm({ tvSize: e.target.value })}
                    className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/30 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    {template.param2.options.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Parameter 3 */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">{template.param3.label}</span>
                  <select
                    value={bookingForm.installationHeight}
                    onChange={(e) => updateBookingForm({ installationHeight: e.target.value })}
                    className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/30 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    {template.param3.options.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons Select Cards */}
              <div className="flex flex-col gap-3 mt-2">
                <span className="text-xs font-bold text-brand-navy dark:text-brand-white">Recommended Add-ons</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {template.addons.map((addon) => {
                    const isSelected = bookingForm.addons.includes(addon.name);
                    return (
                      <button
                        key={addon.name}
                        onClick={() => handleToggleAddon(addon.name)}
                        className={`p-4 rounded-buttons border flex flex-col gap-2 text-left bg-card transition-all ${
                          isSelected
                            ? "border-brand-sky bg-brand-sky/5 ring-1 ring-brand-sky"
                            : "border-border hover:border-brand-sky/50"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-bold text-brand-navy dark:text-brand-white">{addon.name}</span>
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                            isSelected ? "bg-brand-sky border-brand-sky text-white" : "border-border"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                        <span className="text-[11px] text-brand-dark dark:text-brand-gray flex-grow leading-normal">{addon.desc}</span>
                        <span className="text-xs font-mono font-bold text-brand-sky">Rs. {addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Inclusions checkmarks card */}
            <div className="bg-card p-6 rounded-cards border border-border shadow-sm">
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white mb-6">
                What's Included in the Service
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {template.inclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="p-1 bg-brand-emerald/15 text-brand-emerald rounded-full mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-brand-dark dark:text-brand-gray leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time & Technician Columns (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Time slot picker */}
            <div className="bg-card p-6 rounded-cards border border-border shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-brand-navy dark:text-brand-white flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-brand-sky" />
                Select Slot Date & Time
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-brand-dark dark:text-brand-gray uppercase tracking-wide">Date</span>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => updateBookingForm({ date: e.target.value })}
                  className="h-10 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[11px] font-bold text-brand-dark dark:text-brand-gray uppercase tracking-wide">Preferred Time</span>
                <div className="flex flex-col gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = bookingForm.slot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => updateBookingForm({ slot })}
                        className={`h-11 px-4 text-left rounded-buttons text-xs font-semibold border flex items-center justify-between transition-colors bg-card ${
                          isSelected
                            ? "bg-brand-sky/5 border-brand-sky text-brand-sky"
                            : "border-border hover:bg-brand-sky/5 hover:text-brand-sky"
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <span className="h-2 w-2 rounded-full bg-brand-sky"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Matched technicians widget */}
            <div className="bg-card p-6 rounded-cards border border-border shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-brand-navy dark:text-brand-white flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-brand-sky" />
                Matched Local Experts ({availableTechnicians.length})
              </h3>
              <div className="flex flex-col gap-3">
                {availableTechnicians.slice(0, 2).map((tech) => (
                  <div key={tech.id} className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 border border-border/40 rounded-md flex items-center gap-3">
                    <img
                      src={tech.photo}
                      alt={tech.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div className="flex-grow min-w-0">
                      <span className="text-xs font-bold block text-brand-navy dark:text-brand-white truncate">{tech.name}</span>
                      <span className="text-[10px] text-amber-500 font-semibold block">⭐ {tech.rating} • {tech.experience} Exp</span>
                      <span className="text-[9px] text-brand-dark dark:text-brand-gray truncate block">Lang: {tech.languages.slice(0,2).join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}

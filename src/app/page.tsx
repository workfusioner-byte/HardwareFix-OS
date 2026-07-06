"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import InteractiveMap from "@/components/InteractiveMap";
import AiEstimate from "@/components/AiEstimate";
import { 
  Tv, Sliders, Wrench, Shield, Key, Compass, Info, HelpCircle, 
  ArrowRight, Search, CheckCircle, Star, Sparkles, PhoneCall, PlayCircle, Smartphone 
} from "lucide-react";

// Mock Services data for Grid (12 Cards)
export const ALL_SERVICES = [
  { id: "tv-mounting", title: "TV Wall Mounting", price: 499, duration: "45 mins", icon: Tv, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Solid mounting on brick, concrete, or dry walls.", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&fit=crop&q=80" },
  { id: "furniture-assembly", title: "Furniture Assembly", price: 399, duration: "60 mins", icon: Sliders, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Beds, tables, cabinets, and IKEA products assembled.", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&fit=crop&q=80" },
  { id: "door-repairs", title: "Door Repairs & Shaving", price: 299, duration: "30 mins", icon: Wrench, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Hanging correction, shaving, and alignment fixes.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&fit=crop&q=80" },
  { id: "locks", title: "Locks & Latches Fix", price: 349, duration: "40 mins", icon: Key, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Deadbolts, handles, cylinders, smart locks set up.", image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&fit=crop&q=80" },
  { id: "curtains", title: "Curtains & Blinds", price: 199, duration: "30 mins", icon: Sliders, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Rods, tracks, vertical or roller blinds mounted.", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&fit=crop&q=80" },
  { id: "kitchen-hardware", title: "Kitchen Hardware", price: 249, duration: "30 mins", icon: Wrench, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Cabinet hinges, gas struts, drawer sliders replaced.", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&fit=crop&q=80" },
  { id: "bathroom-hardware", title: "Bathroom Hardware", price: 199, duration: "35 mins", icon: Sliders, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Towel rails, mirror cabinets, soap holders fitted.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&fit=crop&q=80" },
  { id: "office-setup", title: "Office Assembly", price: 599, duration: "90 mins", icon: Wrench, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Ergonomic desk, dual-monitor mounts, office chairs.", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&fit=crop&q=80" },
  { id: "outdoor", title: "Outdoor & Patio", price: 399, duration: "60 mins", icon: Wrench, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Awnings, bird nets, planters, garden structures fix.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&fit=crop&q=80" },
  { id: "safety", title: "Safety Gate Install", price: 449, duration: "45 mins", icon: Shield, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Baby gates, pet barriers, balcony safety mesh.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&fit=crop&q=80" },
  { id: "smart-home", title: "Smart Home Devices", price: 499, duration: "45 mins", icon: Compass, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Video doorbells, smart cameras, smart bulbs configuration.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&fit=crop&q=80" },
  { id: "window-repairs", title: "Window Glass & Mesh", price: 299, duration: "40 mins", icon: Sliders, bg: "bg-brand-blue/5", border: "hover:border-brand-sky", desc: "Latches, slider rollers, mosquito mesh replacement.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&fit=crop&q=80" }
];

export default function Home() {
  const router = useRouter();
  const { setCurrentRole, setSelectedService } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<typeof ALL_SERVICES>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Counter states for statistics
  const [jobsCount, setJobsCount] = useState(140000);
  const [techsCount, setTechsCount] = useState(14000);

  useEffect(() => {
    // Animate stats counter slightly on mount
    const jobsTimer = setInterval(() => {
      setJobsCount((prev) => (prev < 150000 ? prev + 310 : 150000));
    }, 40);
    const techsTimer = setInterval(() => {
      setTechsCount((prev) => (prev < 15000 ? prev + 35 : 15000));
    }, 40);

    return () => {
      clearInterval(jobsTimer);
      clearInterval(techsTimer);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim().length > 1) {
      const filtered = ALL_SERVICES.filter(s => 
        s.title.toLowerCase().includes(val.toLowerCase()) || 
        s.desc.toLowerCase().includes(val.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSelectService = (service: typeof ALL_SERVICES[0]) => {
    setSelectedService({
      id: service.id,
      title: service.title,
      price: service.price,
      duration: service.duration,
      category: "Hardware",
      iconName: service.id === "tv-mounting" ? "Tv" : "Wrench"
    });
    router.push(`/services/${service.id}`);
  };

  const faqs = [
    { q: "How are your technicians background-checked?", a: "All HardwareFix experts go through a rigorous three-step onboarding: identity verify via government credentials, criminal history lookup, and an in-person handiwork test in our local training workshops." },
    { q: "What does the 90-day service warranty cover?", a: "If the hardware we install or repair becomes loose, misaligned, or fails due to workmanship within 90 days, we send a technician back for a completely free correction under insurance." },
    { q: "Are replacement screws or brackets included in the pricing?", a: "Standard fasteners, rawl plugs, and screws are included. Heavy-duty TV brackets, custom shelves, or specialized locks can be selected during the add-on phase or provided by you." },
    { q: "Can I schedule emergency bookings within an hour?", a: "Yes. By choosing 'Emergency Repair' in the booking panel, our system targets nearby active technicians with a response guarantee of under 45 minutes for urgent lockouts or structural failures." }
  ];

  return (
    <PageLayout>
      {/* 900px Hero Section */}
      <section className="relative min-h-[900px] flex items-center justify-between px-6 lg:px-12 bg-gradient-to-br from-brand-blue/5 via-background to-brand-purple/5 overflow-hidden py-16">
        
        {/* Left Side: Headline and Search */}
        <div className="max-w-xl flex flex-col gap-6 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-extrabold uppercase tracking-widest w-fit">
            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
            Hyperlocal Repairs Platform
          </div>
          
          <h1 className="text-5xl lg:text-[56px] font-black leading-tight text-brand-navy dark:text-brand-white font-sans">
            Need Something <span className="text-brand-blue">Fixed?</span>
          </h1>
          <p className="text-lg text-brand-dark dark:text-brand-gray font-medium -mt-2">
            Book verified hardware technicians in minutes. Transparent pricing, 90-day warranty, and real-time live tracking.
          </p>

          {/* Active Search Widget */}
          <div className="relative w-full mt-2">
            <div className="flex gap-2 p-1.5 bg-white dark:bg-brand-navy border border-border shadow-md rounded-cards">
              <div className="flex-grow flex items-center gap-2 pl-3">
                <Search className="w-5 h-5 text-brand-blue" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="What needs fixing today? (e.g. TV mount, locks)"
                  className="w-full text-sm bg-transparent border-none outline-none dark:text-white"
                />
              </div>
              <button 
                onClick={() => searchTerm && setSearchSuggestions(ALL_SERVICES)}
                className="h-11 px-5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-sm font-bold shadow-sm"
              >
                Search
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-[105%] left-0 right-0 p-2 bg-white dark:bg-brand-navy border border-border rounded-md shadow-lg z-20 flex flex-col gap-1.5">
                {searchSuggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectService(item)}
                    className="flex items-center justify-between text-left p-2 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-md text-sm transition-colors"
                  >
                    <div>
                      <span className="font-bold text-brand-navy dark:text-brand-white">{item.title}</span>
                      <p className="text-xs text-brand-dark dark:text-brand-gray truncate max-w-sm">{item.desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-blue">Rs. {item.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subtext Trending Badges */}
          <div className="flex flex-wrap gap-2 items-center text-xs text-brand-dark dark:text-brand-gray">
            <span className="font-bold">Trending fixes:</span>
            {ALL_SERVICES.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectService(s)}
                className="px-2.5 py-1 bg-white dark:bg-brand-navy border border-border rounded-full hover:border-brand-blue/60 transition-colors"
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Action Call-to-actions */}
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => {
                setSelectedService({
                  id: ALL_SERVICES[0].id,
                  title: ALL_SERVICES[0].title,
                  price: ALL_SERVICES[0].price,
                  duration: ALL_SERVICES[0].duration,
                  category: "Hardware",
                  iconName: "Tv"
                });
                setCurrentRole("booking");
              }}
              className="px-7 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-extrabold rounded-buttons shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              Book Service
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            
            <button 
              onClick={() => {
                // Emergency Booking Mode
                setSelectedService({
                  id: "emergency-lock",
                  title: "Emergency Lockout Rescue",
                  price: 899,
                  duration: "30-45 mins",
                  category: "Locks",
                  iconName: "Key"
                });
                setCurrentRole("booking");
              }}
              className="px-7 py-3.5 bg-brand-orange hover:bg-brand-orange/95 text-white text-sm font-extrabold rounded-buttons shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              Emergency Repair
            </button>
          </div>
        </div>

        {/* Right Side: Floating HUD mockup illustration */}
        <div className="hidden lg:flex lg:w-[500px] h-[550px] relative items-center justify-center">
          {/* Abstract soft background gradient circle */}
          <div className="absolute inset-0 bg-brand-blue/10 rounded-full filter blur-[80px]" />
          
          {/* Main 3D Technician Image card */}
          <div className="relative w-[340px] aspect-[3/4] bg-gradient-to-tr from-brand-navy to-brand-blue p-1 rounded-cards shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-cover bg-center opacity-85" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] bg-brand-emerald text-white px-2.5 py-0.5 rounded-full font-bold uppercase w-fit tracking-wider">Verified Expert</span>
              <span className="text-xl font-bold text-white mt-1">Aarav Sharma</span>
              <p className="text-xs text-brand-gray mt-0.5">Assigned to Hyderabad central corridor repairs</p>
            </div>
          </div>

          {/* Floating cards */}
          {/* Rating */}
          <div className="absolute top-[12%] -left-[10%] p-4 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-md rounded-md shadow-md border border-border flex items-center gap-3 animate-bounce-slow">
            <div className="p-2 bg-amber-100 text-amber-500 rounded-full">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-base text-brand-navy dark:text-brand-white block">⭐ 4.9 Rating</span>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray font-medium block">Across 150K+ repair jobs</span>
            </div>
          </div>

          {/* Delivery speed */}
          <div className="absolute bottom-[20%] -right-[8%] p-4 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-md rounded-md shadow-md border border-border flex items-center gap-3 animate-pulse">
            <div className="p-2 bg-brand-blue/15 text-brand-blue rounded-full">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-brand-navy dark:text-brand-white block">Same Day Fix</span>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray font-medium block">Booked to finished in 3 hours</span>
            </div>
          </div>

          {/* Trusted check */}
          <div className="absolute bottom-[8%] left-[2%] p-3.5 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-md rounded-md shadow-md border border-border flex items-center gap-2.5">
            <div className="p-1.5 bg-brand-emerald/10 text-brand-emerald rounded-full">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-brand-navy dark:text-brand-white">100% Insurance Covered</span>
          </div>
        </div>
      </section>

      {/* Floating Statistics */}
      <section className="bg-brand-navy text-white py-12 relative border-y border-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl lg:text-4xl font-black text-brand-sky">
              {(jobsCount / 1000).toFixed(0)}K+
            </span>
            <span className="text-xs font-sans text-brand-gray font-semibold uppercase tracking-wider">
              Jobs Completed
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl lg:text-4xl font-black text-brand-sky">
              {(techsCount / 1000).toFixed(0)}K+
            </span>
            <span className="text-xs font-sans text-brand-gray font-semibold uppercase tracking-wider">
              Technicians
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl lg:text-4xl font-black text-brand-emerald">
              4.9★
            </span>
            <span className="text-xs font-sans text-brand-gray font-semibold uppercase tracking-wider">
              Average Rating
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl lg:text-4xl font-black text-brand-sky">
              25 Cities
            </span>
            <span className="text-xs font-sans text-brand-gray font-semibold uppercase tracking-wider">
              City Hubs
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid (12 Cards) */}
      <section id="services" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Our Fix Categories
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-navy dark:text-brand-white mt-1">
            Choose What Needs Fixing Today
          </h2>
          <p className="text-sm text-brand-dark dark:text-brand-gray mt-2">
            Every repair includes verified experts, transparent upfront estimate calculations, and a post-fix warranty guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_SERVICES.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => handleSelectService(s)}
                className={`p-4 rounded-cards bg-card border border-border shadow-sm transition-all duration-300 cursor-pointer ${s.border} hover:-translate-y-1.5 hover:shadow-md flex flex-col group overflow-hidden`}
              >
                {/* Product Image */}
                <div className="w-full aspect-[16/10] rounded-md overflow-hidden mb-4 bg-brand-light relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Floating Icon badge */}
                  <div className="absolute bottom-2.5 right-2.5 p-2 bg-brand-blue/80 text-white rounded-md backdrop-blur-sm shadow-sm transition-transform duration-200 group-hover:rotate-6">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                
                <h4 className="text-base font-extrabold text-brand-navy dark:text-brand-white group-hover:text-brand-sky transition-colors">
                  {s.title}
                </h4>
                <p className="text-xs text-brand-dark dark:text-brand-gray mt-1.5 flex-grow line-clamp-2 leading-relaxed">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-5">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wide font-bold text-brand-dark dark:text-brand-gray">Starting At</span>
                    <span className="text-base font-black font-mono text-brand-navy dark:text-brand-white">Rs. {s.price}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-brand-sky hover:text-brand-blue transition-colors">
                    Book
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Estimate Widget Section */}
      <section className="py-20 bg-brand-navy/5 dark:bg-brand-navy/15 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-emerald">
              Neural Repair Scan
            </span>
            <h2 className="text-3xl font-black text-brand-navy dark:text-brand-white mt-1">
              Analyze Hardware Damage Instantly
            </h2>
            <p className="text-sm text-brand-dark dark:text-brand-gray mt-2">
              Have a broken cupboard door or loose bracket, but don't know the exact service? Upload a photo to let our AI identify the fix.
            </p>
          </div>
          <AiEstimate />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            The Fix Guarantee
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-brand-navy dark:text-brand-white mt-1">
            Built for Extreme Trust & Speed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-cards border border-border shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200 bg-gradient-to-b from-brand-blue/5 to-transparent">
            <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-full w-fit">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-brand-navy dark:text-brand-white">Verified Experts</h4>
            <p className="text-xs text-brand-dark dark:text-brand-gray leading-normal">
              Every expert goes through identity checks, criminal records check, and custom hardware tests in our workshops.
            </p>
          </div>

          <div className="p-6 rounded-cards border border-border shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200 bg-gradient-to-b from-brand-emerald/5 to-transparent">
            <div className="p-3 bg-brand-emerald/10 text-brand-emerald rounded-full w-fit">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-brand-navy dark:text-brand-white">Fixed Pricing</h4>
            <p className="text-xs text-brand-dark dark:text-brand-gray leading-normal">
              No hidden costs or hourly fees. You calculate pricing via custom configurations beforehand and pay exactly that.
            </p>
          </div>

          <div className="p-6 rounded-cards border border-border shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200 bg-gradient-to-b from-brand-orange/5 to-transparent">
            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-full w-fit">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-brand-navy dark:text-brand-white">90-Day Warranty</h4>
            <p className="text-xs text-brand-dark dark:text-brand-gray leading-normal">
              Workmanship is covered under insurance. If anything comes loose or breaks within 90 days, we fix it free.
            </p>
          </div>

          <div className="p-6 rounded-cards border border-border shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200 bg-gradient-to-b from-brand-purple/5 to-transparent">
            <div className="p-3 bg-brand-purple/10 text-brand-purple rounded-full w-fit">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-brand-navy dark:text-brand-white">Live Tracking</h4>
            <p className="text-xs text-brand-dark dark:text-brand-gray leading-normal">
              Track the technician's coordinate path to your building in real time with an live countdown ETA.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 bg-brand-navy/5 dark:bg-brand-navy/15 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-purple">
              Before & After Comparison
            </span>
            <h2 className="text-3xl font-black text-brand-navy dark:text-brand-white mt-1">
              Excellence in Craftsmanship
            </h2>
            <p className="text-sm text-brand-dark dark:text-brand-gray mt-2">
              Say goodbye to messy wiring, structural cracks, and loose components. We guarantee perfectly level setups.
            </p>
          </div>
          <ImageComparisonSlider />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="cities" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
            Our Hub Networks
          </span>
          <h2 className="text-3xl font-black text-brand-navy dark:text-brand-white mt-1">
            Serving Major Metropolitan Hubs
          </h2>
          <p className="text-sm text-brand-dark dark:text-brand-gray mt-2">
            Click on any coverage hub to see technician density, completed booking metrics, and average dispatch ETA.
          </p>
        </div>
        <InteractiveMap />
      </section>

      {/* Accordion FAQ */}
      <section id="faq" className="py-20 bg-brand-navy/5 dark:bg-brand-navy/15 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black text-brand-navy dark:text-brand-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-card rounded-md border border-border/50 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left font-bold text-brand-navy dark:text-brand-white flex items-center justify-between text-[15px] focus:outline-none hover:text-brand-blue"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-brand-blue text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-brand-dark dark:text-brand-gray border-t border-border/20 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App download banner */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-brand-blue/15 text-brand-blue text-xs font-bold rounded-full w-fit uppercase">
            <Smartphone className="w-4 h-4" />
            HardwareFix App
          </div>
          <h2 className="text-4xl font-black text-brand-navy dark:text-brand-white leading-tight">
            Book, Chat & Track Live on the Go
          </h2>
          <p className="text-sm text-brand-dark dark:text-brand-gray leading-relaxed max-w-lg">
            Download our custom mobile app for lightning-fast bookings, automated offline retry sync, in-app technician chat alerts, and live tracking map widgets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
            <div className="p-3 bg-white border border-border rounded-lg shadow-sm flex items-center gap-3.5 w-full sm:w-auto">
              {/* Mock QR Code */}
              <div className="w-16 h-16 bg-neutral-200 flex items-center justify-center font-mono text-[9px] text-center font-bold stroke-2 rounded border">
                QR CODE
              </div>
              <div>
                <span className="text-xs font-bold block text-brand-navy">Scan to Download</span>
                <span className="text-[10px] text-brand-dark block">Available on iOS & Android</span>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="h-12 px-6 bg-brand-navy hover:bg-brand-black text-white text-xs font-bold rounded-buttons flex items-center gap-2 border border-white/10 w-1/2 sm:w-auto justify-center">
                App Store
              </button>
              <button className="h-12 px-6 bg-brand-navy hover:bg-brand-black text-white text-xs font-bold rounded-buttons flex items-center gap-2 border border-white/10 w-1/2 sm:w-auto justify-center">
                Play Store
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          {/* Mock iPhone App Screen mockup */}
          <div className="relative w-[280px] h-[560px] bg-brand-black rounded-[40px] border-[6px] border-neutral-800 shadow-xl overflow-hidden flex flex-col text-white">
            {/* Dynamic island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-brand-black rounded-full z-15"></div>
            
            {/* App Screen Header */}
            <div className="bg-brand-blue pt-8 pb-4 px-4 flex justify-between items-center text-xs font-bold">
              <span>HardwareFix</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px]">Hyderabad</span>
            </div>
            
            {/* App Screen Body */}
            <div className="flex-grow bg-neutral-100 text-brand-navy p-4 flex flex-col gap-3">
              <div className="p-3 bg-white rounded-md shadow-sm flex flex-col gap-2">
                <span className="text-[10px] font-bold text-brand-blue uppercase">Assigned technician</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=80&h=80" alt="tech" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Aarav Sharma</span>
                    <span className="text-[9px] text-brand-emerald block">En Route (1.4 km left)</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow bg-white rounded-md border p-2 relative overflow-hidden flex items-center justify-center font-mono text-[9px] font-bold text-neutral-400">
                [ LIVE SVG MAP TRACKING ]
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

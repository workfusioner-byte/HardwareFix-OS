"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Wrench, PhoneCall, Globe, Menu, X, ArrowRight, ShieldCheck, Mail } from "lucide-react";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { currentRole, setCurrentRole, setSelectedService } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    // Set default mounting service and navigate
    setSelectedService({
      id: "tv-mounting",
      title: "Premium TV Mounting",
      price: 499,
      duration: "45-60 min",
      category: "Hardware",
      iconName: "Tv"
    });
    setCurrentRole("booking");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 80px Sticky Glass Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 h-20 z-40 transition-all duration-300 flex items-center justify-between px-6 lg:px-12 ${
          scrolled
            ? "glass-light shadow-md border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        {/* Left - Logo */}
        <div 
          onClick={() => setCurrentRole("landing")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-2 bg-brand-blue text-white rounded-md transition-transform duration-200 group-hover:rotate-12">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-brand-navy dark:text-brand-white">
            Hardware<span className="text-brand-blue">Fix</span>
          </span>
        </div>

        {/* Center - Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-brand-dark dark:text-brand-gray">
          <button onClick={() => setCurrentRole("landing")} className="hover:text-brand-blue transition-colors">
            Services
          </button>
          <a href="#pricing" onClick={() => setCurrentRole("landing")} className="hover:text-brand-blue transition-colors">
            Pricing
          </a>
          <button onClick={() => setCurrentRole("admin")} className="hover:text-brand-blue transition-colors">
            For Business
          </button>
          <button onClick={() => setCurrentRole("technician")} className="hover:text-brand-blue transition-colors">
            Become Technician
          </button>
          <a href="#cities" onClick={() => setCurrentRole("landing")} className="hover:text-brand-blue transition-colors">
            Cities
          </a>
          <a href="#about" onClick={() => setCurrentRole("landing")} className="hover:text-brand-blue transition-colors">
            About
          </a>
        </nav>

        {/* Right - Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-sm font-semibold hover:text-brand-blue transition-colors">
            <PhoneCall className="w-4 h-4 text-brand-blue" />
            Support
          </button>
          <button className="flex items-center gap-1 text-sm hover:text-brand-blue transition-colors text-brand-dark dark:text-brand-gray">
            <Globe className="w-4 h-4" />
            EN
          </button>
          <button 
            onClick={() => setCurrentRole("customer")}
            className="text-sm font-semibold text-brand-dark dark:text-brand-white hover:text-brand-blue transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleBookNow}
            className="h-11 px-6 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brand-dark dark:text-brand-white hover:bg-brand-blue/10 rounded-full"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-35 bg-background/95 backdrop-blur-md border-b border-border lg:hidden flex flex-col p-6 animate-fade-in">
          <div className="flex flex-col gap-6 text-lg font-bold mt-4">
            <button
              onClick={() => {
                setCurrentRole("landing");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-brand-blue"
            >
              Services
            </button>
            <button
              onClick={() => {
                setCurrentRole("landing");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-brand-blue"
            >
              Cities
            </button>
            <button
              onClick={() => {
                setCurrentRole("technician");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-brand-blue text-brand-orange"
            >
              Become Technician
            </button>
            <button
              onClick={() => {
                setCurrentRole("admin");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-brand-blue"
            >
              For Business
            </button>
            <button
              onClick={() => {
                setCurrentRole("customer");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-brand-blue text-brand-emerald"
            >
              My Bookings
            </button>
          </div>
          <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6 mb-8">
            <button
              onClick={() => {
                handleBookNow();
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons font-bold shadow-md text-center"
            >
              Book Now
            </button>
            <div className="flex items-center justify-around text-sm font-semibold text-brand-dark dark:text-brand-gray mt-2">
              <button className="flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-brand-blue" /> Support</button>
              <button className="flex items-center gap-1"><Globe className="w-4 h-4" /> English</button>
            </div>
          </div>
        </div>
      )}

      {/* Main content body spacing top for 80px navbar */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-brand-dark/30 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-blue text-white rounded-md">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight">
                Hardware<span className="text-brand-blue">Fix</span>
              </span>
            </div>
            <p className="text-brand-gray text-sm max-w-sm">
              Hyperlocal, verified experts at your doorstep within minutes. 90-day warranty, transparent pricing, and absolute peace of mind.
            </p>
            <div className="flex flex-col gap-3 max-w-sm mt-2">
              <span className="text-sm font-semibold text-brand-white uppercase tracking-wider">
                Subscribe to our newsletter
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-grow h-11 px-4 rounded-buttons bg-brand-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue border border-brand-white/15"
                />
                <button className="h-11 px-5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-sm font-bold flex items-center justify-center transition-all duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Columns 1: Services */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-sky">Services</span>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-gray">
              <li><button onClick={() => setCurrentRole("service")} className="hover:text-brand-blue text-left transition-colors">TV Wall Mounting</button></li>
              <li><button onClick={() => setCurrentRole("service")} className="hover:text-brand-blue text-left transition-colors">Furniture Assembly</button></li>
              <li><button onClick={() => setCurrentRole("service")} className="hover:text-brand-blue text-left transition-colors">Smart Door Locks</button></li>
              <li><button onClick={() => setCurrentRole("service")} className="hover:text-brand-blue text-left transition-colors">Curtain Hanger Mounts</button></li>
              <li><button onClick={() => setCurrentRole("service")} className="hover:text-brand-blue text-left transition-colors">Cabinet Hinge Fix</button></li>
            </ul>
          </div>

          {/* Columns 2: Support & Tech */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-sky">Technicians</span>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-gray">
              <li><button onClick={() => setCurrentRole("technician")} className="hover:text-brand-blue text-left transition-colors">Join as Technician</button></li>
              <li><button onClick={() => setCurrentRole("admin")} className="hover:text-brand-blue text-left transition-colors">Corporate Business</button></li>
              <li><a href="#faq" onClick={() => setCurrentRole("landing")} className="hover:text-brand-blue transition-colors">FAQs</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Columns 3: Legal */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-sky">Legal</span>
            <ul className="flex flex-col gap-2.5 text-sm text-brand-gray">
              <li><a href="#privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
              <li><a href="#refund" className="hover:text-brand-blue transition-colors">Warranty & Refund</a></li>
              <li><a href="#sitemap" className="hover:text-brand-blue transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 pt-8 border-t border-brand-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            © {new Date().getFullYear()} HardwareFix Technologies Pvt Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-brand-gray">
            <a href="#mail" className="hover:text-brand-blue transition-colors"><Mail className="w-4.5 h-4.5" /></a>
            <a href="#website" className="hover:text-brand-blue transition-colors"><Globe className="w-4.5 h-4.5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

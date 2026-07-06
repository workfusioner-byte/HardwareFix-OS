"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import SimulatedMap from "@/components/SimulatedMap";
import ChatInterface from "@/components/ChatInterface";
import { 
  Wrench, Wallet, Calendar, Map, ClipboardList, Shield, 
  Award, MessageSquare, Compass, Play, DollarSign, CheckSquare, 
  Star, ThumbsUp, Key, User, PhoneCall 
} from "lucide-react";

export default function TechnicianDashboard() {
  const { 
    activeBooking, 
    bookings, 
    techProgress, 
    startLocationSimulation, 
    inputOtp, 
    setInputOtp, 
    verifyOtp,
    completeActiveBooking,
    setCurrentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState<"jobs" | "schedule" | "wallet" | "profile">("jobs");

  // Mock available nearby job request if no active booking is present
  const availableJobRequest = {
    id: "HF-998811",
    title: "Loose Cabinet Hinge Alignment",
    distance: "1.2 km away",
    address: "Apt 203, Hitech Towers, Hyderabad",
    price: 349,
    duration: "30 mins",
    customer: "Sameer Kumar",
  };

  const handleAcceptDemoJob = () => {
    // We navigate to Booking Stepper or automatically set activeBooking mock
    // For demo purposes, we direct them to use the client booking stepper first, 
    // or let them know they can place a booking as a customer to see it here!
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 font-sans flex flex-col gap-8">
        
        {/* Top bar Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-brand-emerald/10 text-brand-emerald rounded-full">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold block">Today's Earnings</span>
              <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white block mt-0.5">Rs. 2,400</span>
            </div>
          </div>

          <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-full">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold block">Jobs Completed</span>
              <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white block mt-0.5">4 Jobs</span>
            </div>
          </div>

          <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-full">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold block">Acceptance Rate</span>
              <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white block mt-0.5">98%</span>
            </div>
          </div>

          <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-amber-100 text-amber-500 rounded-full">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold block">Average Rating</span>
              <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white block mt-0.5">4.9★</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-card border border-border p-5 rounded-cards shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-4 border-b border-border/40">
              <div className="w-12 h-12 rounded-full overflow-hidden border bg-neutral-200">
                <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop" alt="Aarav Sharma" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-bold text-sm block text-brand-navy dark:text-brand-white">Aarav Sharma</span>
                <span className="text-[10px] text-brand-dark dark:text-brand-gray">Verified Lead Partner</span>
              </div>
            </div>

            <nav className="flex flex-col gap-1.5">
              {[
                { id: "jobs", label: "Active Jobs", icon: ClipboardList },
                { id: "schedule", label: "Daily Schedule", icon: Calendar },
                { id: "wallet", label: "My Wallet", icon: Wallet },
                { id: "profile", label: "My Profile", icon: User }
              ].map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id as any)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-buttons text-xs font-bold transition-all text-left ${
                      activeTab === link.id
                        ? "bg-brand-blue text-white shadow-sm"
                        : "hover:bg-brand-blue/10 text-brand-dark dark:text-brand-gray"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Performance certifications badges */}
            <div className="pt-4 border-t border-border/40">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-dark dark:text-brand-gray block mb-2">Certifications</span>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue border border-brand-blue/15 text-[9px] font-bold rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Heavy Drill Certified
                </span>
                <span className="px-2.5 py-1 bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/15 text-[9px] font-bold rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Customer Elite
                </span>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-9 flex flex-col gap-6">
            
            {/* TAB: Jobs */}
            {activeTab === "jobs" && (
              <div className="flex flex-col gap-6">
                
                {activeBooking && activeBooking.status !== "completed" && activeBooking.status !== "cancelled" ? (
                  <div className="bg-card border border-brand-orange p-6 rounded-cards shadow-md flex flex-col gap-6">
                    
                    {/* Active job header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
                      <div>
                        <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Active Dispatch Mission
                        </span>
                        <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white mt-1">
                          {activeBooking.service.title}
                        </h3>
                        <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">
                          ID: <span className="font-mono text-brand-blue">{activeBooking.id}</span> • Customer: Charan Sai
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        {activeBooking.status === "en-route" && activeBooking.eta === 0 && (
                          <div className="flex items-center gap-2 p-2 bg-brand-navy/5 dark:bg-brand-navy/35 border rounded-md">
                            <Key className="w-4.5 h-4.5 text-brand-emerald" />
                            <input
                              type="text"
                              maxLength={4}
                              placeholder="Enter OTP"
                              value={inputOtp}
                              onChange={(e) => setInputOtp(e.target.value)}
                              className="w-20 text-center text-xs font-bold font-mono border-none outline-none dark:text-white"
                            />
                            <button
                              onClick={verifyOtp}
                              className="h-7 px-3 bg-brand-emerald text-white text-[10px] font-bold rounded-buttons shadow"
                            >
                              Verify
                            </button>
                          </div>
                        )}

                        {activeBooking.status === "in-progress" && (
                          <button
                            onClick={completeActiveBooking}
                            className="px-5 h-10 bg-brand-emerald text-white rounded-buttons text-xs font-bold shadow hover:opacity-90"
                          >
                            Finish Installation
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Routing milestones progress checklist */}
                    <div className="flex flex-col gap-3.5 text-xs font-bold">
                      <div className="flex items-center justify-between">
                        <span>Checklist Steps:</span>
                        <span className="text-brand-orange capitalize">{activeBooking.status}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                          onClick={startLocationSimulation}
                          disabled={activeBooking.status !== "assigned" && activeBooking.status !== "en-route"}
                          className={`p-3 rounded-buttons border flex items-center justify-between text-left ${
                            activeBooking.status === "en-route"
                              ? "bg-brand-blue/5 border-brand-blue text-brand-blue"
                              : "bg-card border-border/60 text-brand-dark dark:text-brand-gray"
                          }`}
                        >
                          <div>
                            <span className="block font-bold">1. En-Route Tracking</span>
                            <span className="text-[10px] font-normal block mt-0.5">ETA: {activeBooking.eta} min left</span>
                          </div>
                          <Play className="w-4 h-4 shrink-0" />
                        </button>

                        <div className={`p-3 rounded-buttons border text-left ${
                          activeBooking.eta === 0 && activeBooking.status === "en-route"
                            ? "border-brand-emerald bg-brand-emerald/5 text-brand-emerald"
                            : "border-border/60 text-brand-dark dark:text-brand-gray"
                        }`}>
                          <span className="block font-bold">2. Arrived & OTP Entry</span>
                          <span className="text-[10px] font-normal block mt-0.5">OTP: {activeBooking.otp}</span>
                        </div>

                        <div className={`p-3 rounded-buttons border text-left ${
                          activeBooking.status === "in-progress"
                            ? "border-brand-emerald bg-brand-emerald/5 text-brand-emerald"
                            : "border-border/60 text-brand-dark dark:text-brand-gray"
                        }`}>
                          <span className="block font-bold">3. Installation Work</span>
                          <span className="text-[10px] font-normal block mt-0.5">Tool kit verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Map and Chats split */}
                    {activeBooking.status === "en-route" && (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-2">
                        <div className="md:col-span-7">
                          <SimulatedMap />
                        </div>
                        <div className="md:col-span-5">
                          <ChatInterface />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Available job listing empty state */
                  <div className="flex flex-col gap-6">
                    <div className="p-6 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-cards border border-border/40 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange flex items-center gap-1">
                          <Compass className="w-4.5 h-4.5 animate-spin-slow" />
                          Nearby Service Request
                        </span>
                        <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">{availableJobRequest.distance}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-extrabold text-brand-navy dark:text-brand-white">{availableJobRequest.title}</h4>
                        <span className="text-xs text-brand-dark dark:text-brand-gray mt-1 block">Address: {availableJobRequest.address}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/30 pt-4 mt-2">
                        <div>
                          <span className="text-[10px] text-brand-dark dark:text-brand-gray block">Payout Earnings</span>
                          <span className="text-lg font-black font-mono text-brand-navy dark:text-brand-white">Rs. {availableJobRequest.price}</span>
                        </div>
                        <button
                          onClick={() => {
                            // Direct tech to booking tab or mock acceptance
                            alert("To simulate technician dispatch, first place a booking on the booking page stepper, then track it here!");
                            setCurrentRole("booking");
                          }}
                          className="h-10 px-5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-xs font-bold shadow"
                        >
                          Accept & Dispatch
                        </button>
                      </div>
                    </div>

                    <div className="p-8 text-center border-2 border-dashed border-border rounded-lg bg-card flex flex-col items-center gap-3">
                      <Wrench className="w-8 h-8 text-brand-blue" />
                      <span className="text-sm font-bold text-brand-navy dark:text-brand-white">Waiting for customer booking dispatches</span>
                      <p className="text-xs text-brand-dark dark:text-brand-gray max-w-sm">
                        Use the float dev switcher in the bottom-right to go to "Booking Stepper", place a TV Wall Mounting order, and it will immediately populate here.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB: Schedule */}
            {activeTab === "schedule" && (
              <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Daily Job Slots Schedule</h3>
                <div className="flex flex-col gap-3 text-xs text-brand-dark dark:text-brand-gray">
                  <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 border-l-4 border-brand-emerald rounded-r-md flex justify-between items-center">
                    <div>
                      <span className="font-bold text-brand-navy dark:text-brand-white block">TV Mounting Repair</span>
                      <span className="text-[10px] font-mono mt-0.5 block">09:00 AM - 10:15 AM • Completed</span>
                    </div>
                    <span className="font-bold font-mono text-brand-emerald">+Rs. 499</span>
                  </div>
                  <div className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 border-l-4 border-brand-emerald rounded-r-md flex justify-between items-center">
                    <div>
                      <span className="font-bold text-brand-navy dark:text-brand-white block">Cabinet Hinges Hanger</span>
                      <span className="text-[10px] font-mono mt-0.5 block">11:00 AM - 11:35 AM • Completed</span>
                    </div>
                    <span className="font-bold font-mono text-brand-emerald">+Rs. 249</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Wallet */}
            {activeTab === "wallet" && (
              <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Payout Earnings Wallet</h3>
                <div className="p-6 bg-brand-emerald/10 border border-brand-emerald/20 rounded-md flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray block uppercase">Withdrawable cash balance</span>
                    <span className="text-3xl font-black font-mono text-brand-navy dark:text-brand-white mt-1 block">Rs. 8,240</span>
                  </div>
                  <button className="h-10 px-5 bg-brand-emerald text-white rounded-buttons text-xs font-bold shadow">
                    Transfer to Bank
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Profile */}
            {activeTab === "profile" && (
              <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Partner Profile</h3>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold text-brand-navy dark:text-brand-white">Full Name</span>
                    <span>Aarav Sharma</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold text-brand-navy dark:text-brand-white">Registration ID</span>
                    <span>HF-PARTNER-88910</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold text-brand-navy dark:text-brand-white">Mobile Contact</span>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold text-brand-navy dark:text-brand-white">Base City Hub</span>
                    <span>Hyderabad (Hitech Sector)</span>
                  </div>
                </div>
              </div>
            )}

          </section>

        </div>

      </div>
    </PageLayout>
  );
}

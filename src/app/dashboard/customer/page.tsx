"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import SimulatedMap from "@/components/SimulatedMap";
import ChatInterface from "@/components/ChatInterface";
import { 
  User, Wallet, MapPin, Receipt, Bell, ShieldCheck, 
  HelpCircle, Settings, LogOut, ArrowRight, MessageSquare, 
  Activity, AlertTriangle, Key, Plus, FileText, CheckCircle2 
} from "lucide-react";

export default function CustomerDashboard() {
  const { 
    activeBooking, 
    bookings, 
    cancelActiveBooking, 
    walletBalance, 
    addWalletFunds, 
    notifications,
    setCurrentRole,
    setSelectedService,
    bookingForm
  } = useApp();

  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "wallet" | "addresses">("dashboard");
  const [walletInput, setWalletInput] = useState("");

  const handleQuickAddFunds = (amount: number) => {
    addWalletFunds(amount);
  };

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(walletInput);
    if (!isNaN(val) && val > 0) {
      addWalletFunds(val);
      setWalletInput("");
    }
  };

  const sidebarLinks = [
    { id: "dashboard", label: "Overview", icon: User },
    { id: "bookings", label: "My Bookings", icon: Activity },
    { id: "wallet", label: "My Wallet", icon: Wallet },
    { id: "addresses", label: "Saved Addresses", icon: MapPin }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 font-sans grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-card border border-border p-5 rounded-cards shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border/40">
            <div className="w-12 h-12 bg-brand-blue/15 text-brand-blue rounded-full flex items-center justify-center font-bold text-lg">
              CS
            </div>
            <div>
              <span className="font-bold text-sm block text-brand-navy dark:text-brand-white">Charan Sai</span>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray">Customer Account</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
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

          <div className="pt-4 border-t border-border/40 flex flex-col gap-2.5">
            <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold hover:text-brand-blue text-brand-dark dark:text-brand-gray text-left">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={() => setCurrentRole("landing")}
              className="flex items-center gap-3 px-4 py-2 text-xs font-bold hover:text-status-danger text-brand-dark dark:text-brand-gray text-left"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Dashboard Panel */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB: Overview / Dashboard */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              
              {/* Dynamic Active Booking Live Tracking Tracker HUD */}
              {activeBooking && activeBooking.status !== "completed" && activeBooking.status !== "cancelled" ? (
                <div className="bg-card border border-brand-blue p-6 rounded-cards shadow-md flex flex-col gap-6">
                  
                  {/* Status header bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4">
                    <div>
                      <span className="text-[10px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Active Service Dispatch
                      </span>
                      <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white mt-1">
                        Tracking Booking <span className="font-mono text-brand-blue">{activeBooking.id}</span>
                      </h3>
                      <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">
                        {activeBooking.service.title} • Scheduled for {activeBooking.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="p-3 bg-brand-emerald/10 border border-brand-emerald/25 rounded-md flex items-center gap-2">
                        <Key className="w-5 h-5 text-brand-emerald" />
                        <div>
                          <span className="text-[9px] uppercase font-bold text-brand-dark dark:text-brand-gray block tracking-wide">Secure Job OTP</span>
                          <span className="text-sm font-bold font-mono text-brand-navy dark:text-brand-white block -mt-1 tracking-widest">{activeBooking.otp}</span>
                        </div>
                      </div>
                      <button
                        onClick={cancelActiveBooking}
                        className="px-4 h-11 bg-status-danger/10 hover:bg-status-danger/15 text-status-danger rounded-buttons text-xs font-bold transition-all border border-status-danger/20"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Visual Stepper tracker bar */}
                  <div className="flex items-center justify-between px-2 text-[10px] uppercase font-bold text-brand-dark dark:text-brand-gray relative">
                    <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-200 dark:bg-brand-navy/60 -translate-y-1/2 z-0" />
                    {[
                      { name: "Accepted", active: ["assigned", "en-route", "in-progress"].includes(activeBooking.status) },
                      { name: "En Route", active: ["en-route", "in-progress"].includes(activeBooking.status) },
                      { name: "In Progress", active: ["in-progress"].includes(activeBooking.status) }
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] font-bold ${
                          step.active ? "bg-brand-blue border-brand-blue text-white" : "bg-card border-border text-brand-dark"
                        }`}>
                          {step.active ? "✓" : idx + 1}
                        </div>
                        <span>{step.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live SVG Map widget */}
                  {activeBooking.status === "en-route" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2 items-start">
                      <div className="md:col-span-7">
                        <SimulatedMap />
                      </div>
                      <div className="md:col-span-5">
                        <ChatInterface />
                      </div>
                    </div>
                  )}

                  {/* If assigned but not en route yet */}
                  {activeBooking.status === "assigned" && (
                    <div className="p-6 text-center border-2 border-dashed border-border rounded-lg bg-neutral-50 dark:bg-brand-navy/35 flex flex-col items-center gap-3">
                      <div className="animate-spin h-6 w-6 border-3 border-brand-blue border-t-transparent rounded-full" />
                      <span className="text-sm font-bold text-brand-navy dark:text-brand-white">Technician is preparing repair kits</span>
                      <p className="text-xs text-brand-dark dark:text-brand-gray max-w-sm">
                        Expert {activeBooking.technician?.name || "Aarav"} is matching brackets and anchors in our regional hub. Live tracking will display shortly.
                      </p>
                    </div>
                  )}

                  {/* If in progress */}
                  {activeBooking.status === "in-progress" && (
                    <div className="p-6 text-center border-2 border-dashed border-brand-emerald/30 rounded-lg bg-brand-emerald/5 flex flex-col items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-brand-emerald animate-pulse" />
                      <span className="text-sm font-bold text-brand-navy dark:text-brand-white">Repair in progress</span>
                      <p className="text-xs text-brand-dark dark:text-brand-gray max-w-sm">
                        Aarav Sharma is mounting your hardware. Once finished, payment billing deduction occurs automatically.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Empty state / Welcome */
                <div className="p-8 rounded-cards bg-gradient-to-br from-brand-blue to-brand-purple text-white flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md">
                  <div className="flex flex-col gap-2 max-w-md text-center sm:text-left">
                    <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider w-fit mx-auto sm:mx-0">
                      Welcome Back
                    </span>
                    <h2 className="text-2xl font-black">All Systems Functional</h2>
                    <p className="text-xs text-white/80 leading-normal">
                      What hardware repair or fixture setting can we help you coordinate today? Click below to book premium mounting experts.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedService({
                        id: "tv-mounting",
                        title: "Premium TV Mounting",
                        price: 499,
                        duration: "45-60 min",
                        category: "Hardware",
                        iconName: "Tv"
                      });
                      setCurrentRole("booking");
                    }}
                    className="h-12 px-6 bg-white hover:bg-neutral-50 text-brand-navy font-bold rounded-buttons shadow text-sm shrink-0 flex items-center gap-1.5 transition-all hover:scale-102"
                  >
                    Book New Fix
                    <ArrowRight className="w-4 h-4 text-brand-blue" />
                  </button>
                </div>
              )}

              {/* Wallet and Notifications dashboard summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Wallet Balance widget */}
                <div className="md:col-span-5 bg-card border border-border p-5 rounded-cards shadow-sm flex flex-col gap-4">
                  <h4 className="text-base font-extrabold text-brand-navy dark:text-brand-white flex items-center gap-2">
                    <Wallet className="w-4.5 h-4.5 text-brand-blue" />
                    Quick Wallet
                  </h4>
                  <div>
                    <span className="text-[10px] text-brand-dark dark:text-brand-gray block uppercase font-bold">Available balance</span>
                    <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white block mt-0.5">
                      Rs. {walletBalance}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 2000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleQuickAddFunds(amt)}
                        className="py-2 bg-brand-navy/5 dark:bg-brand-navy/35 hover:bg-brand-blue/15 text-[10px] font-bold rounded-buttons border border-border transition-colors text-brand-navy dark:text-brand-white"
                      >
                        +Rs. {amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notifications logs */}
                <div className="md:col-span-7 bg-card border border-border p-5 rounded-cards shadow-sm flex flex-col gap-4">
                  <h4 className="text-base font-extrabold text-brand-navy dark:text-brand-white flex items-center gap-2">
                    <Bell className="w-4.5 h-4.5 text-brand-blue" />
                    Service Updates ({notifications.length})
                  </h4>
                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[140px] pr-1">
                    {notifications.length === 0 ? (
                      <span className="text-xs text-brand-dark dark:text-brand-gray italic text-center py-6 block">No active alert logs.</span>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="text-xs p-2.5 rounded bg-brand-navy/5 dark:bg-brand-navy/35 border-l-4 border-brand-blue flex justify-between items-start gap-3">
                          <span className="text-brand-navy dark:text-brand-white font-medium leading-normal">{notif.message}</span>
                          <span className="text-[9px] text-brand-dark dark:text-brand-gray font-mono shrink-0 mt-0.5">{notif.timestamp}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Booking History logs list */}
              <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-extrabold text-brand-navy dark:text-brand-white">
                  Booking History logs ({bookings.length})
                </h3>
                {bookings.length === 0 ? (
                  <span className="text-xs text-brand-dark dark:text-brand-gray italic text-center py-8 block">No bookings found in this account profile.</span>
                ) : (
                  <div className="flex flex-col gap-3">
                    {bookings.map((b) => (
                      <div key={b.id} className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 flex items-center justify-between flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-md shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-brand-navy dark:text-brand-white block">{b.service.title}</span>
                            <span className="text-[10px] text-brand-dark dark:text-brand-gray font-mono mt-0.5 block">{b.id} • Scheduled {b.date} ({b.slot})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 font-bold">
                          <span className="font-mono text-brand-navy dark:text-brand-white">Rs. {b.total}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            b.status === "completed" 
                              ? "bg-brand-emerald/15 text-brand-emerald" 
                              : b.status === "cancelled"
                              ? "bg-status-danger/15 text-status-danger"
                              : "bg-brand-blue/15 text-brand-blue"
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: Bookings lists only */}
          {activeTab === "bookings" && (
            <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">All Repair Bookings</h3>
              <div className="flex flex-col gap-4">
                {bookings.length === 0 ? (
                  <span className="text-sm text-brand-dark dark:text-brand-gray italic text-center py-10 block">No bookings placed yet.</span>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 flex flex-col gap-4 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-base text-brand-navy dark:text-brand-white">{b.service.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                          b.status === "completed" ? "bg-brand-emerald/15 text-brand-emerald" : "bg-brand-blue/15 text-brand-blue"
                        }`}>{b.status}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-brand-dark dark:text-brand-gray">
                        <div>
                          <span className="font-bold block text-[10px] uppercase">Booking ID</span>
                          <span className="font-mono mt-0.5 block">{b.id}</span>
                        </div>
                        <div>
                          <span className="font-bold block text-[10px] uppercase">Slot Scheduled</span>
                          <span className="mt-0.5 block">{b.date} ({b.slot})</span>
                        </div>
                        <div>
                          <span className="font-bold block text-[10px] uppercase">Paid Amount</span>
                          <span className="font-mono mt-0.5 block">Rs. {b.total}</span>
                        </div>
                        <div>
                          <span className="font-bold block text-[10px] uppercase">Service Address</span>
                          <span className="mt-0.5 block truncate max-w-[120px]">{b.address}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: Wallet */}
          {activeTab === "wallet" && (
            <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Wallet Management</h3>
                <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Add cash or redeem gift coupons in your account.</p>
              </div>

              <div className="p-6 bg-brand-navy/5 dark:bg-brand-navy/35 rounded-md border border-border/40 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-brand-dark dark:text-brand-gray block uppercase">Wallet Cash Balance</span>
                  <span className="text-3xl font-black font-mono text-brand-navy dark:text-brand-white mt-1 block">Rs. {walletBalance}</span>
                </div>
                <div className="p-3 bg-brand-blue text-white rounded-full">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>

              <form onSubmit={handleAddFunds} className="flex gap-3">
                <input
                  type="number"
                  placeholder="Enter amount (Rs.)"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  className="flex-grow h-11 px-4 rounded-buttons border border-border text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue dark:bg-brand-navy/20 dark:text-white"
                />
                <button type="submit" className="h-11 px-6 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-sm font-bold shadow">
                  Add Funds
                </button>
              </form>
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === "addresses" && (
            <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Saved Addresses</h3>
              <div className="flex flex-col gap-3">
                <div className="p-4 rounded bg-brand-navy/5 dark:bg-brand-navy/35 border border-border/40 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-brand-navy dark:text-brand-white block">Home</span>
                    <span className="text-xs text-brand-dark dark:text-brand-gray mt-0.5 block">{bookingForm.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

      </div>
    </PageLayout>
  );
}

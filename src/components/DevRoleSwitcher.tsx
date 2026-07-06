"use client";

import React, { useState } from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { Layers, Monitor, ShoppingCart, User, Wrench, Shield, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DevRoleSwitcher() {
  const { currentRole, setCurrentRole, activeBooking } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    {
      role: "landing",
      label: "Public Website",
      icon: <Monitor className="w-4 h-4" />,
      color: "bg-brand-blue",
    },
    {
      role: "service",
      label: "Service Page",
      icon: <Layers className="w-4 h-4" />,
      color: "bg-brand-purple",
    },
    {
      role: "booking",
      label: "Booking Stepper",
      icon: <ShoppingCart className="w-4 h-4" />,
      color: "bg-brand-orange",
    },
    {
      role: "customer",
      label: "Customer Portal",
      icon: <User className="w-4 h-4" />,
      color: "bg-brand-emerald",
    },
    {
      role: "technician",
      label: "Technician App",
      icon: <Wrench className="w-4 h-4" />,
      color: "bg-status-warning",
    },
    {
      role: "admin",
      label: "Admin Dashboard",
      icon: <Shield className="w-4 h-4" />,
      color: "bg-status-danger",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 p-4 rounded-cards glass-light shadow-lg flex flex-col gap-2 min-w-[240px] text-text border border-border"
          >
            <div className="flex items-center justify-between border-b border-border pb-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-dark opacity-80 dark:text-brand-gray">
                Dev Environment Controls
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {roles.map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    setCurrentRole(item.role);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-buttons transition-all duration-150 group ${
                    currentRole === item.role
                      ? "bg-brand-blue text-white font-medium shadow-sm"
                      : "hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 text-text"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-sm text-white ${
                        currentRole === item.role ? "bg-white/20" : item.color
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {currentRole === item.role && (
                    <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full uppercase font-bold text-white tracking-wide">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>

            {activeBooking && (
              <div className="mt-2 pt-2 border-t border-border flex flex-col gap-1 text-[11px] text-brand-dark dark:text-brand-gray">
                <div className="flex items-center gap-1 font-semibold text-brand-blue">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Active Booking Simulation
                </div>
                <div className="flex justify-between mt-1">
                  <span>ID:</span>
                  <span className="font-mono font-medium text-text">{activeBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="capitalize font-semibold text-status-info dark:text-brand-sky">
                    {activeBooking.status}
                  </span>
                </div>
                {activeBooking.status === "en-route" && (
                  <div className="flex justify-between">
                    <span>ETA / Dist:</span>
                    <span className="font-mono font-medium">
                      {activeBooking.eta} min / {activeBooking.distance} km
                    </span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-4 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        title="Switch User Role Views"
        aria-label="Toggle role views menu"
      >
        <Layers className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
      </button>
    </div>
  );
}

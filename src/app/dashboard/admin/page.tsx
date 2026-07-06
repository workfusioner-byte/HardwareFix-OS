"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import { 
  ShieldAlert, ShieldCheck, TrendingUp, Users, DollarSign, Activity, 
  Map, FileText, Settings, Award, AlertCircle, RefreshCw, Star 
} from "lucide-react";

export default function AdminDashboard() {
  const { bookings, activeBooking, cancelActiveBooking, completeActiveBooking } = useApp();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "technicians">("overview");

  // Mock Admin Dashboard Analytics Metrics
  const metrics = {
    revenue: "Rs. 82,490",
    revenueGrowth: "+14.2% vs last week",
    activeJobs: 24,
    activeTechs: 182,
    complaintsCount: 2,
    rating: "4.9★"
  };

  // Mock revenue chart data points (month, revenue)
  const revenueChartData = [
    { label: "Jan", val: 32 },
    { label: "Feb", val: 40 },
    { label: "Mar", val: 55 },
    { label: "Apr", val: 48 },
    { label: "May", val: 70 },
    { label: "Jun", val: 82 }
  ];

  const handleForceCancel = () => {
    cancelActiveBooking();
  };

  const handleForceComplete = () => {
    completeActiveBooking();
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 font-sans grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-card border border-border p-5 rounded-cards shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border/40">
            <div className="w-12 h-12 bg-status-danger/10 text-status-danger rounded-full flex items-center justify-center font-bold text-lg">
              AD
            </div>
            <div>
              <span className="font-bold text-sm block text-brand-navy dark:text-brand-white">Admin Terminal</span>
              <span className="text-[10px] text-brand-dark dark:text-brand-gray">Super Administrator</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {[
              { id: "overview", label: "Operations Room", icon: Activity },
              { id: "bookings", label: "Bookings Ledger", icon: FileText },
              { id: "technicians", label: "Technician Fleet", icon: Users }
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
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB: Overview */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              
              {/* Core Analytics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-brand-blue" />
                    Gross Revenue
                  </span>
                  <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white mt-1">
                    {metrics.revenue}
                  </span>
                  <span className="text-[9px] text-brand-emerald font-bold">{metrics.revenueGrowth}</span>
                </div>

                <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-brand-blue" />
                    Active Bookings
                  </span>
                  <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white mt-1">
                    {metrics.activeJobs}
                  </span>
                  <span className="text-[9px] text-brand-dark dark:text-brand-gray font-semibold">Jobs in progress</span>
                </div>

                <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-orange" />
                    Fleet Size
                  </span>
                  <span className="text-xl font-black font-mono text-brand-navy dark:text-brand-white mt-1">
                    {metrics.activeTechs}
                  </span>
                  <span className="text-[9px] text-brand-emerald font-bold">142 online partners</span>
                </div>

                <div className="bg-card border border-border p-4.5 rounded-cards shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] text-brand-dark dark:text-brand-gray uppercase font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-status-danger" />
                    Complaints
                  </span>
                  <span className="text-xl font-black font-mono text-status-danger mt-1">
                    {metrics.complaintsCount}
                  </span>
                  <span className="text-[9px] text-brand-dark dark:text-brand-gray font-semibold">Response required</span>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Revenue Growth Trend Chart (Left 8 Cols) */}
                <div className="md:col-span-8 bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <h4 className="text-sm font-extrabold text-brand-navy dark:text-brand-white">Revenue Growth Trend</h4>
                      <p className="text-[10px] text-brand-dark dark:text-brand-gray">Monthly gross billing values (thousands Rs.)</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-brand-blue" />
                  </div>

                  {/* High Quality Styled Responsive SVG Chart */}
                  <div className="h-56 w-full flex items-end">
                    <svg viewBox="0 0 400 200" className="w-full h-full text-neutral-300 dark:text-brand-navy stroke-current stroke-[0.5] fill-transparent">
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="380" y2="20" className="stroke-neutral-200 dark:stroke-brand-navy/35" />
                      <line x1="40" y1="60" x2="380" y2="60" className="stroke-neutral-200 dark:stroke-brand-navy/35" />
                      <line x1="40" y1="100" x2="380" y2="100" className="stroke-neutral-200 dark:stroke-brand-navy/35" />
                      <line x1="40" y1="140" x2="380" y2="140" className="stroke-neutral-200 dark:stroke-brand-navy/35" />
                      <line x1="40" y1="180" x2="380" y2="180" className="stroke-neutral-200 dark:stroke-brand-navy/35" strokeWidth="1" />

                      {/* X and Y Axis Text Labels */}
                      <text x="15" y="24" className="fill-brand-dark dark:fill-brand-gray font-mono text-[9px] stroke-none">80K</text>
                      <text x="15" y="64" className="fill-brand-dark dark:fill-brand-gray font-mono text-[9px] stroke-none">60K</text>
                      <text x="15" y="104" className="fill-brand-dark dark:fill-brand-gray font-mono text-[9px] stroke-none">40K</text>
                      <text x="15" y="144" className="fill-brand-dark dark:fill-brand-gray font-mono text-[9px] stroke-none">20K</text>
                      <text x="15" y="184" className="fill-brand-dark dark:fill-brand-gray font-mono text-[9px] stroke-none">0K</text>

                      {/* Area Fill Gradient under Curve */}
                      <path
                        d="M 60 180 L 60 132 L 120 120 L 180 97 L 240 108 L 300 75 L 360 57 L 360 180 Z"
                        className="fill-brand-blue/10 dark:fill-brand-blue/5 stroke-none"
                      />

                      {/* Trend Curve Polyline */}
                      <path
                        d="M 60 132 L 120 120 L 180 97 L 240 108 L 300 75 L 360 57"
                        className="stroke-brand-blue fill-none stroke-[2.2] stroke-linecap-round"
                      />

                      {/* Coordinates Points Circular Badges */}
                      <circle cx="60" cy="132" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />
                      <circle cx="120" cy="120" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />
                      <circle cx="180" cy="97" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />
                      <circle cx="240" cy="108" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />
                      <circle cx="300" cy="75" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />
                      <circle cx="360" cy="57" r="3.5" className="fill-brand-blue stroke-white stroke-[1]" />

                      {/* Month Labels */}
                      {revenueChartData.map((d, idx) => (
                        <text
                          key={idx}
                          x={60 + idx * 60}
                          y="196"
                          textAnchor="middle"
                          className="fill-brand-dark dark:fill-brand-gray font-bold text-[8px] stroke-none"
                        >
                          {d.label}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Service Categories (Right 4 Cols) */}
                <div className="md:col-span-4 bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
                  <div className="pb-2 border-b">
                    <h4 className="text-sm font-extrabold text-brand-navy dark:text-brand-white">Category Demand</h4>
                    <p className="text-[10px] text-brand-dark dark:text-brand-gray">Top volume services today</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {[
                      { name: "TV Mounting", pct: 45, color: "bg-brand-blue" },
                      { name: "Furniture Assembly", pct: 30, color: "bg-brand-purple" },
                      { name: "Smart Locks", pct: 15, color: "bg-brand-orange" },
                      { name: "Other Hardware", pct: 10, color: "bg-brand-emerald" }
                    ].map((cat) => (
                      <div key={cat.name} className="flex flex-col gap-1 text-[11px]">
                        <div className="flex justify-between font-bold text-brand-navy dark:text-brand-white">
                          <span>{cat.name}</span>
                          <span>{cat.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-neutral-100 dark:bg-brand-navy/60 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Dispatch Override Console */}
              {activeBooking && (
                <div className="bg-card border border-brand-orange/40 p-5 rounded-cards shadow-sm flex flex-col gap-4">
                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-brand-white flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 text-brand-orange" />
                    Active Booking Override Terminal
                  </h4>
                  <div className="flex items-center justify-between flex-wrap gap-4 text-xs">
                    <div>
                      <span className="font-bold text-brand-navy dark:text-brand-white block">ID: {activeBooking.id} • {activeBooking.service.title}</span>
                      <span className="text-[10px] text-brand-dark dark:text-brand-gray mt-0.5 block">Current status: <span className="font-semibold text-brand-orange capitalize">{activeBooking.status}</span></span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleForceCancel}
                        className="px-4 h-9 bg-status-danger/10 hover:bg-status-danger/15 text-status-danger text-[11px] font-bold rounded-buttons border border-status-danger/15"
                      >
                        Force Cancel
                      </button>
                      <button
                        onClick={handleForceComplete}
                        className="px-4 h-9 bg-brand-emerald/10 hover:bg-brand-emerald/15 text-brand-emerald text-[11px] font-bold rounded-buttons border border-brand-emerald/15"
                      >
                        Force Complete
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: Bookings lists override table */}
          {activeTab === "bookings" && (
            <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Bookings Ledger</h3>
              <div className="flex flex-col gap-3">
                {bookings.length === 0 ? (
                  <span className="text-sm text-brand-dark dark:text-brand-gray italic text-center py-10 block">No system bookings records found.</span>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 border rounded-md flex items-center justify-between text-xs flex-wrap gap-4">
                      <div>
                        <span className="font-bold block text-sm text-brand-navy dark:text-brand-white">{b.service.title}</span>
                        <span className="text-[10px] text-brand-dark dark:text-brand-gray font-mono mt-0.5 block">ID: {b.id} • Total: Rs. {b.total}</span>
                        <span className="text-[9px] text-brand-dark dark:text-brand-gray block mt-0.5">Address: {b.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                          b.status === "completed" ? "bg-brand-emerald/15 text-brand-emerald" : "bg-brand-blue/15 text-brand-blue"
                        }`}>{b.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: Technicians */}
          {activeTab === "technicians" && (
            <div className="bg-card border border-border p-6 rounded-cards shadow-sm flex flex-col gap-4">
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Technician Fleet Roster</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Aarav Sharma", status: "Active (Assigned)", ratings: "4.9★", completed: 1240, photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=80&h=80" },
                  { name: "Vikram Malhotra", status: "Standby", ratings: "4.8★", completed: 850, photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80" },
                  { name: "Sai Kiran", status: "Standby", ratings: "4.7★", completed: 610, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80" }
                ].map((tech) => (
                  <div key={tech.name} className="p-4 bg-brand-navy/5 dark:bg-brand-navy/35 border border-border/40 rounded-md flex items-center gap-3 text-xs">
                    <img src={tech.photo} alt={tech.name} className="w-12 h-12 rounded-full object-cover border" />
                    <div>
                      <span className="font-bold text-brand-navy dark:text-brand-white block">{tech.name}</span>
                      <span className="text-[10px] text-brand-dark dark:text-brand-gray mt-0.5 block">Completed: {tech.completed} jobs • Rating: {tech.ratings}</span>
                      <span className="text-[9px] text-brand-blue font-semibold mt-1 block">{tech.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

      </div>
    </PageLayout>
  );
}

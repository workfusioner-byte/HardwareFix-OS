"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import PageLayout from "@/components/PageLayout";
import { 
  Check, Calendar, Clock, MapPin, Camera, ClipboardCheck, 
  CreditCard, ArrowLeft, ArrowRight, ShieldCheck, Tag, Sparkles 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingFlow() {
  const { 
    selectedService, 
    bookingStep, 
    setBookingStep, 
    bookingForm, 
    updateBookingForm, 
    createBooking, 
    walletBalance 
  } = useApp();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const stepsList = ["Setup", "Schedule", "Address", "Media", "Review", "Pay"];

  // Pricing calculations
  const prices = useMemo(() => {
    let basePrice = selectedService.price;
    if (bookingForm.tvSize === "55\" - 65\"") basePrice += 200;
    if (bookingForm.tvSize === "65\"+") basePrice += 400;
    if (bookingForm.wallType === "Concrete Wall") basePrice += 100;
    if (bookingForm.wallType === "Wooden Wall") basePrice += 150;
    
    let addonsPrice = 0;
    if (bookingForm.addons.includes("Cable Concealer")) addonsPrice += 199;
    if (bookingForm.addons.includes("Premium Bracket")) addonsPrice += 399;
    if (bookingForm.addons.includes("Extra Shelf")) addonsPrice += 299;
    
    const subtotal = basePrice + addonsPrice;
    
    let discount = 0;
    if (bookingForm.couponCode.toUpperCase() === "FIXFIRST") {
      discount = Math.round(subtotal * 0.15); // 15% discount
    }

    const tax = Math.round((subtotal - discount) * 0.18); // 18% GST
    const total = subtotal - discount + tax;

    return { basePrice, addonsPrice, subtotal, discount, tax, total };
  }, [selectedService.price, bookingForm.tvSize, bookingForm.wallType, bookingForm.addons, bookingForm.couponCode]);

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === "FIXFIRST") {
      updateBookingForm({ couponCode: "FIXFIRST" });
      setCouponSuccess("Promo code 'FIXFIRST' applied! 15% discount deducted.");
      setCouponError("");
    } else {
      setCouponError("Invalid promo code. Try 'FIXFIRST' for 15% off.");
      setCouponSuccess("");
    }
  };

  const handleNext = () => {
    if (bookingStep < 6) {
      setBookingStep(bookingStep + 1);
    } else {
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Submit booking
      createBooking();
    }
  };

  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-10 font-sans">
        
        {/* Stepper HUD Navigation Headers */}
        <div className="mb-10 w-full flex items-center justify-between relative select-none">
          {/* Progress bar line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-brand-navy/60 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-brand-blue -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((bookingStep - 1) / 5) * 100}%` }}
          />

          {stepsList.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = bookingStep === stepNum;
            const isCompleted = bookingStep > stepNum;
            return (
              <div key={step} className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                    isActive
                      ? "bg-brand-blue border-brand-blue text-white ring-4 ring-brand-blue/15"
                      : isCompleted
                      ? "bg-brand-emerald border-brand-emerald text-white"
                      : "bg-card border-border text-brand-dark dark:text-brand-gray"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive ? "text-brand-blue" : "text-brand-dark dark:text-brand-gray"
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form panel cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Fields (8 Cols) */}
          <div className="lg:col-span-8 bg-card p-6 rounded-cards border border-border shadow-md">
            
            {/* Step 1: Configs */}
            {bookingStep === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Configure Installation</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Define your wall materials and sizing parameters.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">Wall Material</span>
                    <select
                      value={bookingForm.wallType}
                      onChange={(e) => updateBookingForm({ wallType: e.target.value })}
                      className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option value="Brick Wall">Brick Wall (Standard)</option>
                      <option value="Concrete Wall">Concrete Wall (+Rs. 100)</option>
                      <option value="Wooden Wall">Wooden Wall (+Rs. 150)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray">TV Size Screen (Diagonal)</span>
                    <select
                      value={bookingForm.tvSize}
                      onChange={(e) => updateBookingForm({ tvSize: e.target.value })}
                      className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option value={"32\" - 43\""}>32" - 43" (Standard)</option>
                      <option value={"43\" - 55\""}>43" - 55" (Standard)</option>
                      <option value={"55\" - 65\""}>55" - 65" (+Rs. 200)</option>
                      <option value={"65\"+"}>65"+ (+Rs. 400)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Schedule */}
            {bookingStep === 2 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Appointment Schedule</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Select your booking appointment slot.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray flex items-center gap-1"><Calendar className="w-4 h-4 text-brand-blue" /> Date</span>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => updateBookingForm({ date: e.target.value })}
                      className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray flex items-center gap-1"><Clock className="w-4 h-4 text-brand-blue" /> Time Slot</span>
                    <select
                      value={bookingForm.slot}
                      onChange={(e) => updateBookingForm({ slot: e.target.value })}
                      className="h-11 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    >
                      <option>Morning (09:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 03:00 PM)</option>
                      <option>Evening (03:00 PM - 06:00 PM)</option>
                      <option>Night (06:00 PM - 09:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address */}
            {bookingStep === 3 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Service Address</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Please provide your precise service location.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-brand-dark dark:text-brand-gray flex items-center gap-1"><MapPin className="w-4 h-4 text-brand-blue" /> Address Line</span>
                    <textarea
                      value={bookingForm.address}
                      onChange={(e) => updateBookingForm({ address: e.target.value })}
                      rows={3}
                      className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-sm border border-border focus:outline-none focus:ring-1 focus:ring-brand-blue font-sans resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Media Upload */}
            {bookingStep === 4 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Hardware Damage Photo</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Upload a picture of the setup area to assist technicians with fasteners preparation.</p>
                </div>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-lg bg-brand-navy/5 dark:bg-brand-navy/20">
                  {bookingForm.photoUrl ? (
                    <div className="relative w-40 aspect-square rounded-md overflow-hidden border">
                      <img src={bookingForm.photoUrl} alt="Uploaded Issue" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => updateBookingForm({ photoUrl: null })}
                        className="absolute top-1.5 right-1.5 bg-brand-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-2">
                      <Camera className="w-8 h-8 text-brand-blue mb-1" />
                      <span className="text-sm font-bold text-brand-navy dark:text-brand-white">Drag and Drop your photo here</span>
                      <p className="text-[11px] text-brand-dark dark:text-brand-gray leading-normal">Or check our AI estimate section to choose a demo photo.</p>
                      <button 
                        onClick={() => updateBookingForm({ photoUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400" })}
                        className="mt-2 h-9 px-4 bg-brand-blue/15 hover:bg-brand-blue/20 text-brand-blue text-xs font-bold rounded-buttons"
                      >
                        Insert Mock Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {bookingStep === 5 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Review Summary</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Verify your details before scheduling billing charges.</p>
                </div>
                <div className="flex flex-col gap-3.5 text-sm text-brand-dark dark:text-brand-gray">
                  <div className="flex justify-between border-b pb-2.5">
                    <span className="font-semibold text-brand-navy dark:text-brand-white">Service:</span>
                    <span>{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2.5">
                    <span className="font-semibold text-brand-navy dark:text-brand-white">Date:</span>
                    <span>{bookingForm.date}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2.5">
                    <span className="font-semibold text-brand-navy dark:text-brand-white">Time Slot:</span>
                    <span className="truncate max-w-[200px]">{bookingForm.slot}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2.5">
                    <span className="font-semibold text-brand-navy dark:text-brand-white">Wall Material / TV Size:</span>
                    <span>{bookingForm.wallType} / {bookingForm.tvSize}</span>
                  </div>
                </div>

                {/* Coupon Code section */}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
                  <span className="text-xs font-bold text-brand-navy dark:text-brand-white flex items-center gap-1">
                    <Tag className="w-4 h-4 text-brand-blue" />
                    Apply Coupon
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Promo Code (e.g. FIXFIRST)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-grow h-10 px-3 bg-brand-navy/5 dark:bg-brand-navy/35 dark:text-white rounded-buttons text-xs border border-border uppercase"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="h-10 px-4 bg-brand-navy dark:bg-brand-blue hover:opacity-90 text-white rounded-buttons text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <span className="text-[10px] text-status-danger font-semibold">{couponError}</span>}
                  {couponSuccess && <span className="text-[10px] text-status-success font-semibold">{couponSuccess}</span>}
                </div>
              </div>
            )}

            {/* Step 6: Payment */}
            {bookingStep === 6 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-navy dark:text-brand-white">Select Payment Mode</h2>
                  <p className="text-xs text-brand-dark dark:text-brand-gray mt-0.5">Secure payment via simulated billing wallets.</p>
                </div>

                <div className="p-4 rounded-buttons border border-brand-emerald bg-brand-emerald/5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-emerald text-white rounded-full">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-brand-navy dark:text-brand-white block">HardwareFix Wallet</span>
                      <span className="text-[11px] text-brand-dark dark:text-brand-gray">Balance: Rs. {walletBalance}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-brand-emerald bg-brand-emerald/10 px-2.5 py-1 rounded-full uppercase">
                    Selected
                  </span>
                </div>

                {walletBalance < prices.total && (
                  <div className="text-xs text-status-danger bg-status-danger/10 border border-status-danger/25 p-3 rounded-buttons">
                    Insufficient wallet balance. Please jump to dashboards to add cash or proceed to trigger booking in demo sandbox mode.
                  </div>
                )}
              </div>
            )}

            {/* Form footer buttons */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-border/40">
              {bookingStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="h-11 px-5 border border-border hover:bg-neutral-50 dark:hover:bg-brand-navy/35 rounded-buttons text-xs font-bold text-brand-navy dark:text-brand-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                className="h-11 px-6 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-xs font-bold shadow flex items-center gap-1.5"
              >
                {bookingStep === 6 ? "Confirm Pay & Book" : "Next Step"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Sticky Summary Widget (4 Cols) */}
          <div className="lg:col-span-4 bg-card p-6 rounded-cards border border-border shadow-md sticky top-24 flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-brand-navy dark:text-brand-white pb-3 border-b border-border/40">
              Booking Summary
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-blue/15 text-brand-blue rounded-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold block text-brand-navy dark:text-brand-white">{selectedService.title}</span>
                <span className="text-[10px] text-brand-dark dark:text-brand-gray font-bold block">{selectedService.duration}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-brand-dark dark:text-brand-gray border-t border-border/40 pt-4">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span className="font-mono">Rs. {prices.basePrice}</span>
              </div>
              
              {prices.addonsPrice > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span className="font-mono">Rs. {prices.addonsPrice}</span>
                </div>
              )}

              {prices.discount > 0 && (
                <div className="flex justify-between text-brand-emerald font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-Rs. {prices.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span className="font-mono">Rs. {prices.tax}</span>
              </div>

              <div className="flex justify-between text-base font-black text-brand-navy dark:text-brand-white border-t border-border/40 pt-3 mt-1">
                <span>Total Amount</span>
                <span className="font-mono">Rs. {prices.total}</span>
              </div>
            </div>

            <div className="text-[10px] text-brand-dark dark:text-brand-gray bg-brand-navy/5 dark:bg-brand-navy/35 p-3 rounded-md flex items-start gap-1.5 mt-2">
              <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <span>Payments are processed with 256-bit bank level SSL encryption.</span>
            </div>
          </div>

        </div>

      </div>
    </PageLayout>
  );
}

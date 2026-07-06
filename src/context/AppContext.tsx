"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Types definition
export type UserRole = "landing" | "service" | "booking" | "customer" | "technician" | "admin";

export interface ServiceDetail {
  id: string;
  title: string;
  price: number;
  duration: string;
  category: string;
  iconName: string;
}

export interface Booking {
  id: string;
  service: ServiceDetail;
  address: string;
  date: string;
  slot: string;
  photoUrl: string | null;
  calculatorDetails: {
    wallType: string;
    tvSize: string;
    installationHeight: string;
    addons: string[];
  };
  couponCode: string | null;
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
  status: "pending" | "assigned" | "en-route" | "in-progress" | "completed" | "cancelled";
  technician: Technician | null;
  eta: number; // in minutes
  distance: number; // in km
  createdAt: string;
  otp: string;
}

export interface Technician {
  id: string;
  name: string;
  rating: number;
  jobsDone: number;
  experience: string;
  languages: string[];
  photo: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "technician";
  text: string;
  timestamp: string;
  mediaUrl?: string;
  isVoice?: boolean;
  duration?: string;
}

export interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info";
  message: string;
  timestamp: string;
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedService: ServiceDetail;
  setSelectedService: (service: ServiceDetail) => void;
  
  // Booking Stepper Form State
  bookingStep: number;
  setBookingStep: (step: number) => void;
  bookingForm: {
    address: string;
    date: string;
    slot: string;
    photoUrl: string | null;
    wallType: string;
    tvSize: string;
    installationHeight: string;
    addons: string[];
    couponCode: string;
  };
  updateBookingForm: (data: Partial<AppContextType["bookingForm"]>) => void;
  resetBookingForm: () => void;
  
  // Bookings list
  bookings: Booking[];
  activeBooking: Booking | null;
  setActiveBooking: (booking: Booking | null) => void;
  createBooking: () => void;
  cancelActiveBooking: () => void;
  completeActiveBooking: () => void;
  
  // Technician assignments
  availableTechnicians: Technician[];
  assignedTechnician: Technician | null;
  
  // Chat state
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, isVoice?: boolean, mediaUrl?: string) => void;
  
  // Simulated Location & Tracking state
  techProgress: number; // 0 to 100
  startLocationSimulation: () => void;
  stopLocationSimulation: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (type: Notification["type"], message: string) => void;
  clearNotifications: () => void;

  // Wallet
  walletBalance: number;
  addWalletFunds: (amount: number) => void;
  
  // OTP Verification
  inputOtp: string;
  setInputOtp: (otp: string) => void;
  verifyOtp: () => boolean;
}

// Initial Mock Technicians
const MOCK_TECHNICIANS: Technician[] = [
  {
    id: "tech-1",
    name: "Aarav Sharma",
    rating: 4.9,
    jobsDone: 1240,
    experience: "6 Years",
    languages: ["English", "Hindi", "Telugu"],
    photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop",
    phone: "+91 98765 43210",
    lat: 17.4483,
    lng: 78.3741,
  },
  {
    id: "tech-2",
    name: "Vikram Malhotra",
    rating: 4.8,
    jobsDone: 850,
    experience: "4 Years",
    languages: ["Hindi", "Bengali"],
    photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop",
    phone: "+91 87654 32109",
    lat: 17.4383,
    lng: 78.3841,
  },
  {
    id: "tech-3",
    name: "Sai Kiran",
    rating: 4.7,
    jobsDone: 610,
    experience: "3 Years",
    languages: ["Telugu", "English"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    phone: "+91 76543 21098",
    lat: 17.4583,
    lng: 78.3641,
  }
];

const DEFAULT_SERVICE: ServiceDetail = {
  id: "tv-mounting",
  title: "Premium TV Mounting",
  price: 499,
  duration: "45-60 min",
  category: "Hardware",
  iconName: "Tv"
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, _setCurrentRole] = useState<UserRole>("landing");
  const router = useRouter();

  const setCurrentRole = (role: UserRole) => {
    _setCurrentRole(role);
    if (role === "landing") router.push("/");
    else if (role === "service") router.push(`/services/${selectedService?.id || "tv-mounting"}`);
    else if (role === "booking") router.push("/booking");
    else if (role === "customer") router.push("/dashboard/customer");
    else if (role === "technician") router.push("/dashboard/technician");
    else if (role === "admin") router.push("/dashboard/admin");
  };

  const [selectedService, setSelectedService] = useState<ServiceDetail>(DEFAULT_SERVICE);
  
  // Stepper State
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingForm, setBookingForm] = useState({
    address: "Flat 402, Block A, Hitech Residency, Hitech City, Hyderabad, 500081",
    date: new Date().toISOString().split("T")[0],
    slot: "Morning (09:00 AM - 12:00 PM)",
    photoUrl: null as string | null,
    wallType: "Brick Wall",
    tvSize: "43\" - 55\"",
    installationHeight: "Eye Level (4-5 ft)",
    addons: [] as string[],
    couponCode: "",
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [techProgress, setTechProgress] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(1500);
  const [inputOtp, setInputOtp] = useState<string>("");

  const simIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateBookingForm = (data: Partial<typeof bookingForm>) => {
    setBookingForm((prev) => ({ ...prev, ...data }));
  };

  const resetBookingForm = () => {
    setBookingForm({
      address: "Flat 402, Block A, Hitech Residency, Hitech City, Hyderabad, 500081",
      date: new Date().toISOString().split("T")[0],
      slot: "Morning (09:00 AM - 12:00 PM)",
      photoUrl: null,
      wallType: "Brick Wall",
      tvSize: "43\" - 55\"",
      installationHeight: "Eye Level (4-5 ft)",
      addons: [],
      couponCode: "",
    });
    setBookingStep(1);
  };

  const addNotification = (type: Notification["type"], message: string) => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      type,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 20)); // Limit to 20
  };

  const clearNotifications = () => setNotifications([]);
  const addWalletFunds = (amount: number) => setWalletBalance((prev) => prev + amount);

  // Generate Booking details and trigger simulated dispatch flow
  const createBooking = () => {
    // Pricing calculation
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
      discount = Math.min(100, subtotal * 0.15); // 15% up to 100
    }
    const tax = Math.round((subtotal - discount) * 0.18); // 18% GST
    const total = subtotal - discount + tax;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Booking = {
      id: `HF-${Math.floor(100000 + Math.random() * 900000)}`,
      service: selectedService,
      address: bookingForm.address,
      date: bookingForm.date,
      slot: bookingForm.slot,
      photoUrl: bookingForm.photoUrl,
      calculatorDetails: {
        wallType: bookingForm.wallType,
        tvSize: bookingForm.tvSize,
        installationHeight: bookingForm.installationHeight,
        addons: bookingForm.addons,
      },
      couponCode: bookingForm.couponCode || null,
      discount,
      tax,
      subtotal,
      total,
      status: "pending",
      technician: null,
      eta: 25,
      distance: 5.4,
      createdAt: new Date().toLocaleString(),
      otp,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    setChatMessages([]);
    setTechProgress(0);
    setInputOtp("");

    addNotification("success", `Booking ${newBooking.id} placed successfully!`);
    
    // Automatically switch to customer view to track it
    setCurrentRole("customer");

    // Start background simulation flow
    triggerTechnicianAllocation(newBooking);
  };

  const cancelActiveBooking = () => {
    if (!activeBooking) return;
    const updated = { ...activeBooking, status: "cancelled" as const };
    setBookings((prev) => prev.map((b) => b.id === activeBooking.id ? updated : b));
    setActiveBooking(updated);
    stopLocationSimulation();
    addNotification("warning", `Booking ${activeBooking.id} has been cancelled.`);
  };

  const completeActiveBooking = () => {
    if (!activeBooking) return;
    const updated = { ...activeBooking, status: "completed" as const, eta: 0, distance: 0 };
    setBookings((prev) => prev.map((b) => b.id === activeBooking.id ? updated : b));
    setActiveBooking(updated);
    stopLocationSimulation();
    setWalletBalance((prev) => prev - activeBooking.total);
    addNotification("success", `Job ${activeBooking.id} completed. Rs. ${activeBooking.total} deducted from wallet.`);
  };

  const verifyOtp = () => {
    if (activeBooking && inputOtp === activeBooking.otp) {
      const updated = { ...activeBooking, status: "in-progress" as const };
      setBookings((prev) => prev.map((b) => b.id === activeBooking.id ? updated : b));
      setActiveBooking(updated);
      addNotification("success", "OTP Verified! Service started.");
      
      // Auto complete job after 15 seconds of work
      setTimeout(() => {
        completeActiveBooking();
      }, 15000);
      return true;
    }
    addNotification("error", "Invalid OTP. Please try again.");
    return false;
  };

  // Chat message support
  const sendChatMessage = (text: string, isVoice = false, mediaUrl?: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoice,
      mediaUrl,
      duration: isVoice ? "0:12" : undefined,
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Simulated reply from technician after 2.5 seconds
    if (activeBooking && activeBooking.status !== "completed") {
      setTimeout(() => {
        const replies = [
          "Yes, I understand. I'm carrying all required brackets and drilling tools.",
          "I will reach your building in about 10 minutes. Please keep the phone nearby.",
          "Got it. Is the wall concrete or brick? It will help me prepare the anchors.",
          "Awesome. I am on my way.",
          "I'm at the entry gate, getting security approval. I will be upstairs shortly."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const techMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          sender: "technician",
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, techMsg]);
        addNotification("info", `New message from ${activeBooking.technician?.name || "Technician"}`);
      }, 25000 / 10); // Simulated delay
    }
  };

  // Technician Allocation flow (Simulated)
  const triggerTechnicianAllocation = (b: Booking) => {
    // Step 1: Allocating a technician after 3 seconds
    setTimeout(() => {
      const assignedTech = MOCK_TECHNICIANS[0]; // Aarav Sharma
      const updated: Booking = {
        ...b,
        status: "assigned",
        technician: assignedTech,
      };
      
      setBookings((prev) => prev.map((item) => item.id === b.id ? updated : item));
      setActiveBooking(updated);
      addNotification("success", `${assignedTech.name} has been assigned to your booking!`);

      // Send initial text greeting from technician
      setTimeout(() => {
        const welcomeMsg: ChatMessage = {
          id: `msg-welcome`,
          sender: "technician",
          text: `Hi there! I am Aarav Sharma, your HardwareFix expert. I've accepted your booking for ${b.service.title}. I am preparing my tools and will start moving shortly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages([welcomeMsg]);
      }, 1500);

      // Step 2: En route after 8 seconds
      setTimeout(() => {
        setBookings((prev) => prev.map((item) => {
          if (item.id === b.id) {
            const enRouteBooking: Booking = { ...item, status: "en-route" };
            setActiveBooking(enRouteBooking);
            return enRouteBooking;
          }
          return item;
        }));
        addNotification("info", `Technician Aarav Sharma is en route to your address.`);
        
        // Start live location tracking simulation
        startLocationSimulation();
      }, 8000);

    }, 3000);
  };

  // Location Simulation loop
  const startLocationSimulation = () => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    
    setTechProgress(0);
    
    simIntervalRef.current = setInterval(() => {
      setTechProgress((prev) => {
        const nextProgress = prev + 5;
        if (nextProgress >= 100) {
          if (simIntervalRef.current) clearInterval(simIntervalRef.current);
          
          // Arrived!
          setBookings((prevBookings) => prevBookings.map((b) => {
            if (activeBooking && b.id === activeBooking.id) {
              const arrivedBooking: Booking = {
                ...b,
                status: "en-route", // keeps en-route until OTP is verified, but sets ETA to 0
                eta: 0,
                distance: 0,
              };
              // Note: activeBooking will be updated inside this state batch
              return arrivedBooking;
            }
            return b;
          }));

          // Send message
          setTimeout(() => {
            setChatMessages((prevMsg) => [
              ...prevMsg,
              {
                id: `msg-arrived-${Date.now()}`,
                sender: "technician",
                text: `I have arrived at your doorstep. Please share the 4-digit OTP: ${activeBooking?.otp || "----"} so I can start the work.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            ]);
            addNotification("warning", "Technician has arrived! Share OTP to begin repair.");
          }, 1000);

          return 100;
        }

        // Update ETA/distance in current booking
        setBookings((prevBookings) => prevBookings.map((b) => {
          if (activeBooking && b.id === activeBooking.id) {
            const progressRatio = nextProgress / 100;
            const newDistance = Math.max(0.1, Number((5.4 * (1 - progressRatio)).toFixed(1)));
            const newEta = Math.max(1, Math.round(25 * (1 - progressRatio)));
            
            const updatedBooking: Booking = {
              ...b,
              distance: newDistance,
              eta: newEta
            };
            
            setActiveBooking(updatedBooking);
            return updatedBooking;
          }
          return b;
        }));

        return nextProgress;
      });
    }, 3000); // Progresses 5% every 3 seconds (60 seconds full journey)
  };

  const stopLocationSimulation = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopLocationSimulation();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        selectedService,
        setSelectedService,
        bookingStep,
        setBookingStep,
        bookingForm,
        updateBookingForm,
        resetBookingForm,
        bookings,
        activeBooking,
        setActiveBooking,
        createBooking,
        cancelActiveBooking,
        completeActiveBooking,
        availableTechnicians: MOCK_TECHNICIANS,
        assignedTechnician: activeBooking?.technician || null,
        chatMessages,
        sendChatMessage,
        techProgress,
        startLocationSimulation,
        stopLocationSimulation,
        notifications,
        addNotification,
        clearNotifications,
        walletBalance,
        addWalletFunds,
        inputOtp,
        setInputOtp,
        verifyOtp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
}

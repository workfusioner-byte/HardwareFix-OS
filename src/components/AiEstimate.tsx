"use client";

import React, { useState, useEffect } from "react";
import { Upload, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface MockPhoto {
  id: string;
  name: string;
  url: string;
  detectedService: string;
  detectedPrice: number;
  confidence: number;
  serviceId: string;
}

const MOCK_PHOTOS: MockPhoto[] = [
  {
    id: "lock",
    name: "Jammed Main Lock",
    url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&auto=format&fit=crop&q=80",
    detectedService: "Main Door Deadbolt Lock Replacement",
    detectedPrice: 799,
    confidence: 97,
    serviceId: "locks",
  },
  {
    id: "tv",
    name: "Loose Wall Mount",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80",
    detectedService: "Premium TV Wall Mounting (43\"-55\")",
    detectedPrice: 499,
    confidence: 94,
    serviceId: "tv-mounting",
  },
  {
    id: "hinge",
    name: "Broken Cabinet Hinge",
    url: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=400&auto=format&fit=crop&q=80",
    detectedService: "Kitchen Cabinet Hinge Alignment & Repair",
    detectedPrice: 249,
    confidence: 91,
    serviceId: "kitchen-hardware",
  }
];

export default function AiEstimate() {
  const { setCurrentRole, setSelectedService, updateBookingForm } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState<MockPhoto | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: init, 2: scan, 3: analyze, 4: complete
  const [progressPercent, setProgressPercent] = useState(0);

  const scanStepsText = [
    "",
    "Loading image tensors...",
    "Scanning structural contours...",
    "Matching template hardware models...",
    "Estimate ready!"
  ];

  const handleSelectPhoto = (photo: MockPhoto) => {
    setSelectedPhoto(photo);
    setScanning(true);
    setScanStep(1);
    setProgressPercent(0);
  };

  useEffect(() => {
    if (!scanning) return;

    const progressInterval = setInterval(() => {
      setProgressPercent((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(progressInterval);
          setScanStep(4);
          setScanning(false);
          return 100;
        }
        
        // Dynamically increment step text
        if (next > 70) setScanStep(3);
        else if (next > 30) setScanStep(2);
        
        return next;
      });
    }, 80); // takes ~2 seconds to scan

    return () => clearInterval(progressInterval);
  }, [scanning]);

  const handleBookNow = () => {
    if (!selectedPhoto) return;
    
    // Set active service
    setSelectedService({
      id: selectedPhoto.serviceId,
      title: selectedPhoto.detectedService,
      price: selectedPhoto.detectedPrice,
      duration: "45-60 min",
      category: "Hardware",
      iconName: selectedPhoto.id === "tv" ? "Tv" : selectedPhoto.id === "lock" ? "Lock" : "Sliders"
    });

    // Populate mock uploaded photo in state
    updateBookingForm({
      photoUrl: selectedPhoto.url
    });

    setCurrentRole("booking");
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card p-6 lg:p-10 rounded-cards shadow-md border border-border">
      {/* Left Column: Mockup & Scanner (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-brand-navy/5 dark:bg-brand-black/20 rounded-lg min-h-[380px] relative overflow-hidden border border-border/40">
        
        {selectedPhoto ? (
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-md bg-black">
            <img
              src={selectedPhoto.url}
              alt="Scanning Hardware"
              className="w-full h-full object-cover"
            />

            {/* Glowing Laser Scan Bar */}
            {scanning && (
              <div 
                className="absolute left-0 right-0 h-1 bg-brand-emerald shadow-[0_0_12px_#10B981,0_0_24px_#10B981] z-15 transition-all duration-75 animate-bounce"
                style={{ top: `${progressPercent}%` }}
              />
            )}

            {/* Scanning Glass Overlay */}
            {scanning && (
              <div className="absolute inset-0 bg-brand-emerald/10 backdrop-blur-[1px] flex items-center justify-center flex-col gap-2">
                <div className="bg-brand-black/80 px-4 py-2 rounded-buttons text-white text-xs font-bold font-mono border border-brand-emerald flex items-center gap-2">
                  <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-emerald border-t-transparent rounded-full" />
                  {scanStepsText[scanStep]}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-brand-blue/30 rounded-lg max-w-sm w-full bg-card">
            <div className="p-4 bg-brand-blue/10 text-brand-blue rounded-full mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-brand-navy dark:text-brand-white">
              Scan Broken Hardware
            </span>
            <p className="text-xs text-brand-dark dark:text-brand-gray mt-1 leading-normal">
              Select one of the hardware repair examples below to test our neural image detection model.
            </p>
          </div>
        )}

        {/* Demo Options selectors */}
        <div className="w-full mt-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark dark:text-brand-gray block text-center mb-3">
            Choose a Demo Image to Scan
          </span>
          <div className="grid grid-cols-3 gap-3">
            {MOCK_PHOTOS.map((photo) => (
              <button
                key={photo.id}
                onClick={() => handleSelectPhoto(photo)}
                className={`p-2 rounded-buttons border flex flex-col items-center gap-2 transition-all duration-200 bg-card overflow-hidden group ${
                  selectedPhoto?.id === photo.id
                    ? "border-brand-blue ring-2 ring-brand-blue/20"
                    : "border-border hover:border-brand-blue/50"
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full aspect-square object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-[10px] font-bold truncate max-w-full text-brand-navy dark:text-brand-white">
                  {photo.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: AI Readout Details (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6 font-sans">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-emerald/10 text-brand-emerald rounded-full">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-emerald">
            AI Visual Estimate
          </span>
        </div>

        {selectedPhoto && scanStep === 4 ? (
          <div className="flex flex-col gap-5 animate-fade-in">
            <div>
              <span className="text-xs font-bold text-brand-dark dark:text-brand-gray block uppercase">
                Detected Hardware Fix
              </span>
              <h4 className="text-xl font-extrabold text-brand-navy dark:text-brand-white mt-1">
                {selectedPhoto.detectedService}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-brand-emerald/5 border border-brand-emerald/20 rounded-md">
                <span className="text-[10px] font-bold text-brand-emerald uppercase block">
                  Match Confidence
                </span>
                <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white mt-0.5 block">
                  {selectedPhoto.confidence}%
                </span>
              </div>
              <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-md">
                <span className="text-[10px] font-bold text-brand-blue uppercase block">
                  Estimated Price
                </span>
                <span className="text-2xl font-black font-mono text-brand-navy dark:text-brand-white mt-0.5 block">
                  Rs. {selectedPhoto.detectedPrice}
                </span>
              </div>
            </div>

            <div className="p-3 bg-brand-navy/5 dark:bg-brand-navy/35 border border-border/40 rounded-md flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
              <p className="text-xs text-brand-dark dark:text-brand-gray leading-normal">
                This image was processed locally. The pricing includes base installation and brackets. Taxes calculated at check out.
              </p>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full h-12 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-buttons text-sm font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
            >
              Book Detected Service
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : selectedPhoto && scanning ? (
          <div className="flex flex-col gap-4 py-8 items-center justify-center text-center">
            <span className="h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-brand-navy dark:text-brand-white mt-2">
              Processing Image...
            </span>
            <p className="text-xs text-brand-dark dark:text-brand-gray max-w-xs">
              Calculating edges, identifying textures, and matching structural anchors.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-6">
            <span className="text-sm font-bold text-brand-navy dark:text-brand-white">
              Instant AI Hardware Diagnosis
            </span>
            <p className="text-sm text-brand-dark dark:text-brand-gray leading-relaxed">
              No need to waste hours figuring out what part name you need. Just upload a photo of the damaged door, drawer hinge, lock, or empty wall. 
            </p>
            <ol className="flex flex-col gap-2 text-xs text-brand-dark dark:text-brand-gray list-decimal list-inside">
              <li>Upload or snap a photo of the repair issue.</li>
              <li>Our model checks coordinates and structural details.</li>
              <li>Instantly match repair category and display custom estimated rates.</li>
            </ol>
            <div className="flex items-center gap-2 text-xs text-brand-orange bg-brand-orange/10 p-3 rounded-md border border-brand-orange/20 mt-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Try scanning the demo locks or TV mount above.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

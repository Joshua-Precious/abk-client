import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import GlassyCard from "../ui/GlassyCard";

export default function RegistrationForm() {
  // Form state
  const [formData, setFormData] = useState({
    teamName: "",
    numberOfPeople: "",
    ageRange: "",
    briefDescription: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // 'success' or 'error'

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields: (keyof typeof formData)[] = [
      "teamName",
      "numberOfPeople",
      "ageRange",
      "fullName",
      "phoneNumber",
      "email",
      "city",
    ];
    return requiredFields.every((field) => formData[field].trim() !== "");
  };

  const setMessageWithTimeout = (
    message: string,
    status: string,
    duration: number,
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSubmitMessage(message);
    setSubmitStatus(status);
    timeoutRef.current = setTimeout(() => {
      setSubmitMessage("");
      setSubmitStatus("");
      timeoutRef.current = null;
    }, duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessageWithTimeout(
        "Please fill in all required fields",
        "error",
        5000,
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed");

      setFormData({
        teamName: "",
        numberOfPeople: "",
        ageRange: "",
        briefDescription: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        city: "",
      });

      setMessageWithTimeout(
        "Registration submitted successfully!",
        "success",
        5000,
      );
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";
      if (
        error.message?.includes("network") ||
        error.message?.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      }
      setMessageWithTimeout(errorMessage, "error", 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const gradientButtonStyle = {
    background:
      "linear-gradient(#05070a, #05070a) padding-box, linear-gradient(90deg, #ff3b00, #ff1f5b, #7a2cff, #00f0ff) border-box",
    border: "3px solid transparent",
  };

  return (
    <section
      id="register-section"
      className="relative py-12 md:py-16 flex justify-center w-full"
    >
      {/* Outer decorative background label */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 z-0 text-center pointer-events-none">
        <p className="text-white/5 font-black text-[8rem] lg:text-[12rem] leading-none tracking-tighter select-none uppercase">
          REGISTER
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-10 px-4">
        <GlassyCard className="relative p-6 sm:p-10 md:p-14 overflow-visible w-full">
          {/* Header stamp inside the card top-right */}
          <div className="absolute -top-8 -right-4 w-24 h-24 rounded-full bg-[#ff0000] border-4 border-[#cc0000] flex flex-col items-center justify-center text-white font-extrabold rotate-12 shadow-2xl z-20 transition-transform duration-300 hover:rotate-0">
            <span className="text-[9px] tracking-widest font-black">ABK</span>
            <span className="text-[12px] tracking-widest font-black">2026</span>
            <span className="text-[8px] tracking-[0.15em] mt-1 border-t border-white/40 pt-1 font-black">
              OFFICIAL
            </span>
          </div>

          {/* Form title block */}
          <div className="text-center mb-10">
            <div className="inline-block bg-[#ff0000] text-white font-black text-xs tracking-[0.3em] uppercase px-4 py-1.5 -rotate-1 mb-4 shadow-md">
              Accra's Boogie King 2026
            </div>
            <h1
              className="font-bold text-4xl sm:text-5xl text-[#f0b405] tracking-widest uppercase"
              style={{
                textShadow: "2px 2px 0px #000, 4px 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              REGISTER A TEAM
            </h1>
            <p className="text-white/60 text-sm md:text-base font-semibold mt-2">
              FILL IN THE FORM BELOW TO ENTER THE CHAMPIONSHIP
            </p>
            <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Status message */}
          {submitMessage && (
            <div
              className={`w-full mb-8 px-4 py-3 rounded-xl text-center font-bold text-sm transition-all animate-bounce ${
                submitStatus === "success"
                  ? "bg-green-500/20 text-green-200 border border-green-500/50"
                  : "bg-red-500/20 text-red-200 border border-red-500/50"
              }`}
            >
              {submitMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Information */}
            <div>
              <h3 className="text-lg font-black text-[#f0b405] tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                Team Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="Enter team name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Number of Members *
                  </label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="e.g. 5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Age Range *
                  </label>
                  <input
                    type="text"
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="e.g. 18-25"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="Enter your city"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                  Brief Description
                </label>
                <textarea
                  name="briefDescription"
                  value={formData.briefDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold resize-none"
                  placeholder="Tell us about your dance crew's style..."
                ></textarea>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-black text-[#f0b405] tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                Primary Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="Enter contact full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#f0b405] focus:ring-1 focus:ring-[#f0b405]/50 transition-all font-semibold"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group px-12 py-5 rounded-xl font-extrabold text-xl md:text-2xl text-white tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center min-w-[280px] md:min-w-[320px] shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed"
                style={gradientButtonStyle}
              >
                {isSubmitting ? (
                  <Icon
                    icon="lucide:loader-2"
                    className="w-6 h-6 animate-spin mx-auto text-[#f0b405]"
                  />
                ) : (
                  "SUBMIT ENTRY"
                )}
              </button>
            </div>
          </form>
        </GlassyCard>
      </div>
    </section>
  );
}

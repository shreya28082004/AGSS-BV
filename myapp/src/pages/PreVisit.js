
// src/pages/PreVisit.js

import React, { useState, useRef, useEffect } from "react";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

// Phone validation function
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15 && /^\d+$/.test(digits);
}

export default function PreVisit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  const [formData, setFormData] = useState({
    visitorName: "",
    studentName: "",
    studentId: "",
    visitorIdProof: "",
    reasonOfVisit: "",
    otherReason: "",
    phoneNumber: "",
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (registerRef.current && !registerRef.current.contains(event.target)) setRegisterOpen(false);
      if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const reasonOptions = [
    { value: "", label: "Select a reason" },
    { value: "Academic Inquiry", label: "Academic Inquiry" },
    { value: "Meet Child", label: "Meet Child" },
    { value: "Delivery / Parcel", label: "Delivery / Parcel" },
    { value: "Meeting Faculty", label: "Meeting Faculty" },
    { value: "Alumini", label: "Alumini" },
    { value: "Other", label: "Other" },
     // Added Alumini
  ];

  const phoneValid = validatePhone(formData.phoneNumber);
  const formValid =
    formData.visitorName.trim() &&
    formData.studentName.trim() &&
    formData.studentId.trim() &&
    formData.visitorIdProof.trim() &&
    formData.reasonOfVisit &&
    ((formData.reasonOfVisit === "Other" || formData.reasonOfVisit === "Alumini") ? formData.otherReason.trim() : true) &&
    phoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!formValid) return;

    console.log("Pre-Visit Form Data:", formData);
    alert("🎉 Pre-Visit form submitted successfully!");
    setFormData({
      visitorName: "",
      studentName: "",
      studentId: "",
      visitorIdProof: "",
      reasonOfVisit: "",
      otherReason: "",
      phoneNumber: "",
    });
    setSubmitAttempted(false);
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#f9ede3] via-[#f5e3d1] to-[#e7c9a9] flex flex-col">
      <HeaderNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        registerOpen={registerOpen}
        setRegisterOpen={setRegisterOpen}
        moreOpen={moreOpen}
        setMoreOpen={setMoreOpen}
        registerRef={registerRef}
        moreRef={moreRef}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-16 text-brown">
        <h2 className="text-4xl md:text-5xl mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] font-extrabold tracking-wide leading-relaxed pb-2">
          Pre-Visit Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-brown/20 p-12 md:p-14 rounded-3xl shadow-2xl space-y-8 max-w-3xl mx-auto hover:shadow-3xl transition-all duration-500"
        >
          {/* Visitor Name */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Visitor Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            {submitAttempted && !formData.visitorName.trim() && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          {/* Visitor ID Proof */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Visitor ID Proof <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="visitorIdProof"
              value={formData.visitorIdProof}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            {submitAttempted && !formData.visitorIdProof.trim() && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          {/* Reason of Visit */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Reason of Visit <span className="text-red-600">*</span>
            </label>
            <select
              name="reasonOfVisit"
              value={formData.reasonOfVisit}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300 bg-white"
            >
              {reasonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {submitAttempted && !formData.reasonOfVisit && (
              <p className="text-red-600 text-sm mt-1">Please select a reason</p>
            )}
          </div>

          {/* Other / Alumini Reason */}
          {(formData.reasonOfVisit === "Other" || formData.reasonOfVisit === "Alumini") && (
            <div>
              <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
                Please Specify <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="otherReason"
                value={formData.otherReason}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
              />
              {submitAttempted && !formData.otherReason.trim() && (
                <p className="text-red-600 text-sm mt-1">Please specify the reason</p>
              )}
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            {submitAttempted && !phoneValid && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid phone number (6-15 digits)</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-[#B8860B] via-[#8B5A2B] to-[#3E2723] text-cream font-bold rounded-full shadow-inner hover:bg-gradient-to-tr hover:scale-105 hover:shadow-[0_0_15px_rgba(139,90,43,0.5)] transition-all duration-500 tracking-wider"
          >
            Submit Form
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}


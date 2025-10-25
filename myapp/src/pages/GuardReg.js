// src/pages/GuardRegister.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
// Country code options
const countryOptions = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+61", name: "Australia" },
];

// Validation functions
function validateEmail(email) {
  if (!email) return true; // optional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15 && /^\d+$/.test(digits);
}

function passwordRules(password) {
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const score = Object.values(rules).filter(Boolean).length;
  return { rules, score };
}

export default function GuardRegister() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
  });

  const [touched, setTouched] = useState({});
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
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  // Validations
  const emailValid = validateEmail(formData.email);
  const phoneValid = validatePhone(formData.phone);
  const pw = passwordRules(formData.password);
  const passwordValid = pw.score === 4;

  const formValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    passwordValid &&
    phoneValid &&
    emailValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!formValid) return;

    // Demo: Replace with backend API call
    console.log("Guard Registration Data:", formData);
    alert("🎉 Guard registered successfully!");
    setFormData({ firstName: "", lastName: "", email: "", password: "", countryCode: "+91", phone: "" });
    setTouched({});
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
           
                 {/* Sidebar Overlay */}
                 {sidebarOpen && (
                   <div
                     className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                     onClick={() => setSidebarOpen(false)}
                   ></div>
                 )}
           
                 {/* Sidebar */}
                 <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-16 text-brown">
        <h2 className="text-4xl md:text-5xl mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] font-extrabold tracking-wide leading-relaxed pb-2">
          Guard Registration Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-brown/20 p-12 md:p-14 rounded-3xl shadow-2xl space-y-8 max-w-3xl mx-auto hover:shadow-3xl transition-all duration-500"
        >
          {/* First Name */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
          </div>

          {/* Email (optional) */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            {submitAttempted && formData.email && !emailValid && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            <ul className="text-sm text-red-600 mt-1 list-disc ml-5">
              {!pw.rules.length && <li>Minimum 8 characters</li>}
              {!pw.rules.uppercase && <li>At least one uppercase letter</li>}
              {!pw.rules.number && <li>At least one number</li>}
              {!pw.rules.special && <li>At least one special character</li>}
            </ul>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-3 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70"
              >
                {countryOptions.map((c) => (
                  <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="flex-grow px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
              />
            </div>
            {submitAttempted && !phoneValid && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid phone number.</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-[#B8860B] via-[#8B5A2B] to-[#3E2723]
             text-cream font-bold rounded-full shadow-inner
             hover:bg-gradient-to-tr hover:scale-105 hover:shadow-[0_0_15px_rgba(139,90,43,0.5)]
             transition-all duration-500 tracking-wider"
          >
            Register
          </button>
        </form>
      </main>
      {/* Footer */}
<footer className="bg-gradient-to-r from-brown to-brown/90 text-cream mt-16 relative overflow-hidden">
  {/* Decorative subtle shapes */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-cream/10 rounded-full blur-3xl animate-pulse-slow"></div>
  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cream/10 rounded-full blur-3xl animate-pulse-slow"></div>

  <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 relative z-10">
    {/* About / Branding */}
    <div className="space-y-4">
      <h2 className="text-3xl font-extrabold tracking-wide">RAKSHAPEETH</h2>
      <p className="text-cream/80">
        Automated Gate Security System for Banasthali Vidyapith.
      </p>
    </div>

    {/* Quick Links */}
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Quick Links</h3>
      <ul className="space-y-1">
        <li>
          <a href="#" className="hover:text-yellow-300 transition-all duration-300">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300 transition-all duration-300">About</a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300 transition-all duration-300">Register</a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-300 transition-all duration-300">Contact Us</a>
        </li>
      </ul>
    </div>

    {/* Contact / Social */}
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Connect</h3>
      <p>Email: info@rakshapeeth.com</p>
      <p>Phone: +91 12345 67890</p>
      <div className="flex space-x-4 mt-3">
        <a
          href="#"
          className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110"
        >
          🐦
        </a>
        <a
          href="#"
          className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110"
        >
          🔗
        </a>
        <a
          href="#"
          className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110"
        >
          📘
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-cream/40 mt-6 py-4 text-center text-cream/70 relative z-10">
    © {new Date().getFullYear()} RAKSHAPEETH. All rights reserved.
  </div>
</footer>

    </div>
  );
}

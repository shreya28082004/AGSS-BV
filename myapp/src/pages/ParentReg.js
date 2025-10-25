// src/pages/ParentRegister.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
const countryOptions = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  // add more as needed
];

function validateEmail(email) {
  // reasonable RFC-like check (not perfect but good)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function validatePhone(countryCode, phone) {
  // strip non-digits and minimum 6 to maximum 15 digits (international)
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
  const passed = Object.values(rules).filter(Boolean).length;
  // strength: 0..4
  return { rules, score: passed };
}

export default function ParentRegister() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setRegisterOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const emailValid = validateEmail(formData.email);
  const phoneValid = validatePhone(formData.countryCode, formData.phone);
  const pw = passwordRules(formData.password);
  const passwordValid = pw.score === 4; // all rules passed

  const formValid = emailValid && phoneValid && passwordValid && formData.firstName.trim().length > 0 && formData.lastName.trim().length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((s) => ({ ...s, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!formValid) {
      // highlight and stop
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // For demo only: DO NOT store password in frontend local storage or logs in production.
    // We will send the raw password over HTTPS to backend, which must hash it server-side.
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: `${formData.countryCode}-${formData.phone.replace(/\D/g, "")}`,
      password: formData.password,
    };

    try {
      // Example POST to backend. Replace URL with your backend endpoint.
      const res = await fetch("/api/parent/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Registration failed: " + (err.message || "Server error"));
        return;
      }

      // successful
      alert("🎉 Parent registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "+91",
        phone: "",
      });
      setTouched({});
      setSubmitAttempted(false);
    } catch (error) {
      console.error("Register error:", error);
      alert("Network error. Please try again later.");
    }
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
        <h2
          className="text-4xl md:text-5xl mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] font-extrabold tracking-wide leading-relaxed pb-2"
          style={{ overflow: "visible" }}
        >
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="bg-brown/20 p-12 md:p-14 rounded-2xl shadow-2xl space-y-8 max-w-3xl mx-auto" noValidate>
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              First Name<span className="text-red-600">*</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            { (touched.firstName || submitAttempted) && formData.firstName.trim().length === 0 && (
              <p className="text-red-600 text-sm mt-1">First name is required.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            { (touched.lastName || submitAttempted) && formData.lastName.trim().length === 0 && (
              <p className="text-red-600 text-sm mt-1">Last name is required.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
            { (touched.email || submitAttempted) && !emailValid && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid email address.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
              autoComplete="new-password"
            />
            <div className="mt-2 space-y-1">
              <div className="text-sm">Password strength: <strong>{["Very weak","Weak","Okay","Good","Strong"][pw.score]}</strong></div>
              <ul className="text-sm ml-4 list-disc text-brown/70">
                <li className={pw.rules.length ? "text-green-700" : "text-red-600"}>Minimum 8 characters</li>
                <li className={pw.rules.uppercase ? "text-green-700" : "text-red-600"}>At least one uppercase letter</li>
                <li className={pw.rules.number ? "text-green-700" : "text-red-600"}>At least one number</li>
                <li className={pw.rules.special ? "text-green-700" : "text-red-600"}>At least one special character</li>
              </ul>
              { (touched.password || submitAttempted) && !passwordValid && (
                <p className="text-red-600 text-sm mt-1">Password does not meet all requirements.</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">Phone Number<span className="text-red-600">*</span></label>
            <div className="flex gap-3">
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
              />
            </div>
            { (touched.phone || submitAttempted) && !phoneValid && (
              <p className="text-red-600 text-sm mt-1">Please enter a valid phone number for the selected country code.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!formValid}
            className={`w-full py-3 ${
              formValid ? "bg-gradient-to-br from-[#B8860B] via-[#8B5A2B] to-[#3E2723] hover:scale-105" : "bg-brown/40 cursor-not-allowed"
            } text-cream font-bold rounded-full shadow-inner transition-all duration-500 tracking-wider`}
          >
            Register
          </button>

          {!formValid && submitAttempted && (
            <p className="text-red-600 text-sm text-center">Please fix the errors above before submitting.</p>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brown to-brown/90 text-cream mt-16 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cream/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cream/10 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-wide">RAKSHAPEETH</h2>
            <p className="text-cream/80">Automated Gate Security System for Banasthali Vidyapith.</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-yellow-300 transition-all duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 transition-all duration-300">About</Link></li>
              <li><a href="#" className="hover:text-yellow-300 transition-all duration-300">Register</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-all duration-300">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Connect</h3>
            <p>Email: info@rakshapeeth.com</p>
            <p>Phone: +91 12345 67890</p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110">🐦</a>
              <a href="#" className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110">🔗</a>
              <a href="#" className="p-2 bg-cream/20 rounded-full hover:bg-cream/50 text-brown shadow-lg transition-all duration-300 hover:scale-110">📘</a>
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

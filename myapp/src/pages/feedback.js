import React, { useState, useEffect, useRef } from "react";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function ParentRegister() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (registerRef.current && !registerRef.current.contains(event.target)) setRegisterOpen(false);
      if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", feedbackType: "Suggestion", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: e.target.value ? "" : `${e.target.name} is required` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    alert("🎉 Thank you for your feedback!");
    setFormData({ name: "", email: "", feedbackType: "Suggestion", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f0e3] via-[#f1e0ca] to-[#e7c9a9] flex flex-col relative">
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

      {/* Navbar */}
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

      {/* Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)}></div>}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
<main className="flex-grow flex flex-col justify-center items-center px-4 py-16">
  <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] mb-10 drop-shadow-lg">
    Feedback Form
  </h1>

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-3xl md:max-w-4xl bg-cream/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 md:p-12 space-y-6 border border-brown/30"
  >
    {/* Name */}
    <div className="relative">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className={`w-full px-4 py-3 rounded-xl border border-brown/40 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm hover:shadow-md transition duration-300 ${
          errors.name ? "border-red-500" : ""
        }`}
      />
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
    </div>

    {/* Email */}
    <div className="relative">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={`w-full px-4 py-3 rounded-xl border border-brown/40 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm hover:shadow-md transition duration-300 ${
          errors.email ? "border-red-500" : ""
        }`}
      />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>

    {/* Feedback Type */}
    <div>
      <select
        name="feedbackType"
        value={formData.feedbackType}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl border border-brown/40 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm hover:shadow-md transition duration-300 bg-white"
      >
        <option>Suggestion</option>
        <option>Bug Report</option>
        <option>Compliment</option>
        <option>Other</option>
      </select>
    </div>

    {/* Message */}
    <div className="relative">
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        placeholder="Your feedback..."
        className={`w-full px-4 py-3 rounded-xl border border-brown/40 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm hover:shadow-md transition duration-300 ${
          errors.message ? "border-red-500" : ""
        } bg-white`}
      ></textarea>
      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
    </div>

    {/* Submit */}
    <button className="w-full py-3 bg-gradient-to-br from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(139,90,43,0.5)] transition-all duration-500">
      Submit Feedback
    </button>
  </form>
</main>

      <Footer />
    </div>
  );
}

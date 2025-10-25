// src/pages/ParentRegister.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ParentRegister() {
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
    phone: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent Registration Data:", formData);
    alert("🎉 Parent registered successfully!");
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#f9ede3] via-[#f5e3d1] to-[#e7c9a9] flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-brown text-white flex justify-between items-center px-6 py-3 shadow-lg z-50">
        <div className="flex items-center space-x-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-10 w-10 bg-cream text-brown font-bold flex items-center justify-center rounded-md hover:bg-cream-200 transition"
          >
            ▣
          </button>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="font-semibold hover:text-cream-200 transition">Home</Link>
            <Link to="/about" className="hover:text-yellow-300 transition-all duration-300">About</Link>

            {/* Register Dropdown */}
            <div className="relative" ref={registerRef}>
              <button
                onClick={() => setRegisterOpen(!registerOpen)}
                className="font-semibold hover:text-cream-200 transition"
              >
                Register ▾
              </button>
              <div
                className={`absolute mt-2 rounded shadow-lg w-32 bg-white text-brown overflow-hidden transition-all duration-300 transform origin-top ${
                  registerOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              >
                <Link to="/GuardRegister" className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition">Guard</Link>
                <Link to="/ParentRegister" className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition">Parent</Link>
              </div>
            </div>

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="font-semibold hover:text-cream-200 transition"
              >
                More ▾
              </button>
              <div
                className={`absolute mt-2 rounded shadow-lg w-40 bg-white text-brown overflow-hidden transition-all duration-300 transform origin-top ${
                  moreOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                }`}
              >
                <a href="#" className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition">Feedback</a>
                <a href="#" className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition">Customer Care</a>
                <a href="#" className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition">Contact Us</a>
              </div>
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-cream-200"
        />
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-brown/95 text-white shadow-lg p-5 space-y-4 transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 border-b border-cream-200 pb-2">Menu</h2>
        <Link className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" to="/">Home</Link>
        <Link className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" to="/about">About</Link>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">Guard</a>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">Parent</a>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">Pre-Visit Form</a>
        <button
          onClick={() => setSidebarOpen(false)}
          className="mt-6 px-4 py-2 bg-cream text-brown rounded hover:bg-cream-200 transition"
        >
          Close
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-16 text-brown">
        <h2
  className="text-4xl md:text-5xl mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#C79A63] via-[#8B5E3C] to-[#4B2E1E] font-extrabold tracking-wide leading-relaxed pb-2"
  style={{ overflow: 'visible' }}
>
  Registration Form
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
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
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
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-sm uppercase tracking-wider text-brown/80">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-brown/50 focus:outline-none focus:ring-2 focus:ring-brown/70 shadow-sm hover:shadow-md transition duration-300"
            />
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
              <li><Link to="/ParentRegister" className="hover:text-yellow-300 transition-all duration-300">Register</Link></li>
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

// src/pages/HomePage.js
import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";
import gateImg from "../assets/gate.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import SecureEntryVideo from "../assets/Secure_Entry_Demo.mp4";
import NotifyVideo from "../assets/Notify.mp4"; 
import VehicleVideo from "../assets/veh.mp4";
export default function HomePage() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-cream to-cream/90">
      {/* Top Hero Section */}
      <header className="relative bg-brown bg-opacity-90">
        
        <div className="max-w-7xl mx-auto flex items-center px-6 py-10 md:py-6 space-x-32">
          {/* Big Logo */}
          <img
            src={Logo}
            alt="Logo"
            className="h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-cream shadow-lg transform hover:scale-105 transition-transform duration-500"
          />
      {/* Heading */}
<div className="flex flex-col items-center md:items-start relative">
  <h1
    className="
      text-6xl md:text-8xl font-extrabold text-cream tracking-widest
      text-center md:text-left
      font-[Bebas\ Neue]
      relative
      transition-transform duration-500 hover:scale-105
    "
    style={{
      textShadow: `
        2px 2px 0px #8B6B4F,
        4px 4px 0px #7A5940,
        6px 6px 10px rgba(107,79,59,0.5)
      `
    }}
  >
    RAKSHAPEETH
    {/* Subtle shiny overlay */}
    <span className="
      absolute top-0 left-0 w-full h-full
      bg-gradient-to-r from-white/40 via-white/10 to-white/40
      opacity-30 animate-[shine_2s_linear_infinite]
      pointer-events-none
    "></span>
  </h1>

  {/* Optional subtle underline */}
  <div className="mt-2 w-32 h-1 rounded-full bg-cream/70 animate-pulse"></div>
</div>

        </div>
      </header>

      {/* Navbar */}
<nav className="sticky top-0 w-full bg-brown text-white flex justify-between items-center px-6 py-3 shadow-lg z-50">
  <div className="flex items-center space-x-10">
    {/* Sidebar Button */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="h-10 w-10 bg-cream text-brown font-bold flex items-center justify-center rounded-md hover:bg-cream-200 transition"
    >
      ▣
    </button>

    {/* Desktop Links */}
    <div className="hidden md:flex space-x-8">
      <a href="#" className="font-semibold hover:text-cream-200 transition">
        Home
      </a>
      
      <Link
  to="/about"
  className="font-semibold hover:text-cream-200 transition"
>
  About
</Link>

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
    <Link
      to="/GuardRegister"
      className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition"
    >
      Guard
    </Link>
    <Link
      to="/ParentRegister"
      className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition"
    >
      Parent
    </Link>
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
          <a
            className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition"
            href="#"
          >
            Feedback
          </a>
          <a
            className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition"
            href="#"
          >
            Customer Care
          </a>
          <a
            className="block px-4 py-2 hover:bg-cream-200 hover:text-brown-900 transition"
            href="#"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Search input */}
  <input
    type="text"
    placeholder="Search..."
    className="hidden md:block px-3 py-1 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-cream-200"
  />
</nav>
{/*background img*/}
<div className="w-full h-[680px] bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${gateImg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      </div>
{/*back img end*/}
      {/* Left Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-brown/95 text-white shadow-lg p-5 space-y-4 transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 border-b border-cream-200 pb-2">
          Menu
        </h2>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">
          Admin
        </a>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">
          Guard
        </a>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">
          Parent
        </a>
        <a className="block py-2 px-3 rounded hover:bg-cream-200 hover:text-brown-900 transition" href="#">
          Pre-Visit Form
        </a>
        <button
          onClick={() => setSidebarOpen(false)}
          className="mt-6 px-4 py-2 bg-cream text-brown rounded hover:bg-cream-200 transition"
        >
          Close
        </button>
      </div>
       {/*sidebar ends*/} 
      {/* Hero / CTA Section */}
      <main className="p-10 md:p-20 text-brown">
        <div className="bg-cream rounded-3xl shadow-2xl p-10 text-center space-y-6 mt-10 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-5xl md:text-6xl font-extrabold">Welcome to AGSS-BV</h1>
          <p className="text-xl md:text-2xl">
            Automated Gate Security System for Banasthali Vidyapith
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-brown to-brown/80 text-cream rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all duration-500">
            Get Started
          </button>
        </div>

       {/* Features / Info Cards */}
<div className="mt-16 grid md:grid-cols-3 gap-10">
  {[
    {
      title: "Secure Entry",
      desc: "Biometric and ID-based student and visitor verification.",
      icon: "🔒",
      link: "/secure-entry",
      video: SecureEntryVideo
    },
    {
      title: "Smart Notifications",
      desc: "Parents get instant alerts when students exit or enter campus.",
      icon: "📲",
      link: "/notify",
      video: NotifyVideo
    },
    {
      title: "Vehicle Management",
      desc: "Automated gate control and whitelist management for vehicles.",
      icon: "🚗",
      link: "/vehicle",
      video: VehicleVideo
    },
  ].map((feature, idx) => (
    <div
      key={idx}
      onClick={() => feature.link && navigate(feature.link)} // Navigate if link exists
      className="cursor-pointer bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500 text-center"
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
      <p>{feature.desc}</p>
    </div>
  ))}
</div>
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

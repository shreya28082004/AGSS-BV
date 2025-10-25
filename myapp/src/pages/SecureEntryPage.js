// src/pages/HomePage.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import videoFile from "../assets/Secure_Entry_Demo.mp4";

export default function SecurePage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  // Close dropdowns on outside click
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
    <div className="min-h-screen font-sans bg-gradient-to-b from-cream to-cream/90 relative">
      {/* Header + Navbar */}
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
      <main className="p-6 md:p-12 max-w-7xl mx-auto bg-gradient-to-br from-cream/95 to-cream/90 rounded-3xl shadow-2xl overflow-hidden relative mt-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
          {/* Video */}
          <div className="w-full md:w-1/2 flex justify-center">
            <video
              src={videoFile}
              controls
              className="w-full max-w-[350px] md:max-w-full aspect-[9/16] rounded-3xl shadow-2xl border-4 border-cream hover:scale-105 transform transition-all duration-500"
            />
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 text-brown space-y-6 text-justify">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-center md:text-left relative">
              Secure Entry
              <span className="block h-1 w-24 bg-gradient-to-r from-brown to-brown/70 rounded-full mt-2 mx-auto md:mx-0 animate-pulse-slow"></span>
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-brown/90 first-letter:text-6xl first-letter:font-bold first-letter:text-brown/80 first-letter:mr-2">
              At <span className="font-semibold">Banasthali Vidyapith</span>, the <span className="font-semibold text-brown">Automated Gate Security System (AGSS-BV)</span> ensures a <span className="italic text-brown/80">safe, seamless, and futuristic</span> entry experience.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-brown/90">
              When a student approaches, their <span className="font-semibold">ID card</span> is instantly scanned to retrieve their profile from our secure database.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-brown/90">
              Next, a state-of-the-art <span className="font-semibold">iris scan</span> is performed, adding a <span className="italic text-brown/80">second layer of ultra-secure verification</span>.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-brown/90">
              This <span className="font-semibold text-brown">dual-layer authentication</span> system ensures fast, contactless, and reliable access while maintaining strict control.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-brown/90">
              Watch the video to see the verification process, automatic gate opening, and real-time notifications to parents.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-8 py-3 bg-brown text-cream rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:bg-gradient-to-r from-brown/90 to-brown/70 transition-all duration-300 font-semibold"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

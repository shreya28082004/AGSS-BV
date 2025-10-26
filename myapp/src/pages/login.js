import React, { useState, useRef } from "react";
import HeaderNavbar from "../components/HeaderNavbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const registerRef = useRef(null);
  const moreRef = useRef(null);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="font-sans bg-gradient-to-b from-cream to-cream/90 min-h-screen">
      {/* Header */}
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

      {/* Main Login Section */}
      <div className="flex flex-col items-center pt-24 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brown mb-12">
          Login Portal
        </h1>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl transition-all"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Role Tabs */}
          <div className="flex justify-between mb-6">
            {["admin", "guard", "parent"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all w-full mx-2 ${
                  role === r
                    ? "bg-[#7B4B2A] text-cream shadow-lg scale-105"
                    : "bg-cream text-[#7B4B2A] hover:shadow-md"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Login Form with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mt-4 space-y-4">
                {role !== "parent" ? (
                  <>
                    <input
                      type="text"
                      placeholder={role === "admin" ? "Admin ID" : "Guard ID"}
                      className="w-full p-4 text-lg border border-[#7B4B2A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-4 text-lg border border-[#7B4B2A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-4 text-lg border border-[#7B4B2A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-4 text-lg border border-[#7B4B2A]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B4B2A]"
                    />
                  </>
                )}

                <button className="w-full py-4 rounded-full bg-[#7B4B2A] text-cream font-bold text-lg hover:shadow-xl transition-all">
                  Login
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

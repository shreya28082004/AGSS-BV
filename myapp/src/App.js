import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SecureEntryPage from "./pages/SecureEntryPage";
import NotifyPage from "./pages/nm"; // Notification video page
import VehiclePage from "./pages/vm";
import AboutPage from "./pages/AboutPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secure-entry" element={<SecureEntryPage />} />
        <Route path="/notify" element={<NotifyPage />} /> {/* New route */}
        <Route path="/vehicle" element={<VehiclePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;

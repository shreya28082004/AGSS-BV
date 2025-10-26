import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SecureEntryPage from "./pages/SecureEntryPage";
import NotifyPage from "./pages/nm"; // Notification video page
import VehiclePage from "./pages/vm";
import AboutPage from "./pages/AboutPage";
import PrPage from "./pages/ParentReg";
import GrPage from "./pages/GuardReg";
import ContactUs from "./pages/ContactUs";
import PreVisit from "./pages/PreVisit";
import Setting from "./pages/settings";
import FeedbackPage from "./pages/feedback";
import LoginPage from "./pages/login";
import CustomerCarePage from "./pages/CustomerCare";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secure-entry" element={<SecureEntryPage />} />
        <Route path="/notify" element={<NotifyPage />} />
        <Route path="/vehicle" element={<VehiclePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/parent-registration" element={<PrPage />} />
        <Route path="/guard-registration" element={<GrPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/customer-care" element={<CustomerCarePage />} />
        <Route path="/pre-visit" element={<PreVisit />} />
      </Routes>
    </Router>
  );
}

export default App;

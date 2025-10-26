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
import Setting from "./pages/Setting";
import CustomerCare from "./pages/CustomerCare";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secure-entry" element={<SecureEntryPage />} />
        <Route path="/notify" element={<NotifyPage />} /> {/* New route */}
        <Route path="/vehicle" element={<VehiclePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/parent-registration" element={<PrPage />} />
        <Route path="/guard-registration" element={<GrPage />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/pre-visit" element={<PreVisit />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/CustomerCare" element={<CustomerCare />} />        


      </Routes>
    </Router>
  );
}

export default App;

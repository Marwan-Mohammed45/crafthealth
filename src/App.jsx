import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import HospitalsMapPage from "./pages/map/hospitals-map";
import CreateHospitalPage from "./pages/map/hospitals-create";

import Dashboard_D from "./pages/dashboard-D";
import Navbar from "./components/Navbar";
import MegaFooter from "./components/MegaFooter";
import Home from "./components/home";
import Signup from "./Authencation/Signup";
import LoginForm from "./Authencation/login";
import Sidebar from "./pages/sidebar";
import Dashboard_P from "./pages/dashboard-p";

import Notifications from "./components/link-siade-bar/Notifications";

import SettingsPage from "./components/link-siade-bar/settings";

import AIPage from "./components/AI/AIPage";
import VerifyOtp from "./Authencation/verfiyotp";

const Layout = () => (
  <>
    <div>
      <Navbar />
    </div>
    <Outlet />
    <MegaFooter />
  </>
);

// ===== Layout لوحة التحكم (Sidebar + محتوى) =====
const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      <button
        type="button"
        onClick={() => setSidebarOpen((v) => !v)}
        className="fixed z-50 top-4 left-4 md:hidden bg-white/90 border shadow rounded-full p-2 transition-transform duration-300"
        aria-controls="app-sidebar"
        aria-expanded={sidebarOpen}
        aria-label={sidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
      >
        <i className={`bi ${sidebarOpen ? "bi-chevron-left" : "bi-chevron-right"} text-xl`} />
      </button>

      <Sidebar isOpen={sidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* المحتوى جنب السايدبار */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/dashboard" element={<SidebarLayout />}>
        <Route index element={<Dashboard_P />} />

        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="AI" element={<AIPage />} />
      </Route>
      
      <Route path="/dashboard-D" element={<Dashboard_D />} />


       
       <Route path="/hospitals" element={<HospitalsMapPage />} />
       <Route path="/hospitals/create" element={<CreateHospitalPage />} />

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

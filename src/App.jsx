import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { RiskStoreProvider } from "./context/RiskStoreContext";
import ProtectedRoute from "./components/ProtectedRoute";
import IntroAnimation from "./components/IntroAnimation";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Risks from "./pages/Risks";
import RiskDetail from "./pages/RiskDetail";
import RiskHeatmap from "./pages/RiskHeatmap";
import RiskMonitor from "./pages/RiskMonitor";
import Evidence from "./pages/Evidence";
import Mitigation from "./pages/Mitigation";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/Settings";
import Users from "./pages/Users";
function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem("arm_intro_seen"));
  useEffect(() => {
    if (!showIntro) sessionStorage.setItem("arm_intro_seen", "1");
  }, [showIntro]);
  return <AuthProvider>
      <RiskStoreProvider>
       <BrowserRouter basename="/AI-Riak-Manager">
          <AnimatePresence mode="wait">
            {showIntro && <IntroAnimation key="intro" onDone={() => setShowIntro(false)} />}
          </AnimatePresence>
          {!showIntro && <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/app/risks" element={<ProtectedRoute><Risks /></ProtectedRoute>} />
              <Route path="/app/risks/:id" element={<ProtectedRoute><RiskDetail /></ProtectedRoute>} />
              <Route path="/app/heatmap" element={<ProtectedRoute><RiskHeatmap /></ProtectedRoute>} />
              <Route path="/app/monitor" element={<ProtectedRoute><RiskMonitor /></ProtectedRoute>} />
              <Route path="/app/evidence" element={<ProtectedRoute><Evidence /></ProtectedRoute>} />
              <Route path="/app/mitigation" element={<ProtectedRoute><Mitigation /></ProtectedRoute>} />
              <Route path="/app/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/app/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/app/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            </Routes>}
        </BrowserRouter>
      </RiskStoreProvider>
    </AuthProvider>;
}
export {
  App as default
};

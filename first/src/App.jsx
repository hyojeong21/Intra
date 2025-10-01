import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeamPage from "./pages/TeamPage";
import SchedulePage from "./pages/SchedulePage";
import CheerPage from "./pages/CheerPage";
import NoticesExtendedPage from "./pages/NoticesExtendedPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/team/:teamName?" element={<TeamPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/cheer" element={<CheerPage />} />
        <Route path="/notices-extended" element={<NoticesExtendedPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
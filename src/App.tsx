import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";
import AlphaTestingPage from "./pages/AlphaTesting";
import Leaderboard from "./pages/Leaderboard";
import ConnectBrokerPage from "./pages/ConnectBroker";
import InsightsPage from "./pages/Insights";
import AdminPage from "./pages/Admin";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/itr-sass" element={<ItrSassPage />} /> */}
          <Route path="/dash" element={<DashboardPage />} />
          <Route path="/connect-broker" element={<ConnectBrokerPage />} />
          <Route path="/alphatesting" element={<AlphaTestingPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

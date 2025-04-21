import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RecipeDashboard from "./Pages/RecipeDashboard";
import Navbar from "./Component/Navbar";
import "./App.css";
import "./Responsivestyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}



function MainContent() {
  const location = useLocation();
  const hideNavbarPages = ["/recipes", "/login", "/register"];
  const shouldShowNavbar = !hideNavbarPages.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipeDashboard />} />
      </Routes>
    </div>
  );
}



export default App;
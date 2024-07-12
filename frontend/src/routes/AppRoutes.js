import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { AuthProvider } from "../contexts/AuthContext";
import Post from "../pages/Post";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/post" element={<Post/>} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;

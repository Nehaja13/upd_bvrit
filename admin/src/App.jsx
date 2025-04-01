import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar State

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const url = "http://localhost:4000";

  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Navbar setToken={setToken} token={token} />
      <hr />
      <div className="app-content">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`main-content ${isSidebarOpen ? "open" : "closed"}`}>
          <Routes>
            {!token ? (
              <Route path="/" element={<LoginPopup setShowLogin={setShowLogin} setToken={setToken} />} />
            ) : null}
            <Route path="/add" element={<Add url={url} token={token} />} />
            <Route path="/list" element={<List url={url} token={token} />} />
            <Route path="/orders" element={<Orders url={url} token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

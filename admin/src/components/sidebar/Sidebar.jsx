import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaBars, FaUser, FaStore, FaList, FaShoppingCart } from "react-icons/fa"; // Importing icons

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>
      <div className="sidebar-options">
        <NavLink to="/users" className="sidebar-option">
          <FaUser /> {/* 👤 User Icon */}
          {isOpen && <p>Users</p>}
        </NavLink>
        <NavLink to="/vendors" className="sidebar-option">
          <FaStore /> {/* 🏪 Vendor Icon */}
          {isOpen && <p>Vendors</p>}
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <FaList /> {/* 📋 List Icon */}
          {isOpen && <p>List Items</p>}
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <FaShoppingCart /> {/* 🛒 Orders Icon */}
          {isOpen && <p>Orders</p>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

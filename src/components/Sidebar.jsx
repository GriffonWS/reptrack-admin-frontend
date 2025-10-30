import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/dashboard/Dashboard.css';
import logos from '../assets/logo-H.png';
import { FaUserTie } from "react-icons/fa";
import { GiHeartPlus } from "react-icons/gi";
import { MdPrivacyTip } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Helper function to check if a link is active
  const isLinkActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* Logo Section */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-content">
          <div className="sidebar__logo-icon">
            <img src={logos} alt="Logo" />
          </div>
        </div>
        <button className="sidebar__close" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">

          {/* All Owners */}
          <li className="sidebar__item">
            <Link
              to="/dashboard/all_owners"
              className={`sidebar__link ${isLinkActive('/dashboard/all_owners') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <FaUserTie />
              </span>
              <span className="sidebar__label">All Owners</span>
            </Link>
          </li>

          {/* Health */}
          <li className="sidebar__item">
            <Link
              to="/dashboard/health"
              className={`sidebar__link ${isLinkActive('/dashboard/health') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <GiHeartPlus />
              </span>
              <span className="sidebar__label">Health</span>
            </Link>
          </li>

          {/* Privacy Policy */}
          <li className="sidebar__item">
            <Link
              to="/dashboard/privacy_policy"
              className={`sidebar__link ${isLinkActive('/dashboard/privacy_policy') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <MdPrivacyTip />
              </span>
              <span className="sidebar__label">Privacy Policy</span>
            </Link>
          </li>

          {/* Support */}
          <li className="sidebar__item">
            <Link
              to="/dashboard/support"
              className={`sidebar__link ${isLinkActive('/dashboard/support') ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__icon">
                <BiSupport />
              </span>
              <span className="sidebar__label">Support</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

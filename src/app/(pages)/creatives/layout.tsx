/*"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useHeadroom, useWindowScroll } from "@mantine/hooks";
import { NAVS } from "@constants/links/navigation";
import SideBar from "@atoms/a-sidebar";
import { BigLogo } from "@atoms/a-big-logo";
import classes from "@styles/landing.module.css";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLaunchAppClick?: () => void;
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick = () => {},
  onSignupClick = () => {},
  onLaunchAppClick = () => {},
  children,
}) => {
  const pathname = usePathname();
  const pinned = useHeadroom({ fixedAt: 200 });
  const [s] = useWindowScroll();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div>
      <nav
        className={`w-full px-[4.5%] pt-4 xl:pt-6 pb-3 flex justify-between items-center fixed top-0 left-0 z-10 transform-gpu transition-transform duration-300 bg-gray-800 text-white ${pinned ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div
          className="absolute inset-0 z-[-1] bg-[#111] transition-opacity duration-300"
          style={{ opacity: s.y < 5 ? "0%" : "100%" }}
        />

        <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />

        <div className="hidden xl:flex gap-10 hover:font-medium text-base">
          {NAVS.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className={isActive(item.link) ? "text-yellow-500" : "text-gray-400"}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-yellow-500"
            onClick={onLoginClick}
          >
            Login
          </button>
          <div className="h-4 w-px bg-gray-500"></div>
          <button
            className="px-4 py-2 border border-gray-500 rounded-full text-gray-400 hover:bg-gray-700"
            onClick={onSignupClick}
          >
            Signup
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLaunchAppClick}
          >
            <span className="text-gradient font-bold">Launch App</span>
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z5i5MHxtPiXvyE2x/material.png"
              alt="Launch"
              className="w-4 h-4"
            />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-yellow-500"
            onClick={toggleDropdown}
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </nav>

      {isDropdownOpen && (
        <div className="md:hidden bg-gray-800 shadow-md absolute top-16 left-0 w-full z-10 p-4">
          <div className="flex flex-col gap-4">
            <span
              className="text-gray-400 hover:text-yellow-500 cursor-pointer"
              onClick={onLoginClick}
            >
              Login
            </span>
            <span
              className="text-gray-400 hover:text-yellow-500 cursor-pointer"
              onClick={onSignupClick}
            >
              Signup
            </span>
            <span
              className="text-gray-400 hover:text-yellow-500 cursor-pointer"
              onClick={onLaunchAppClick}
            >
              Launch App
            </span>
          </div>
        </div>
      )}

      <SideBar />
      {children}
    </div>
  );
};

export default Navbar;*/   




import NavBar from "@molecules/m-navbar fans";
import Footer from "@components/molecules/m-footer";

interface Props {
  children?: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative overflow-hidden font-space bg-dark01">
      <NavBar />
      <div className="min-h-screen">
        {children}
      </div>
      
    </div>
  );
};

export default Layout;


"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useHeadroom } from "@mantine/hooks";
import { NAVS } from "@constants/links/navigation";
import { BigLogo } from "@atoms/a-big-logo";
import SideBar from "@atoms/a-sidebar";
import Link from "next/link";
import Image from "next/image";
import classes from "@styles/landing.module.css";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLaunchAppClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick = () => {},
  onSignupClick = () => {},
  onLaunchAppClick = () => {},
}) => {
  const pathname = usePathname();
  const pinned = useHeadroom({ fixedAt: 200 });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const excludedPages = ["/fans", "/creatives", "/about"];

  const getTextColor = (page: string): string => {
    return pathname === page ? "#FBB03B" : "white";
  };

  return (
    <nav
      className={`w-full px-[4.5%] pt-4 xl:pt-6 pb-3 flex justify-between items-center fixed top-0 left-0 z-10 transform-gpu transition-transform duration-300 ${pinned ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex gap-9 items-center">
        <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />
        <div className="flex gap-4 items-center">
          <span
            className="font-space-grotesk text-sm font-medium tracking-wide leading-5 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/fans") }}
          >
            <a href="/fans">For Fans</a>
          </span>

          {/* Vertical divider */}
          <div className="w-px h-6 bg-[#7A7A7A] hidden xl:block"></div>

          <span
            className="font-space-grotesk text-sm font-medium tracking-wide leading-5 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/creatives") }}
          >
            <a href="/creatives">For Artists</a>
          </span>
        </div>
      </div>

      <div className="xl:flex gap-10 items-center hidden">
        {NAVS.map((item) => {
          if (item.link === "/" && excludedPages.includes(pathname)) {
            return null;
          }
          return (
            <div
              key={item.link}
              className="flex gap-0 items-center font-space-grotesk text-sm font-medium tracking-wide leading-5 cursor-pointer"
            >
              <a
                href={item.link}
                className={isActive(item.link) ? "text-yellow" : "text-gray-400"}
              >
                {item.label}
              </a>
              <Image
                src="/chevron-down.png"
                alt="chevron"
                width={12}
                height={12}
              />
            </div>
          );
        })}
      </div>

      <div className="xl:flex gap-4 items-center hidden">
        <span
          className="font-space-grotesk text-sm font-medium tracking-wide leading-5 text-gray-400 cursor-pointer"
          onClick={onLoginClick}
        >
          Login
        </span>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-[#7A7A7A]"></div>

        <button
          className="px-2.5 py-1 rounded-full border border-gray-400 bg-none text-gray-400 font-space-grotesk text-sm font-medium tracking-wide leading-5 hover:bg-gray-50"
          onClick={onSignupClick}
        >
          Signup
        </button>

        <div
          className="flex gap-0.5 items-center cursor-pointer bg-gradient-to-b from-[#E22BCC] to-[#FBB03B] bg-clip-text text-transparent font-space-grotesk text-sm font-bold tracking-wide leading-5"
          onClick={onLaunchAppClick}
        >
          <span>Launch App</span>
          <Image
            src="/rocket.png"
            alt="rocket"
            width={16}
            height={16}
          />
        </div>
      </div>

      <SideBar />
    </nav>
  );
};

export default Navbar;
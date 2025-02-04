/*"use client";

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
      className={`w-full px-[4.5%] pt-6 xl:pt-8 pb-4 flex justify-between items-center fixed top-0 left-0 z-10 transform-gpu transition-transform duration-300 ${
        pinned ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-6 items-center">
        <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />
        <div className="flex gap-6 items-center">
          <span
            className="font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/fans") }}
          >
            <a href="/fans">For Fans</a>
          </span>

          
          <div className="w-px h-8 bg-[#7A7A7A] hidden xl:block"></div>

          <span
            className="font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/creatives") }}
          >
            <a href="/creatives">For Artists</a>
          </span>
        </div>
      </div>

      <div className="xl:flex gap-6 items-center hidden">
        {NAVS.map((item) => {
          if (item.link === "/" && excludedPages.includes(pathname)) {
            return null;
          }
          return (
            <div
              key={item.link}
              className="flex gap-2 items-center font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer"
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
                width={14}
                height={14}
              />
            </div>
          );
        })}
      </div>

      <div className="xl:flex gap-6 items-center hidden">
        <a
          href="https://app.aurally.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 items-center cursor-pointer bg-gradient-to-b from-[#E22BCC] to-[#FBB03B] bg-clip-text text-transparent font-space-grotesk text-base font-semibold tracking-wide leading-6"
        >
          <span>Get started</span>
          <Image
            src="/rocket.png"
            alt="rocket"
            width={18}
            height={18}
          />
        </a>
      </div>

      <SideBar />
    </nav>
  );
};

export default Navbar;*/


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

interface NavItem {
  label: string;
  link: string;
  submenu?: { label: string; link: string }[]; // Optional submenu
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick = () => { },
  onSignupClick = () => { },
  onLaunchAppClick = () => { },
}) => {
  const pathname = usePathname();
  const pinned = useHeadroom({ fixedAt: 200 });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
      className={`w-full px-[4.5%] pt-6 xl:pt-8 pb-4 flex justify-between items-center fixed top-0 left-0 z-10 transform-gpu transition-transform duration-300 ${pinned ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="flex gap-6 items-center">
        <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />
        <div className="flex gap-6 items-center">
          <span
            className="font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/fans") }}
          >
            <a href="/fans">For Fans</a>
          </span>

          {/* Vertical divider */}
          <div className="w-px h-8 bg-[#7A7A7A] hidden xl:block"></div>

          <span
            className="font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer hidden xl:block"
            style={{ color: getTextColor("/creatives") }}
          >
            <a href="/creatives">For Artists</a>
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="xl:flex gap-6 items-center hidden">
        {NAVS.map((item: NavItem) => {
          if (item.link === "/" && excludedPages.includes(pathname)) {
            return null;
          }

          const hasSubmenu = item.submenu && item.submenu.length > 0; // Check both existence and length of submenu
          const isDropdownOpen = openDropdown === item.label;

          return (
            <div key={item.link} className="relative">
              <div
                className="flex gap-2 items-center font-space-grotesk text-base font-medium tracking-wide leading-6 cursor-pointer"
                onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
              >
                <a
                  href={item.link}
                  className={isActive(item.link) ? "text-yellow" : "text-gray-400"}
                >
                  {item.label}
                </a>

                {hasSubmenu && (
                  <Image
                    src="/chevron-down.png"
                    alt="chevron"
                    width={14}
                    height={14}
                    className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                  />
                )}
              </div>

              {/* Submenu Dropdown */}
              {hasSubmenu && isDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md">
                  {item.submenu?.map((subItem) => (
                    <a
                      key={subItem.link}
                      href={subItem.link}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="xl:flex gap-6 items-center hidden">
        <a
          href="https://app.aurally.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 items-center cursor-pointer bg-gradient-to-b from-[#E22BCC] to-[#FBB03B] bg-clip-text text-transparent font-space-grotesk text-base font-semibold tracking-wide leading-6"
        >
          <span>Get started</span>
          <Image src="/rocket.png" alt="rocket" width={18} height={18} />
        </a>
      </div>

      <SideBar />
    </nav>
  );
};

export default Navbar;


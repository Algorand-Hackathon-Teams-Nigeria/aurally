"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeadroom, useWindowScroll } from "@mantine/hooks";
import SideBar from "@atoms/a-sidebar";
import { BigLogo } from "@atoms/a-big-logo";
import classes from "@styles/landing.module.css";
import { NAVS } from "@constants/links/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const pinned = useHeadroom({ fixedAt: 200 });
  const [s] = useWindowScroll();

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`w-full px-[4.5%] pt-4 xl:pt-6 pb-3 flex justify-between items-center fixed top-0 left-0 z-10   transform-gpu transition-transform duration-300 ${pinned ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div
        className="absolute inset-0 z-[-1] bg-[#111] transition-opacity duration-300"
        style={{ opacity: s.y < 5 ? "0%" : "100%" }}
      >
      </div>
      <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />
      <div className="hidden xl:flex gap-10 hover:font-medium text-base">
        {NAVS.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className={isActive(item.link) ? "text-yellow" : ""}
          >
            {item.label}
          </a>
        ))}
      </div>
      <Link
        title="Aurally App"
        href="https://app.aurally.xyz"
        className={`${classes.getBtn} hidden xl:flex`}
      >
        Launch App
      </Link>
      <SideBar />
    </nav>
  );
};

export default NavBar;
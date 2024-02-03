"use client";
import React from "react";
import { BigLogo } from "../BigLogo";
import Link from "next/link";
import SideBar from "../SideBar";
import classes from "../../styles/landing.module.css";
import { useHeadroom, useWindowScroll } from "@mantine/hooks";

const NavBar = () => {
  const pinned = useHeadroom({ fixedAt: 200 });
  const [s] = useWindowScroll();
  return (
    <nav
      className={`w-full px-[4.5%] pt-4 lg:pt-6 pb-3 flex justify-between items-center fixed top-0 left-0 z-10   transform-gpu transition-transform duration-300 ${
        pinned ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="absolute inset-0 z-[-1] bg-[#111] transition-opacity duration-300"
        style={{ opacity: s.y < 5 ? "0%" : "100%" }}
      ></div>
      <BigLogo to="/" className="w-28 lg:w-max" />
      <div className="hidden lg:flex gap-14 hover:font-medium">
        <Link href="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#works">How it works</a>
        <a href="#road">Roadmap</a>
        <Link href="/blog">Blog</Link>
      </div>
      <Link
        href="https://dapp.aurally.xyz"
        className={`${classes.getBtn} hidden lg:flex`}
      >
        Launch App
      </Link>
      <SideBar />
    </nav>
  );
};

export default NavBar;

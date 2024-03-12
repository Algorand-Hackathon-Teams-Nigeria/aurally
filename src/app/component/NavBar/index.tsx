"use client";
import React, { useEffect, useState } from "react";
import { BigLogo } from "../BigLogo";
import Link from "next/link";
import SideBar from "../SideBar";
import classes from "../../styles/landing.module.css";
import { useHeadroom, useWindowScroll } from "@mantine/hooks";
import { useSetAtom } from "jotai";
import { modalAtom } from "@/app/home-sections/FoundersModal";

export const NAVS = [
  {
    label: "Home",
    link: "#home",
  },
  {
    label: "About Us",
    link: "#about",
  },
  {
    label: "For Creators",
    link: "#creators",
  },
  {
    label: "For Fans",
    link: "#fans",
  },
  {
    label: "FAQs",
    link: "#faqs",
  },
  {
    label: "Features",
    link: "#features",
  },
  // {
  //   label: "Founders",
  //   link: "#founders",
  // },
];

const NavBar = () => {
  const pinned = useHeadroom({ fixedAt: 200 });
  const [s] = useWindowScroll();
  const [activeHash, setActiveHash] = useState("");
  const setModal = useSetAtom(modalAtom);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(
        !window.location.hash ? NAVS[0].link : window.location.hash
      );
      console.log(window.location.hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const openModal = () => {
    setModal(() => true);
  };

  return (
    <nav
      className={`w-full px-[4.5%] pt-4 xl:pt-6 pb-3 flex justify-between items-center fixed top-0 left-0 z-10   transform-gpu transition-transform duration-300 ${
        pinned ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="absolute inset-0 z-[-1] bg-[#111] transition-opacity duration-300"
        style={{ opacity: s.y < 5 ? "0%" : "100%" }}
      ></div>
      <BigLogo to="/" className="w-28 xl:w-max" color={"#EBEBEB"} />
      <div className="hidden xl:flex gap-10 hover:font-medium text-base">
        {NAVS.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className={activeHash === item.link ? "text-yellow" : ""}
          >
            {item.label}
          </a>
        ))}
        <div onClick={openModal} className="lg:cursor-pointer">Founders</div>
      </div>
      <Link title="Aurally App" href="https://app.aurally.xyz" className={`${classes.getBtn} hidden xl:flex`}>
        Launch App
      </Link>
      <SideBar />
    </nav>
  );
};

export default NavBar;

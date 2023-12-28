"use client";
import { Drawer } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import classes from "../styles/landing.module.css";

const MenuBar = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-10 h-10 flex justify-center items-center rounded-full bg-primary shrink-0 relative z-[11]"
      onClick={onClick}
    >
      <div className={`w-[20px] h-[16px] flex flex-col justify-between `}>
        <div
          className={`h-[1.5px] w-full relative bg-white transition-all duration-300 ${
            isOpen
              ? "rotate-45 top-1/2 translate-y-[-50%]"
              : "rotate-0 top-0 translate-y-0"
          }`}
        />
        <div
          className={`h-[1.5px] w-full relative bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`h-[1.5px] w-full relative bg-white transition-all duration-300 ${
            isOpen
              ? "-rotate-45 bottom-1/2 translate-y-[50%]"
              : "rotate-0 bottom-0 translate-y-0"
          }`}
        />
      </div>
    </div>
  );
};

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const onClick = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <MenuBar isOpen={open} onClick={toggle} />
      <Drawer opened={open} onClose={toggle} position="right">
        <div className="flex flex-col gap-14 px-5 mt-10">
          <a href="/" onClick={onClick} className=" pointer-events-auto">
            Home
          </a>
          <a
            href="#features"
            onClick={onClick}
            className=" pointer-events-auto"
          >
            Features
          </a>
          <a href="#works" onClick={onClick} className=" pointer-events-auto">
            How it works
          </a>
          <a href="#road" onClick={onClick} className=" pointer-events-auto">
            Roadmap
          </a>
          <Link
            onClick={onClick}
            href="https://dapp.aurally.xyz"
            className={`${classes.getBtn} flex pointer-events-auto`}
          >
            Get Started
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;

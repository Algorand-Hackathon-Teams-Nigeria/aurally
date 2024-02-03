"use client";
import { Drawer, Burger } from "@mantine/core";
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
  return <Burger opened={isOpen} onClick={onClick} />;
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
            href="https://app.aurally.xyz"
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

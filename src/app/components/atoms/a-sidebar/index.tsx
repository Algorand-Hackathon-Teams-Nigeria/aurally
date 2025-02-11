"use client";
import React from "react";
import Link from "next/link";
import { Burger, Drawer } from "@mantine/core";
import { usePathname } from "next/navigation";  // Import usePathname to get current path
import classes from "@styles/landing.module.css";
import { NAVS } from "@constants/links/navigation";

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
  const [open, setOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState("");
  const pathname = usePathname();  // Get current path

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(
        !window.location.hash ? NAVS[0].link : window.location.hash,
      );
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const onClick = () => {
    setOpen(false);
  };

  return (
    <div className="xl:hidden">
      <MenuBar isOpen={open} onClick={toggle} />
      <Drawer opened={open} onClose={toggle} position="right">
        <div className="flex flex-col gap-14 px-5 mt-10">
          {/* Render main navigation items */}
          {NAVS.map((item) => (
            <a
              title={item.label}
              href={item.link}
              key={item.link}
              onClick={onClick}
              className={`pointer-events-auto ${activeHash === item.link ? "text-yellow" : ""}`}
            >
              {item.label}
            </a>
          ))}

          {/* Always render "For Fans" and "For Artists" links */}
          <a
            href="/fans"
            title="For Fans"
            onClick={onClick}
            className={`pointer-events-auto ${activeHash === "/fans" ? "text-yellow" : ""}`}
          >
            For Fans
          </a>
          <a
            href="/creatives"
            title="For Artists"
            onClick={onClick}
            className={`pointer-events-auto ${activeHash === "/creatives" ? "text-yellow" : ""}`}
          >
            For Artists
          </a>

          {/* Launch App button */}
          <Link
            title="Aurally App"
            onClick={onClick}
            href="https://app.aurally.xyz"
            target="_blank"
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

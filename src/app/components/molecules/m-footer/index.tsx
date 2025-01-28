"use client"; 
import React from "react";
import Link from "next/link";
import { BigLogo } from "@atoms/a-big-logo";
import { IconWrapper } from "@components/Icon";
import { FOOTER_LINKS } from "@constants/links/socials";
import { usePathname } from "next/navigation"; 
const Footer = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about"; 

  return (
    <div className="relative">
      <div
        className={`mt-32 flex flex-col items-center relative ${
          isAboutPage ? "translate-y-[-300px]" : ""}`}
      >
        <BigLogo to="/" />
        <div className="flex gap-5 mt-10 mb-12">
          {FOOTER_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              title={link.name}
              className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center"
            >
              <IconWrapper icon={link.icon} color="white" fontSize={22} />
            </Link>
          ))}
        </div>
        <div className="h-[0.5px] w-full bg-[#8A8AA0] mb-5" />
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-16 sm:mb-24">
          <div>© {new Date().getFullYear()} Aurally All rights reserved</div>
          <div>Terms & Conditions</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

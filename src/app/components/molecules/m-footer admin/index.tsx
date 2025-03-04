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
          isAboutPage ? "translate-y-[0px]" : ""
        }`}
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

        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>

        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row gap-5 items-center justify-between mb-16 sm:mb-24 mx-auto">
          <div className="hidden sm:block text-left">
            © {new Date().getFullYear()} Aurally. All rights reserved
          </div>

          <div className="flex gap-6 text-right hidden sm:flex">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>

          <div className="flex flex-col items-center sm:hidden text-center gap-1">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <div className="mt-7">© {new Date().getFullYear()} Aurally. All rights reserved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

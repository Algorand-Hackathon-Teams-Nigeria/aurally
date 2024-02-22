import BallGradient from "@/app/component/BallGradient";
import { BigLogo } from "@/app/component/BigLogo";
import { IconWrapper } from "@/app/component/Icon";
import { FOOTER_LINKS } from "@/app/constants/links/socials";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="relative">
      {/* community */}
      <div className="bg-primary rounded-3xl py-[70px] px-4 overflow-hidden relative">
        <div className=" absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#6500764D]" />
        <div className=" absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#6500764D]" />
        <div className=" relative">
          <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">
            Join Our Socials
          </div>
          <Link
            href="https:aurally.xyz"
            target="_blank"
            className="w-max block px-8 py-4 rounded-[40px] bg-white text-[#1C51FE] mx-auto"
          >
            Get Started
          </Link>
        </div>
        <div />
      </div>
      {/* Footer */}
      <div className="mt-32 flex flex-col items-center relative">
        <BigLogo to="/" />
        <div className="flex gap-5 mt-10 mb-12">
          {FOOTER_LINKS.map(link => (
            <Link href={link.href} key={link.name} title={link.name} className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
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

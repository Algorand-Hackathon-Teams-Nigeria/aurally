import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  iconUrl: string;
  title: string;
  link: string | "Coming Soon";
  heroUrl: string;
  children?: React.ReactNode;
  bordered?: boolean;
  reversed?: boolean;
}

const ProductPromotion: React.FC<Props> = (
  { iconUrl, title, link, heroUrl, children, bordered, reversed },
) => {
  return (
    <div
      id={title}
      className={`flex flex-col items-center gap-10 ${bordered ? "pb-20 lg:pb-40 border-b border-primary/30" : ""
        } ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className="relative bg-primary/5 p-8 rounded-3xl border border-border/40 flex-1">
        <div className="py-8 flex items-center gap-4 border-b border-primary/30">
          <Image
            src={iconUrl}
            alt={title}
            width={47}
            height={60}
          />
          <h3 className="text-3xl font-bold">{title}</h3>
        </div>
        <div className="flex flex-col gap-8 mt-6">
          {children}
          {link !== "Coming Soon"
            ? (
              <Link
                className="bg-primary hover:bg-primary/70 transition-all p-2 px-3 rounded w-fit"
                href={link}
              >
                Get Started
              </Link>
            )
            : (
              <p className="absolute bg-gradient-to-b from-secondaryYellowDark to-secondaryYellow p-2 font-medium rounded text-black -top-8 right-16 w-[80px] text-center">
                Coming soon
              </p>
            )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <Image
          src={heroUrl}
          alt={title}
          width={410}
          height={300}
        />
      </div>
    </div>
  );
};

export default ProductPromotion;

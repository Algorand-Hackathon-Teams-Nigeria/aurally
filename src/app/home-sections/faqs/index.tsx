"use client";
import React from "react";
import classes from "@/app/styles/landing.module.css";
import { Accordion } from "@mantine/core";

const faqs = [
  {
    value: "Is Aurally accessible to artists and fans worldwide?",
    description: "Yes, Aurally is accessible globally, allowing artists and fans from around the world to connect, share, and engage with each other's work.",
  },
  {
    value: "What types of content are allowed on Aurally's platform?",
    description: "Aurally welcomes a diverse range of creative content, including music, visual art, videos, podcasts, and more. We encourage artists and creators from all backgrounds and genres to share their unique perspectives and talents with our global audience.",
  },
];

const faqs2 = [
    {
      value: "What Wallets are supported by Aurally?",
      description: "All wallets that have support for the algorand Blockchain. Ẹ.g Pera wallet, Defly wallet.",
    },
    {
      value: "How does Aurally protect the rights of creatives?",
      description: "Aurally leverages blockchain technology and encryption measures to protect the rights and integrity of artists' content, ensuring that creatives maintain ownership and control over their work.",
    },
  ];

const FAQS = () => {
  const items = faqs.map((item) => (
    <Accordion.Item
      key={item.value}
      value={item.value}
      className="border border-primary rounded-[10px] mb-6 p-4 md:p-5"
    >
      <Accordion.Control className="bg-transparent w-full flex flex-row-reverse items-center justify-between">
        <div>{item.value}</div>
      </Accordion.Control>
      <Accordion.Panel>
        <div>{item.description}</div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  const items2 = faqs2.map((item) => (
    <Accordion.Item
      key={item.value}
      value={item.value}
      className="border border-primary rounded-[10px] mb-6 p-4 md:p-5"
    >
      <Accordion.Control className="bg-transparent w-full flex flex-row-reverse items-center justify-between">
        <div>{item.value}</div>
      </Accordion.Control>
      <Accordion.Panel>
        <div>{item.description}</div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div id="faqs">
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold relative z-[5] ${classes.txt_grd2}`}
      >
        Frequently Asked Questions
      </h2>
      <div className="mt-8 grid md:grid-cols-2 md:gap-6">
        <Accordion
          variant="separated"
          unstyled
          chevron={<div className="text-primary text-[24px]">+</div>}
        >
          {items}
        </Accordion>
        <Accordion
          variant="separated"
          unstyled
          chevron={<div className="text-primary text-[24px]">+</div>}
        >
          {items2}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQS;

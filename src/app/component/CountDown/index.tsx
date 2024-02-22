"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import IMF from "../../assets/IMF logo.png";

const futureDate = new Date("February 22, 2024 14:30:00 GMT+0100").getTime();
const HOURS = 1000 * 60 * 60;

const getTimeLeft = (timerInterval?: NodeJS.Timeout) => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the difference between the future date and the current date
  const distance = futureDate - now;

  // Calculate days, hours, minutes, and seconds
  let days: string | number = Math.floor(distance / (HOURS * 24));
  let hours: string | number = Math.floor((distance % (HOURS * 24)) / HOURS);
  let minutes: string | number = Math.floor((distance % HOURS) / (1000 * 60));
  let seconds: string | number = Math.floor((distance % (1000 * 60)) / 1000);

  days = days < 10 ? `0${days}` : `${days}`;
  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // If the countdown is over, clearInterval
  if (distance < 0) {
    clearInterval(timerInterval);
    console.log("Countdown finished!");
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const CountDown = () => {
  const daysRef = useRef<HTMLDivElement>(null);
  const hrsRef = useRef<HTMLDivElement>(null);
  const minsRef = useRef<HTMLDivElement>(null);
  const secsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const time = getTimeLeft(timerInterval);
      daysRef.current && (daysRef.current.textContent = time.days);
      hrsRef.current && (hrsRef.current.textContent = time.hours);
      minsRef.current && (minsRef.current.textContent = time.minutes);
      secsRef.current && (secsRef.current.textContent = time.seconds);
    }, 1000);

    return () => {};
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 items-center pb-10 md:pb-5 p-5 rounded-[10px] bg-black border border-yellow -translate-y-[40%] text-[2rem] lg:text-[2.5rem] md:max-h-[146px] max-w-max mx-auto">
        <div className="flex gap-8 lg:gap-16 items-center">
          <div className="text-center hidden md:block">
            <div ref={daysRef} className="font-bold">
              00
            </div>
            <div className="text-grey-02 text-[0.428em]">DAYS</div>
          </div>
          <div className="text-center">
            <div ref={hrsRef} className="font-bold">
              00
            </div>
            <div className="text-grey-02 text-[0.428em]">HOURS</div>
          </div>
          <div className="text-center">
            <div ref={minsRef} className="font-bold">
              00
            </div>
            <div className="text-grey-02 text-[0.428em]">MINS</div>
          </div>
          <div className="text-center hidden xl:block">
            <div ref={secsRef} className="font-bold">
              00
            </div>
            <div className="text-grey-02 text-[0.428em]">SECS</div>
          </div>
          <div className="text-[0.75em] md:text-[0.428em] font-roboto">
            To Aurally Launch @
          </div>
        </div>
        <Image
          src={IMF}
          alt=""
          className="translate-x-[20%] hidden md:block"
          priority
        />
      </div>
      <Image
        src={IMF}
        alt=""
        className="-translate-y-24 min-[350px]:-translate-y-20 md:hidden"
        priority
      />
    </div>
  );
};

export default CountDown;

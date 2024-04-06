import React from "react";
import EventsCarousel from "./EventsCarousel";

interface Props {
  title?: string;
}
const Events: React.FC<Props> = ({ title }) => {
  return (
    <div className="relative z-[5]">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl md:text-4xl font-bold mb-6">
          {title ?? "Events"}
        </div>
        <div id="event-carousel" className="flex gap-5 sm:gap-6"></div>
      </div>
      <EventsCarousel />
    </div>
  );
};

export default Events;

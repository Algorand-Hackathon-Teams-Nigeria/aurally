import EventsCarousel from "./EventsCarousel";

const Events = () => {
  return (
    <div className="relative z-[5]">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl md:text-4xl font-bold mb-6">Events</div>
        <div id="event-carousel" className="flex gap-5 sm:gap-6"></div>
      </div>
      <EventsCarousel />
    </div>
  );
};

export default Events;

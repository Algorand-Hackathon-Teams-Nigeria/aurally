import Landing from "@page-sections/landing";

const MeetTheFounders = () => {
  return (
    <section id="meet-the-founders">
      <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-transparent bg-clip-text text-5xl lg:text-6xl font-bold mb-12">
        Meet the Founders
      </h2>
      <Landing.Founders />
    </section>
  );
};

export default MeetTheFounders;

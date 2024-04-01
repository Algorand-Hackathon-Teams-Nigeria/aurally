import Page from "@atoms/a-page";
import About from "@page-sections/about";
import Landing from "@page-sections/landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aurally",
  description:
    "Our platform is designed to empower musicians, artists, and creators to reclaim ownership of their work and monetize in real time.",
};

const AboutPage = () => {
  return (
    <Page>
      <About.Background />
      <About.MissionVision />
      <About.MeetTheFounders />
      <Landing.RoadMap />
      <Landing.FAQS />
      <Landing.Community />
    </Page>
  );
};

export default AboutPage;

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
      <div className="w-screen-2xl mx-auto pt-[20px] translate-y-[-205px] lg:translate-y-[-370px]">
  <Landing.ProductCommunity />
</div>

    </Page>
  );
};

export default AboutPage;

import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";

export default function LandingPage() {
  return (
    <Page className="mt-0">
      <Landing.HeroSection />
      <Landing.AppStatistics />
      <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32 md:space-y-36">
        <Landing.AboutUs />
        <Landing.UpComingFeatures />
        <Landing.HomeMarketPlace />
        <Landing.ForCreators />
        <Landing.ForFans />
        <Landing.Features />
        <Landing.HowItWorks />
        <Landing.RoadMap />
        <Landing.Events />
        <Landing.Community />
      </div>
    </Page>
  );
}

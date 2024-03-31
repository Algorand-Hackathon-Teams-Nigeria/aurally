import NavBar from "@molecules/m-navbar";
import Landing from "@page-sections/landing";
import Footer from "@components/molecules/m-footer";

export default function LandingPage() {
  return (
    <main className={`relative overflow-hidden font-space`}>
      <NavBar />
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
        <Landing.FAQS />
        <Landing.RoadMap />
        <Landing.Events />
        <Footer />
        <Landing.FoundersModal />
      </div>
    </main>
  );
}

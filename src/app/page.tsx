import FAQS from "./home-sections/faqs";
import NavBar from "./components/NavBar";
import Events from "./home-sections/Events";
import Footer from "./home-sections/Footer";
import RoadMap from "./home-sections/RoadMap";
import AboutUs from "./home-sections/about-us";
import ForFans from "./home-sections/for-fans";
import Features from "./home-sections/Features";
import AppStatistics from "@atoms/a-app-statistics";
import HowItWorks from "./home-sections/HowItWorks";
import HeroSection from "./home-sections/HeroSection";
import ForCreators from "./home-sections/for-creators";
import FoundersModal from "./home-sections/FoundersModal";
import UpComingFeatures from "@atoms/a-upcoming-features";
import HomeMarketPlace from "./home-sections/HomeMarketPlace";

export default function LandingPage() {
  return (
    <main className={`relative overflow-hidden font-space`}>
      <NavBar />
      <HeroSection />
      <AppStatistics />
      <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32 md:space-y-36">
        <AboutUs />
        <UpComingFeatures />
        <HomeMarketPlace />
        <ForCreators />
        <ForFans />
        <Features />
        <HowItWorks />
        <FAQS />
        <RoadMap />
        <Events />
        <Footer />
        <FoundersModal />
      </div>
    </main>
  );
}

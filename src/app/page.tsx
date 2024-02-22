import NavBar from "./component/NavBar";
import Features from "./home-sections/Features";
import HeroSection from "./home-sections/HeroSection";
import HomeMarketPlace from "./home-sections/HomeMarketPlace";
import HowItWorks from "./home-sections/HowItWorks";
import RoadMap from "./home-sections/RoadMap";
import Footer from "./home-sections/Footer";
import Events from "./home-sections/Events";
import CountDown from "./component/CountDown";
import AboutUs from "./home-sections/about-us";
import ForCreators from "./home-sections/for-creators";
import ForFans from "./home-sections/for-fans";
import FAQS from "./home-sections/faqs";
import FoundersModal from "./home-sections/FoundersModal";

export default function LandingPage() {
  return (
    <main className={`relative overflow-hidden font-space`}>
      <NavBar />
      <HeroSection />
      <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32 md:space-y-36">
        <CountDown />
        <AboutUs />
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

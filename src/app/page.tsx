import NavBar from "./component/NavBar";
import Features from "./home-sections/Features";
import HeroSection from "./home-sections/HeroSection";
import HomeMarketPlace from "./home-sections/HomeMarketPlace";
import HowItWorks from "./home-sections/HowItWorks";
import RoadMap from "./home-sections/RoadMap";
import Footer from "./home-sections/Footer";
import Events from "./home-sections/Events";

export default function LandingPage() {
  return (
    <main className={`relative overflow-hidden font-space`}>
      <NavBar />
      <HeroSection />
      <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32">
        <HomeMarketPlace />
        <Features />
        <HowItWorks />
        <RoadMap />
        <Events />
        <Footer />
      </div>
    </main>
  );
}

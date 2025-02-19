import { Metadata } from "next";
import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";
import BallGradient from "@/app/components/BallGradient";

export const metadata: Metadata = {
  title: "Creatives | Aurally",
};

const FansPage = () => {
  return (
    <Page className="mt-0 px-0 lg:px-0 p-0 lg:py-0 gap-0 lg:gap-0">
      <Landing.HomeCreatives />
      <Landing.AppStatistics />

      <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-24 sm:space-y-40 md:space-y-48">
        <Landing.AboutUsCreatives />
      </div>
      <div className="lg:mt-[100px] mt-[90px]">
      <Landing.CreativeBanner /></div>
      <div className="lg:mt-[200px] mt-[120px]">
      <Landing.ForCreatives /></div>
      <div className="mt-[150px] lg:mt-[200px]">
      <Landing.CreativeWorks /></div>
      <div className="w-screen-2xl mx-auto pt-[20px] mt-[100px] lg:mt-[200px] lg:translate-x-[0px] mt-[200px] lg:mt-[0px]">
        <Landing.CreativeCommunity />
      </div>
    </Page>
  );
};

export default FansPage;
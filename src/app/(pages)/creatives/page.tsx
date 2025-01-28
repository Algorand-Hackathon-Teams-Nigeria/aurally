// src/app/(pages)/fans/page.tsx

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
        <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32 md:space-y-36">
        <Landing.AboutUsCreatives />
        <Landing.CreativeBanner />
        <Landing.ForCreatives />
        <Landing.CreativeWorks />
        <Landing.CreativeCommunity />
        </div>
       
      </Page>
     
  );
};

export default FansPage;
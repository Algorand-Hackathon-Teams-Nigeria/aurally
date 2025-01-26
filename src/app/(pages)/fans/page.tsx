// src/app/(pages)/fans/page.tsx

import { Metadata } from "next";
import Page from "@atoms/a-page";
import FansLayout from "./layout";

import Landing from "@page-sections/landing";
import BallGradient from "@/app/components/BallGradient";


export const metadata: Metadata = {
  title: "Fans | Aurally",
};

const FansPage = () => {
  return (
    <FansLayout> 
    <Page className="mt-0 px-0 lg:px-0 p-0 lg:py-0 gap-0 lg:gap-0">
        
       
        <Landing.HomePage />
        <Landing.AppStatistics />
        <div className="px-[4.5%] max-w-[calc(1200px+9%)] mx-auto space-y-20 sm:space-y-32 md:space-y-36">
        <Landing.AboutUsNew />
        <Landing.LandingSection />
        <Landing.ForCreatorsNew />
        <Landing.How_it_works />
        <Landing.NewCommunity />
        </div>
       
      </Page>
      </FansLayout> 
  );
};

export default FansPage;
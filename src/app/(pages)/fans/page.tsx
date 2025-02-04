import { Metadata } from "next";
import Page from "@atoms/a-page";

import Landing from "@page-sections/landing";

export const metadata: Metadata = {
  title: "Fans | Aurally",
};

const FansPage = () => {
  return (
    <Page className="mt-0 px-0 lg:px-0 p-0 lg:py-0 gap-0 lg:gap-0">
      <div className="lg:mt-[0px] mt-[0px]"> 
        <Landing.HomePage />
        <Landing.AppStatistics />
        
        {/* Adjusting the container to allow overflow */}
        <div className="w-full h-auto mx-auto space-y-20 sm:space-y-32 md:space-y-36">
          <div className="max-w-screen-lg mx-auto pt-[20px]">
            <Landing.AboutUsNew />
          </div>
          <Landing.LandingSection />
          <div className="max-w-screen-lg mx-auto pt-[20px]">
            <Landing.ForCreatorsNew />
          </div>
          <Landing.SupportText />
          <Landing.How_it_works />
          <Landing.NewCommunity />
        </div>
      </div>
    </Page>
  );
};

export default FansPage;

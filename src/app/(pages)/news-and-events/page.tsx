import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";
import NewsAndEvents from "@page-sections/news";
import BallGradient from "@components/BallGradient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | Aurally",
  description: "Find out what's the latest developments on Aurally",
};

const NewsAndEventPage = () => {
  return (
    <Page className="lg:px-0 px-0">
      <BallGradient leftOrRight="left-0" topOrBottom="top-[600px]" />
      <BallGradient leftOrRight="right-0" topOrBottom="bottom-[600px]" />
      <div className="lg:px-36 px-4">
        <NewsAndEvents.Launch />
      </div>
      <Landing.AppStatistics withGap={false} />
      <div className="lg:px-36 px-4 flex flex-col gap-28 lg:gap-52 ">
        <Landing.Events title="Recents Events" />
        <div className=" pt-[20px] translate-y-[250px] lg:translate-y-[400px] lg:translate-x-[0px] translate-x-[0px]">
        <Landing.FAQS /></div>
        
      </div>
      <div className="w-screen-2xl  mx-auto pt-[20px] translate-y-[45px] lg:translate-y-[-100px] translate-x-[25px]">
      <Landing.ProductCommunity /></div>
    </Page>
  );
};

export default NewsAndEventPage;

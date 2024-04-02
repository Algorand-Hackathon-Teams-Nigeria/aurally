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
        <Landing.FAQS />
        <Landing.Community />
      </div>
    </Page>
  );
};

export default NewsAndEventPage;

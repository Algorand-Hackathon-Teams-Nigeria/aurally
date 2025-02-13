import { Metadata } from "next";
import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";
import Academy from "@page-sections/academy";
import BallGradient from "@/app/components/BallGradient";

export const metadata: Metadata = {
  title: "Academy | Aurally",
};

const AcademyPage = () => {
  return (
    <Page>
      <Academy.Hero />
      <Academy.Blog />
      <Landing.AcademyWorks />
      <div className=" pt-[20px] translate-y-[250px] lg:translate-y-[400px] lg:translate-x-[0px] translate-x-[0px]">
      <Landing.FAQS /></div>
      <div className="w-screen-2xl  pt-[20px] translate-y-[45px] lg:translate-y-[-100px]">
      <Landing.ProductCommunity /></div>
      <BallGradient topOrBottom="bottom-2" leftOrRight="left-2" />
    </Page>
  );
};

export default AcademyPage;

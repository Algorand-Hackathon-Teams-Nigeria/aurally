import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";
import Academy from "@page-sections/academy";
import BallGradient from "@/app/components/BallGradient";

const AcademyPage = () => {
  return (
    <Page>
      <Academy.Hero />
      <Academy.Blog />
      <Landing.HowItWorks />
      <Landing.FAQS />
      <Landing.Community />
      <BallGradient topOrBottom="bottom-2" leftOrRight="left-2" />
    </Page>
  );
};

export default AcademyPage;

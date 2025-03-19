import Page from "@atoms/a-page";
import  Art  from "@/app/components/page-sections/landing/pl-admin/approvals/art"
import { Metadata } from "next";



export default function LandingPage() {
  return (
    <Page className="mt-0 px-0 lg:px-0 p-0 lg:py-0 gap-0 lg:gap-0">
      <Art />
     
    </Page>
  );
}
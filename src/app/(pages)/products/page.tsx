import { Metadata } from "next";
import Page from "@atoms/a-page";
import Landing from "@page-sections/landing";
import Products from "@page-sections/products";
import BallGradient from "@/app/components/BallGradient";

export const metadata: Metadata = {
  title: "Products | Aurally",
};

const ProductPage = () => {
  return (
    <Page>
      <BallGradient topOrBottom="top-20" leftOrRight="right-[25%]" />
      <Products.Streaming />
      {/*<Products.StreamAndEarn />
      <Products.FractionalNFTs />
      <Products.P2PExchange />
      <Products.AurallyDAO />*/}
      <div className="w-screen-2xl mx-auto pt-[20px]">
      <Landing.ProductCommunity /></div>
    </Page>
  );
};

export default ProductPage;

import BallGradient from "@/app/components/BallGradient";
import ProductPromotion from "@atoms/a-product-promotion";

const StreamAndEarn = () => {
  return (
    <section className="relative" id="stream-and-earn">
      <BallGradient topOrBottom="-bottom-20" leftOrRight="left-0" />
      <ProductPromotion
        bordered
        reversed
        title="Stream And Earn"
        iconUrl="/images/gift_gradient.svg"
        heroUrl="/images/stream_and_earn.svg"
        link={`${process.env.NEXT_PUBLIC_APP_URL}/explore`}
      >
        <p>
          Stream your favorite song/videos and earn rewards in cryptocurrency
          and NFTs.
        </p>
      </ProductPromotion>
    </section>
  );
};

export default StreamAndEarn;

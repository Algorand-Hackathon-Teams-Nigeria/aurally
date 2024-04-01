"use client";
import ProductPromotion from "@atoms/a-product-promotion";

const Streaming = () => {
  return (
    <section id="sreaming">
      <ProductPromotion
        bordered
        title="Music/Video Streaming"
        iconUrl="/images/play_gradient.svg"
        heroUrl="/images/video_streaming.svg"
        link={`${process.env.NEXT_PUBLIC_APP_URL}/create/sound`}
      >
        <p>
          Start by seamlessly connecting your digital wallet to the platform.
          Our application supports various blockchain networks, ensuring
          compatibility with popular cryptocurrencies. Your wallet is your
          secure gateway to the world of NFTs.
        </p>
      </ProductPromotion>
    </section>
  );
};

export default Streaming;

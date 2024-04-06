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
          Stream high quality music and videos from top and fast rising
          artists/creators worldwide across diverse genres on Aurally
        </p>
      </ProductPromotion>
    </section>
  );
};

export default Streaming;

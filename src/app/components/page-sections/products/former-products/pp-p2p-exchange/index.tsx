import ProductPromotion from "@atoms/a-product-promotion";

const P2PExchange = () => {
  return (
    <section id="p2p-exchange">
      <ProductPromotion
        bordered
        reversed
        title="P2P Exchange"
        iconUrl="/images/p2p_gradient.svg"
        heroUrl="/images/p2p.svg"
        link="Coming Soon"
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

export default P2PExchange;

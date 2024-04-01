import ProductPromotion from "@atoms/a-product-promotion";

const FractionalNFTs = () => {
  return (
    <section id="fractional-nfts">
      <ProductPromotion
        bordered
        title="Fractional NFTs"
        iconUrl="/images/image_gradient.svg"
        heroUrl="/images/fractional_nfts.svg"
        link="Coming Soon"
      >
        <ul className="flex flex-col gap-2">
          <li>Royalty split</li>
          <li>Public GoFundMe</li>
          <li>Private GoFundMe</li>
        </ul>
      </ProductPromotion>
    </section>
  );
};

export default FractionalNFTs;

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
        <ul className="flex flex-col gap-8">
          <li className="flex flex-col gap-4">
            <h4 className="font-medium text-lg">Royalty split</h4>
            <p>
              Creators can tokenize their project(art, music or videos) allowing
              fans purchase fractions of it and earn royalties from the project
              sales.
            </p>
          </li>
          <li className="flex flex-col gap-4">
            <h4 className="font-medium text-lg">GoFundMe</h4>
            <p>
              Creators offer fractional ownership of future project royalties in
              exchange for upfront funding for the project
            </p>
          </li>
        </ul>
      </ProductPromotion>
    </section>
  );
};

export default FractionalNFTs;

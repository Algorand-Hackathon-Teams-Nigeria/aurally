import BallGradient from "@/app/components/BallGradient";
import ProductPromotion from "@atoms/a-product-promotion";

const AurallyDAO = () => {
  return (
    <section className="relative" id="aurally-dao">
      <BallGradient topOrBottom="bottom-40" leftOrRight="-right-32" />
      <ProductPromotion
        title="Aurally DAO"
        iconUrl="/images/stocks_gradient.svg"
        heroUrl="/images/aurally_dao.svg"
        link="Coming Soon"
      >
        <div className="flex mt-4 flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-3xl">Voting</h4>
            <p>
              Embrace a new era of decision-making where every participant has a
              voice. Our DAO governance model ensures that major decisions about
              the platform&apos;s development, policies, and future directions
              are collectively made by the community.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-3xl">Forum Discussion</h4>
            <p>
              Start by seamlessly connecting your digital wallet to the
              platform. Our application supports various blockchain networks,
              ensuring compatibility with popular cryptocurrencies. Your wallet
              is your secure gateway to the world of NFTs.
            </p>
          </div>
        </div>
      </ProductPromotion>
    </section>
  );
};

export default AurallyDAO;

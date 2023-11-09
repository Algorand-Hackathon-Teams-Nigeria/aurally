import { Carousel } from '@mantine/carousel'
import MusicCard from '../../components/MusicCard'
import MyCarousel from '../../components/MyCarousel'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

const assetList = [1]

const WithAsset = () => {
  return (
    <>
      <div className="mb-10">
        <div className="headTag">Recently Aquired</div>
        <MyCarousel>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="Bid"
                title3="Tyler Faye"
                title4="0.25 ETH"
                key={item}
                buttonLabel="Sell Now"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
      <div className="mb-10">
        <div className="headTag">A Month Ago</div>
        <MyCarousel>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="Bid"
                title3="Tyler Faye"
                title4="0.25 ETH"
                key={item}
                buttonLabel="Sell Now"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
    </>
  )
}

const Assets = () => {
  return (
    <div className="routePageNoRight pb-32">
      <div className="routeName mb-10">Assets</div>
      {assetList.length > 0 ? (
        <WithAsset />
      ) : (
        <>
          <div>You don't have any assets in your wallet. Check out the marketplace for available sales.</div>
          <Link to="/marketplace">
            <Button className="mt-8" size="md" px={40}>
              Go to Marketplace
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

export default Assets

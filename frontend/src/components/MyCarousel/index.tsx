import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import classes from './carousel.module.css'

const MyCarousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Carousel classNames={classes} containScroll="trimSnaps" slideGap={20} slidesToScroll={'auto'} align="end">
      {children}
    </Carousel>
  )
}

export default MyCarousel

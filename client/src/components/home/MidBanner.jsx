import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { Box, Grid, Typography, styled } from '@mui/material'

const Wrapper = styled(Box)`
    margin-top: 10px;
    background-color: white;
`
const ImageComponent = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: "none",
    },
}))

const Image = styled('img')(({ theme }) => ({
    width: '98%',
    height: '100%',
    objectFit: 'contain',
}))

const Component = styled(Carousel)(({ theme }) => ({
    width: "100",
    height: "100"
    // display: "none",
    // [theme.breakpoints.down('md')]: {
    //     display: "block",

    // },
}))
const MidBanner = ({ src }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    return (
        <Wrapper>
            {src &&
                <ImageComponent>
                    <Image src={src} />
                </ImageComponent>
            }
            {/* <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container">
                <Box>

                    <Typography>Hi</Typography>
                </Box>
                <Box>

                    <Typography>Hi 2</Typography>
                </Box>
                <Box>

                    <Typography>Hi 3</Typography>
                </Box>
                <Box>

                    <Typography>Hi 4</Typography>
                </Box>
            </Carousel> */}
        </Wrapper>
    )
}

export default MidBanner

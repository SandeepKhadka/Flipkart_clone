import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../constants/data";
import { Box, styled } from "@mui/material";

const BannerImage = styled('img')(({ theme }) => ({
    width: "100%",
    height: 280,
    [theme.breakpoints.down('md')]: {
        height: 120,
        objectFit: "cover",
        // marginTop: "15px",
    },
}))

const Banner = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    return (
        <>
            <Carousel
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
                containerClass="carousel-container"
            >
                {
                    bannerData.map((data, index) => (
                        <Box>
                            <BannerImage src={data.url} alt="banner" key={index} />
                        </Box>
                    ))
                }
            </Carousel>
        </>
    )
}

export default Banner

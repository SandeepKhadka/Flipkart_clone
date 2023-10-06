import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { Box, Button, Grid, Typography, styled } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ViewAll from './ViewAll';
import { Link } from 'react-router-dom';


const Wrapper = styled(Box)(({ theme }) => ({
    // background: 'white',
}))

const Component = styled(Carousel)(({ theme }) => ({
    background: 'white',
    height: 350,
    [theme.breakpoints.down('xl')]: {
        height: 300,
        // marginTop: "15px",
    },
    /* height: 360.2px; */
    /* margin-top: -9px; */
    /* align-items: center; */
    /* background-color: green; */
    /* margin-bottom: 10px; */
}))

const ImageComponent = styled(Box)`
    /* width: 232px; */
    /* height: 341.6px; */
    /* padding: 25px 15px; */
    /* background-color: red; */
    text-align: center;
    cursor: pointer;
    /* color: black; */
    /* width: 202, height: 341.6 */
`
const ProductImage = styled('img')({
    width: 171.5,
    height: 200,
    objectFit: "contain",
    margin: '0 7.125px',
    // marginRight: 2,
    // marginLeft: 2
})

const TopComponent = styled(Typography)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('xl')]: {
        background: 'white',
        height: "20px",
        display: "flex",
        padding: "10px 20px",
        justifyContent: "space-between",
        alignItems: "center",
        // marginTop: "15px",
    },
}))

const TopText = styled(Typography)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down('xl')]: {
        display: "block",
        fontSize: 20,
        zIndex: 100
    },
}))

const Slider = ({ products, title}) => {
    const filteredProducts = products.filter(product => product.category === title);
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
            <TopComponent>
                <TopText>{title}</TopText>
                <ViewAll />
            </TopComponent>
            <Component
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
                    filteredProducts.map((product, index) => (
                        <Link to={`product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <ImageComponent>
                                {product.image && product.image !== '' ?
                                    <ProductImage src={product.image} alt="products" key={index} />
                                    :
                                    <ProductImage src={product.url} alt="products" key={index} />
                                }
                                <Typography>{product.title.shortTitle}</Typography>
                            </ImageComponent>
                        </Link>
                    ))
                }

            </Component>
        </Wrapper >
    )
}

export default Slider

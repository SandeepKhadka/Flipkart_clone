import { Box, Grid, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import ProductImage from './ProductImage';
import { blue } from '@mui/material/colors';
import Header from '../header/Header';


const Wrapper = styled(Box)(({ theme }) => ({
    padding: '0px 70px',
    background: '#F2F2F2',
    [theme.breakpoints.down('lg')]: {
        // display: "none",
        // maxWidth: '500px',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        background: '#fff',

    },
}))

const Container = styled(Grid)(({ theme }) => ({
    display: 'flex',
    background: 'white',
    gap: '0px 20px',
    [theme.breakpoints.down('lg')]: {
        // display: "none",
        // maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    /* justify-content: space-evenly; */
}))

const ImageComponent = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        alignSelf: 'center',
    },
}))
const DetailComponent = styled(Grid)(({ theme }) => ({
    /* display: flex; */
    /* flex-direction: column; */
    maxWidth: '600px',
    marginTop: '50px',
    fontFamily: "'Roboto', Arial, sans-serif",
    [theme.breakpoints.down('lg')]: {
        marginLeft: 10,
        alignSelf: 'center',
    },
    /* margin-left: 50px; */
}))
const Title = styled(Typography)`
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 18px;
    /* margin-left: 50px; */
`
const Rating = styled(Typography)`
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 14px;
    color: #2874f0;
    font-weight: 500;
    /* margin-left: 50px; */
`
export const PriceDetail = styled(Typography)`
    font-family: 'Roboto', Arial, sans-serif;
    color: #212121;
    display: flex;
    align-items: center;
    gap: 0px 30px;
    /* margin-left: 50px; */
`
export const Cost = styled(Box)`
    font-size: 28px;
    color: #212121;
    /* margin-left: 50px; */
`

const ProductDetail = () => {

    const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
    const { loading, product } = useSelector(state => state.getProductDetails)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (product && id !== product.id)
            dispatch(getProductDetails(id))
    }, [dispatch, id, product, loading])

    // const title = product.map(p => p.title);


    // {
    //     console.log(title);
    // }
    return (
        <Wrapper>
            <Header />
            {
                product && Object.keys(product).length &&
                <Container container spacing={2}>
                    {/* <ImageComponent item xl={4} ls={4} md={8} sm={8} xs={12}> */}
                    <ImageComponent>
                        <ProductImage product={product} />
                    </ImageComponent>
                    {/* <DetailComponent item xl={4} ls={4} md={8} sm={8} xs={12}> */}
                    <DetailComponent >
                        <Title>{product.title.longTitle}</Title>
                        <Box style={{ display: 'flex' }}>
                            <Rating>Be the first one to rate this product</Rating>
                            <Box ><img src={fassured} alt="" style={{ width: 77, marginLeft: 10 }} /></Box>
                        </Box>
                        <PriceDetail>
                            <Cost>रु{product.price.cost}</Cost>
                            <Box style={{ color: '#878787', fontSize: 16 }}><strike>रु{product.price.mrp}</strike></Box>
                            <Box style={{ color: '#388e3c', fontSize: 16 }}>{product.price.discount} off</Box>
                        </PriceDetail>
                        <Typography style={{ fontSize: 13, marginTop: 20, color: '#898686' }}>Description</Typography>
                        <Typography style={{ width: 600, textAlign: 'justify' }}>{product.description}</Typography>
                    </DetailComponent>

                </Container>
            }
        </Wrapper>
    )
}

export default ProductDetail

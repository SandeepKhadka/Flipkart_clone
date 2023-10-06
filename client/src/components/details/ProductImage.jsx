import { Box, Button, styled } from '@mui/material'
import React, { useState } from 'react'
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';

const Component = styled(Box)(({ theme }) => ({
    // minWidth: '46%',
    width: 500,
    /* border: 1px solid #ece8e8; */
    marginTop: '50px',
    [theme.breakpoints.down('xl')]: {
        // display: "none",
        width: 350,
    },
    [theme.breakpoints.down('lg')]: {
        // display: "none",
        width: 600,
    },
    [theme.breakpoints.down('ls')]: {
        // display: "none",
        width: 350,
    },

}))
const ImageComponent = styled(Box)(({ theme }) => ({
    border: '1px solid #ece8e8',
    marginBottom: 5,
    [theme.breakpoints.down('md')]: {
        // display: "none",
        width: 250,
    },

}))

const Image = styled('img')(({ theme }) => ({
    height: 400,
    width: 'auto',
    padding: '20px 80px 20px 80px',
    [theme.breakpoints.down('xl')]: {
        // display: "none",
        // width: 250,
        height: 250,
    },
    [theme.breakpoints.down('lg')]: {
        // display: "none",
        width: 500,
        height: 500,
        objectFit: 'contain',
    },
}))

const ButtonComponent = styled(Box)`
/* min-width: 50%; */
/* padding: 10px 5px 5px 10px; */
/* background: red; */
display: flex;
`

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: '49.5%',
    padding: '18px 0',
    color: '#fff',
    fontFamily: "'Roboto', Arial, sans-serif",
    fontWeight: 500,
    fontSize: 16,
    borderRadius: 2,
}))

const ProductImage = ({ product }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)

    const addItemToCart = () => {
        dispatch(addToCart(product.id, quantity))
        navigate('/cart')
    }

    return (
        <Component>
            <ImageComponent>
                {product.image && product.image !== '' ?
                    <Image src={product.image} alt="product" />
                    :
                    <Image src={product.detailUrl} alt="product" />
                }
            </ImageComponent>
            <ButtonComponent>
                <StyledButton style={{ marginRight: 5, background: '#ff9f00' }} variant='contained' onClick={() => addItemToCart()}> <Cart />Add to Cart</StyledButton>
                <StyledButton variant='contained' style={{ background: '#fb641b' }}><Flash />Buy Now</StyledButton>
            </ButtonComponent>
        </Component>
    )
}

export default ProductImage

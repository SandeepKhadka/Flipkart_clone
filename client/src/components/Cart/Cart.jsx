import { Box, Button, Card, CardContent, Grid, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import CartItems from './CartItems'
import { Link } from 'react-router-dom'
import Header from '../header/Header'


const Wrapper = styled(Box)(({ theme }) => ({
    // padding: '0px 70px',
    // width: '100%',
    background: '#F2F2F2',
    height: '100%',
    [theme.breakpoints.down('md')]: {
        minWidth: '500px',
        // overflow: 'hidden',
    },
    // [theme.breakpoints.down('lg')]: {
    //     background: '#fff',

    // },
}))


const Component = styled(Box)(({ theme }) => {
    return ({
        //  minWidth: '90%',
        // width: '80%',
        display: 'flex',
        // gap: '0 50px',
        justifyContent: "center",
        // marginLeft: '50px',
        padding: '30px 50px',
        // background: 'red',
        margin: 'auto', // Center horizontally
        [theme.breakpoints.down('xl')]: {
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            background: '#fff',

        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fff',
        },
    })
})

const LeftWrapper = styled(Box)(({ theme, width }) => ({
    width: width, border: '1px solid #ece1e1', marginRight: '20px',
    "& >p": {
        whiteSpace: 'nowrap'
    },
    [theme.breakpoints.down('xl')]: {
        width: '90%',
        marginBottom: '20px',
    },
    [theme.breakpoints.down('md')]: {
        minWidth: '500px',
        marginBottom: '20px',
        boxSizing: 'border-box',
        // marginRight: '12px'
        // margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: '450px',
        marginBottom: '20px',
        boxSizing: 'border-box',
        // marginRight: '12px'
        // margin: 'auto',
    },
    // [theme.breakpoints.down('lg')]: {
    //     width: '90%',
    // },
    // [theme.breakpoints.down('md')]: {
    //     width: '90%',
    // },
}))


const TopWrapper = styled(Box)(({ theme }) => ({
    // width: '70%',
    display: 'flex',
    justifyContent: "space-around",
    background: '#ffffff',
    padding: '20px 5px',
    borderRadius: '2px'
}))

const MidWrapper = styled(Box)(({ theme }) => ({
    marginTop: '10px',
    display: 'flex',
    justifyContent: "space-between",
    background: '#ffffff',
    padding: '16px 20px',
    borderRadius: '2px'
}))

const BottomWrapper = styled(Box)(({ theme }) => ({
    marginTop: '10px',
    display: 'flex',
    justifyContent: "space-between",
    background: '#ffffff',
    padding: '16px 20px',
    borderRadius: '2px'
}))

const PlaceOrder = styled(Box)(({ theme }) => ({
    marginTop: '2px',
    display: 'flex',
    alignItems: 'flex-end',
    background: '#ffffff',
    padding: '20px 5px',
    borderRadius: '2px',
    position: 'relative',
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.5)',
    '&:before': {
        content: "''",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100 %',
        height: 5, /* Adjust this value to control the height of the blurred border */
        backgroundColor: 'transparent', /* Transparent background for the pseudo-element */
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', /* Apply a box shadow to create the blurred effect *z/ - index: 1; /* Ensure the pseudo-element appears above the content */
    },
    [theme.breakpoints.down('xl')]: {
        display: 'none'
    },
}))

const ResponsivePlaceOrder = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('xl')]: {
        marginTop: '2px',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#ffffff',
        padding: '20px 5px',
        borderRadius: '2px',
        position: 'relative',
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.5)',
        '&:before': {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100 %',
            height: 5, /* Adjust this value to control the height of the blurred border */
            backgroundColor: 'transparent', /* Transparent background for the pseudo-element */
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', /* Apply a box shadow to create the blurred effect *z/ - index: 1; /* Ensure the pseudo-element appears above the content */
        }
    }

}))

const PlaceOrderButton = styled(Button)(({ theme }) => ({
    width: 250,
    height: 51,
    padding: '16px 30px',
    background: '#fb641b',
    color: '#fffff',
    fontSize: '16px',
    marginRight: 15,
    borderRadius: 2,
    '&:hover': {
        background: '#fb641b'
    }
}))

const SideWrapper = styled(Box)(({ theme }) => ({
    width: '25%',
    height: '260px',
    display: 'flex',
    justifyContent: "space-between",
    background: '#ffffff',
    padding: '10px 10px',
    // [theme.breakpoints.down('xl')]: {
    //     width: '50%',
    // },
    [theme.breakpoints.down('xl')]: {
        minWidth: '500px',
        margin: 'auto',
    },
}))

const DeliveryButton = styled(Button)(({ theme }) => ({
    padding: '10px 16px', background: '#fffff',
    border: '1px solid #f0e6e6',
    borderRadius: '1px',
}))

const PriceDetails = styled(Typography)(({ theme }) => ({
    color: '#878787',
    marginLeft: '15px',
    fontSize: '16px',
    [theme.breakpoints.down('xl')]: {
        fontSize: '18px',
    },
}))

const PriceBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    marginLeft: '15px',
    '& > p': {
        fontWeight: 400,
        fontSize: '16px',
        color: '#212121'
    },
    [theme.breakpoints.down('xl')]: {
        width: '500px',
        display: 'flex',
        justifyContent: "space-between",
        // background: 'red',
        '& > p': {
            fontWeight: 400,
            fontSize: '18px',
            color: '#212121'
        },
    },
    [theme.breakpoints.down('md')]: {
        width: '400px',
        display: 'flex',
        justifyContent: "space-between",
        // background: 'red',
        '& > p': {
            fontWeight: 400,
            fontSize: '16px',
            color: '#212121'
        },
    },
}))

const TotalBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '15px',
    '& > p': {
        fontWeight: 600,
        fontSize: '18px',
        color: '#212121'
    },
}))

const Save = styled(Typography)(({ theme }) => ({
    marginBottom: '15px',
    marginLeft: '15px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#388e3c',

}))

const EmptyCart = styled(Box)(({ theme }) => ({
    height: 300,
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    gap: '20px 0px',
    background: '#ffffff',
    padding: '16px 20px',
    borderRadius: '2px',
    "& > p": {
        fontSize: '18px',
    }
}))

const BlueHorizontalLine = styled('hr')(({ theme }) => ({
    border: '1px solid #2a55e5', background: 'blue', padding: '0.1px 0.1px', width: '300px', position: 'absolute', marginTop: '41px', marginLeft: '-110px',
    [theme.breakpoints.down('xl')]: {
        width: '250px',
        marginLeft: '-90px'
    },
    [theme.breakpoints.down('md')]: {
        width: '150px',
        marginLeft: '-50px'
    },
}))

const GreyHorizontalLine = styled('hr')(({ theme }) => ({
    width: '350px', marginLeft: '-20px', border: '1px solid #f4f2f2',
    [theme.breakpoints.down('xl')]: {
        width: '500px',
        marginLeft: '10px',
    },
    [theme.breakpoints.down('md')]: {
        width: '300px',
        marginLeft: '10px',
    },
}))

const Cart = () => {

    const { cartItems } = useSelector(state => state.cart)
    const width = cartItems.length > 0 ? '60%' : '80%';
    let actualPrice = 0, totalDiscount = 0, totalAmount = 100, discountDecimal = 0, discountAmount = 0;

    {
        cartItems.map(item => (
            discountDecimal = parseFloat(item.price.discount) / 100,
            discountAmount = item.price.mrp - (item.price.mrp * discountDecimal),
            totalDiscount = totalDiscount + discountAmount,
            actualPrice = actualPrice + item.price.mrp,
            totalAmount = totalAmount + item.price.cost
        ))
    }
    return (
        <Wrapper>
            <Header />
            <Component>
                <LeftWrapper width={width}>
                    <TopWrapper>
                        <Box style={{ display: 'flex', flexDirection: 'column', }}>
                            <Typography style={{ color: '#2a55e5', cursor: 'pointer' }}>Flipkart</Typography>
                            <BlueHorizontalLine />
                        </Box>
                        <Box>
                            <Typography style={{ cursor: 'pointer' }}>Grocery</Typography>
                        </Box>
                    </TopWrapper>
                    {cartItems.length > 0 ?
                        <MidWrapper>
                            <Box>
                                <Typography style={{ fontSize: '14px', marginTop: '10px' }}>From Saved Addresses</Typography>
                            </Box>
                            <Box>
                                <DeliveryButton><Typography style={{ fontSize: '12px', color: '#2874f0', fontWeight: 500 }}> Enter Delivery Pin Code </Typography></DeliveryButton>
                            </Box>
                        </MidWrapper>
                        :
                        <EmptyCart>
                            <Typography>Your cart is empty!!</Typography>
                            <Link to='/products'>
                                <Button variant='contained'>Go to shopping</Button>
                            </Link>
                        </EmptyCart>
                    }
                    {cartItems.length > 0 &&
                        <BottomWrapper>
                            <CartItems cartItems={cartItems} />
                        </BottomWrapper>
                    }
                    {cartItems.length > 0 &&
                        <PlaceOrder>
                            <Box style={{ flex: 1 }}></Box>
                            <Link to='/order'>
                                <PlaceOrderButton variant='contained' style={{ alignSelf: 'flex-end' }}>Place Order</PlaceOrderButton>
                            </Link>
                        </PlaceOrder>
                    }
                </LeftWrapper>
                {cartItems.length > 0 &&
                    <SideWrapper>
                        <Typography>
                            <PriceDetails style={{ textTransform: 'uppercase' }}>Price Details</PriceDetails>
                            <GreyHorizontalLine />
                            <PriceBox>
                                <Typography>Price ({cartItems.length} item)</Typography>
                                <Typography>रु {actualPrice}</Typography>
                            </PriceBox>
                            <PriceBox>
                                <Typography>Discount</Typography>
                                <Typography>रु {totalDiscount.toFixed(2)}</Typography>
                            </PriceBox>
                            <PriceBox>
                                <Typography>Delivery Charges</Typography>
                                <Typography>100</Typography>
                            </PriceBox>
                            <GreyHorizontalLine />
                            <TotalBox>
                                <Typography>Total Amount</Typography>
                                <Typography>रु {totalAmount}</Typography>
                            </TotalBox>
                            <GreyHorizontalLine />
                            <Save>You will save रु{totalDiscount.toFixed(2)} on this order</Save>
                            <ResponsivePlaceOrder>
                                <Box style={{ flex: 1 }}></Box>
                                <Link to='/order'>
                                    <PlaceOrderButton variant='contained' style={{ alignSelf: 'flex-end' }}>Place Order</PlaceOrderButton>
                                </Link>
                            </ResponsivePlaceOrder>
                        </Typography>
                    </SideWrapper>
                }
            </Component >
        </Wrapper >
    )
}

export default Cart

import { Box, Button, Card, CardContent, Grid, Typography, styled } from '@mui/material'
import { red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Header from '../header/Header'
import BillingDetails from './BillingDetails'
import { useEffect, useState } from 'react'
import PaymentMethod from './PaymentMethod'
import axios from 'axios'
import { storeOrderData, validateBillingData } from '../../service/api'
import { getAuthToken } from '../../auth/auth'


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
    // textAlign: 'center',
    background: '#ffffff',
    padding: '16px 30px',
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

const Order = () => {

    const { cartItems } = useSelector(state => state.cart)
    const width = '60%';
    const authToken = getAuthToken()
    const [billingData, setBillingData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        country: 'Nepal',
        state: '',
        city: '',
        streetNo: '',
        postalcode: '',
        email: '',
        phone: '',
    })

    const [billingDataErrors, setBillingDataErrors] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        country: '',
        state: '',
        city: '',
        streetNo: '',
        postalcode: '',
        email: '',
        phone: '',
    });

    const [shippingData, setShippingData] = useState({
        sfirstname: '',
        smiddlename: '',
        slastname: '',
        sstate: '',
        scity: '',
        sstreetNo: '',
        spostalcode: '',
        semail: '',
        sphone: ''
    })

    const [shippingDataErrors, setShippingDataErrors] = useState({
        sfirstname: '',
        smiddlename: '',
        slastname: '',
        sstate: '',
        scity: '',
        sstreetNo: '',
        spostalcode: '',
        semail: '',
        sphone: '',
    });

    const [payment, setPayment] = useState({
        paymentMethod: '',
        paymentStatus: ''
    });

    const [paymentErrors, setPaymentErrors] = useState({
        paymentMethod: '',
        paymentStatus: ''
    });

    const [order, setOrder] = useState({
        totalAmount: 0, // Initial value, you can change this
        sub_total: 0, // Initial value, you can change this
        discount: 0, // Initial value, you can change this
        deliveryCharge: 100,
        ...payment,
        ...billingData,
        ...shippingData
        // paymentMethod: '',
        // paymentStatus: ''
    });

    const [orderProduct, setOrderProduct] = useState({
        product_id: '',
        quatity: '',
    })
    const [view, setView] = useState('billing')
    let actualPrice = 0, totalDiscount = 0, totalAmount = 100, discountDecimal = 0, discountAmount = 0;

    {
        cartItems.map(item => (
            discountDecimal = parseFloat(item.price.discount) / 100,
            discountAmount = item.price.mrp - (item.price.mrp * discountDecimal),
            totalDiscount = totalDiscount + discountAmount,
            actualPrice = actualPrice + item.price.mrp,
            totalAmount = totalAmount + item.price.cost
            // setOrderProduct({
            //     product_id: item.id,
            //     quatity: item.quatity
            // })
        ))
    }
    // const [order, setOrder] = useState({
    //     totalAmount: totalAmount,
    //     sub_total: actualPrice,
    //     discount: totalDiscount,
    //     deliveryCharge: 100,
    // })

    const restoreErrorState = () => {
        setBillingDataErrors({
            firstname: '',
            middlename: '',
            lastname: '',
            country: '',
            state: '',
            city: '',
            streetNo: '',
            postalcode: '',
            email: '',
            phone: '',
        });
        setShippingDataErrors({
            sfirstname: '',
            smiddlename: '',
            slastname: '',
            sstate: '',
            scity: '',
            sstreetNo: '',
            spostalcode: '',
            semail: '',
            sphone: '',
        });
        setPaymentErrors({
            paymentMethod: '',
            paymentStatus: '',
        });
    }
    const placeOrder = async () => {
        try {
            restoreErrorState();

            if (view === 'billing') {
                const response = await validateBillingData({ ...billingData, ...shippingData });
                console.log(response);

                if (response.status !== 200) {
                    if (response.response.data.error) {
                        const errorMessages = {};
                        response.response.data.error.forEach((error) => {
                            const { msg, params } = error;
                            errorMessages[params] = msg;
                        });
                        setBillingDataErrors(errorMessages);
                        setShippingDataErrors(errorMessages);
                    }
                } else if (response.status === 200) {
                    setView('payment');
                }
            } else {
                // Store the previous order state

                // setOrder({
                //     ...order,
                //     ...payment,
                //     ...billingData,
                //     ...shippingData,
                // });
                const mergedOrder = {
                    ...order,
                    ...payment,
                    ...billingData,
                    ...shippingData,
                };

                // const previousOrder = { ...order };
                console.log(order)
                const response = await storeOrderData(mergedOrder);
                console.log(response);

                if (response.status !== 200) {
                    if (response.response.data.error) {
                        const errorMessages = {};
                        response.response.data.error.forEach((error) => {
                            const { msg, params } = error;
                            errorMessages[params] = msg;
                        });
                        setPaymentErrors(errorMessages);

                        // Restore the order state to its previous state
                        // setOrder(previousOrder);/
                    }
                }
                // else if (response.status === '200') {
                //     setOrder({
                //         paymentMethod: '',
                //         paymentStatus: '',
                //         firstname: '',
                //         middlename: '',
                //         lastname: '',
                //         country: 'Nepal',
                //         state: '',
                //         city: '',
                //         streetNo: '',
                //         postalcode: '',
                //         email: '',
                //         phone: '',
                //         sfirstname: '',
                //         smiddlename: '',
                //         slastname: '',
                //         sstate: '',
                //         scity: '',
                //         sstreetNo: '',
                //         spostalcode: '',
                //         semail: '',
                //         sphone: '',
                //     });
                // }
                // Clear order object
            }
        } catch (error) {
            // Handle any other errors
            console.log(error);
        }
    };



    // useEffect(() => {
    //     console.log('Order State:');
    //     for (const key in order) {
    //         if (Object.hasOwnProperty.call(order, key)) {
    //             console.log(`${key}: ${order[key]}`);
    //         }
    //     }
    // }, [order]);

    useEffect(() => {
        cartItems.forEach(item => {
            setOrderProduct({
                product_id: item.id,
                quatity: item.quatity
            });
        });
        setOrder(prevOrder => ({
            ...prevOrder,
            totalAmount: totalAmount,
            sub_total: actualPrice,
            discount: totalDiscount,
            ...payment,
            ...billingData,
            ...shippingData
        }));
    }, [cartItems]);

    if (!authToken && cartItems) {
        alert('Please login to continue')
        return <Navigate to='/cart' />
    }

    if (!authToken || !cartItems) {
        alert('Please login to continue or add some product to cart')
        return <Navigate to='/cart' />

    }

    return (
        <Wrapper>
            <Header />
            <Component>
                <LeftWrapper width={width}>
                    <TopWrapper>
                        <Box style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{ color: view === 'billing' ? '#2a55e5' : '#000', cursor: 'pointer' }} onClick={() => setView('billing')}>Billing Details</Typography>
                        </Box>
                        <Box>
                            <Typography style={{ color: view === 'payment' ? '#2a55e5' : '#000', cursor: 'pointer' }} onClick={() => placeOrder()}>Payment Method</Typography>
                        </Box>

                    </TopWrapper>

                    <BottomWrapper>
                        {
                            view === 'billing' ?
                                <BillingDetails billingData={billingData} setBillingData={setBillingData} shippingData={shippingData} setShippingData={setShippingData} billingDataErrors={billingDataErrors} shippingDataErrors={shippingDataErrors} />
                                :
                                <PaymentMethod payment={payment} setPayment={setPayment} paymentErrors={paymentErrors} />
                        }
                    </BottomWrapper>
                    <PlaceOrder>
                        <Box style={{ flex: 1 }}></Box>
                        <PlaceOrderButton variant='contained' style={{ alignSelf: 'flex-end' }} onClick={() => placeOrder()}>{view === 'billing' ? 'Select Payment' : 'Confirm Order'}</PlaceOrderButton>
                    </PlaceOrder>
                </LeftWrapper>
                {/* {cartItems.length > 0 && */}
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
                            <PlaceOrderButton variant='contained' style={{ alignSelf: 'flex-end' }} onClick={() => placeOrder()}>{view === 'billing' ? 'Select Payment' : 'Confirm Order'}</PlaceOrderButton>
                        </ResponsivePlaceOrder>
                    </Typography>
                </SideWrapper>
                {/* } */}
            </Component >
        </Wrapper >
    )
}

export default Order

import { Box, Typography, styled } from '@mui/material';
import { Cost, PriceDetail } from '../details/ProductDetail';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../redux/actions/cartAction';

const ItemComponent = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '14px', // Add some spacing between items
    borderBottom: '1px solid #ccc', // Add a horizontal line
    padding: '10px', // Add some padding
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '0.5px solid #ccc', // Add a horizontal line

        // gap: '0px'
    },
    [theme.breakpoints.down('sm')]: {
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '0.5px solid #ccc', // Add a horizontal line
        // gap: '0px'
    },
}));

const DeliveryDay = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        alignSelf: 'flex-end',
    },
}));


const CartItems = ({ cartItems }) => {
    const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeItem = (id) => {
        dispatch(removeCart(id))
    }

    return (
        <Box>
            {cartItems.map((item) => (
                <ItemComponent key={item.id}>
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.image && item.image !== '' ?
                            <img src={item.image} alt="" style={{ width: '100px', height: '100px' }} />
                            :
                            <img src={item.url} alt="" style={{ width: '100px', height: '100px' }} />
                        }
                    </Link>
                    {/* <div> */}
                    <Typography style={{ width: '500px' }}>
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box onClick={() => redirectOnClick(item.id)} style={{ width: 400, }}>
                                {item.title.longTitle}
                            </Box>
                        </Link>

                        <Box style={{ color: '#878787', fontSize: 14, }}>
                            {item.title.shortTitle}
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <Box style={{ color: '#878787', fontSize: 14 }}>Seller: Sandeep</Box>
                            <Box ><img src={fassured} alt="" style={{ width: 55, marginLeft: 10 }} /></Box>
                        </Box>
                        <PriceDetail style={{ gap: '0px 10px', marginTop: '10px' }}>
                            <Box style={{ color: '#878787', fontSize: 14 }}><strike>रु{item.price.mrp}</strike></Box>
                            <Cost style={{ fontSize: 20 }}>रु{item.price.cost}</Cost>
                            <Box style={{ color: '#388e3c', fontSize: 14 }}>{item.price.discount} Off</Box>
                        </PriceDetail>
                        <Typography style={{ display: 'flex', marginTop: '10px' }}>
                            <Box style={{ textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontSize: '16px', }}>Save for later</Box>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Box style={{ textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontSize: '16px', }} onClick={() => removeItem(item.id)}>Remove</Box>
                        </Typography>
                    </Typography>
                    <DeliveryDay style={{ fontSize: 14 }}>Delivery in Two Days</DeliveryDay>
                    {/* </div> */}
                </ItemComponent>
            ))
            }
        </Box >
    );
};

export default CartItems;

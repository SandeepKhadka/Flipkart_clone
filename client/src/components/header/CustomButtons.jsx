import { Badge, Box, Button, Typography, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginDialog from '../Login/LoginDialog';
import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    // margin: '0 3% 0 auto',
    '& > button, & > p, & > div': {
        marginRight: '40px',
        fontSize: '16px',
        alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 30px',
        '& > button, & > p, & > div': {
            marginLeft: '40px',
            marginTop: '10px',
            fontSize: '20px',
        },
    },
    [theme.breakpoints.down('lg')]: {
        marginLeft: 10,
    },
}));

const Text = styled(Typography)(({ theme }) => ({
    marginTop: 3, width: 135,
    [theme.breakpoints.down('md')]: {
        width: 180,
        textAlign: 'center',
    },
}));

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        '& > p, & > div': {
            fontSize: '20px',
        },
    },
}))
const LoginButton = styled(Button)`
    color: #2874f0;
    background: #ffffff;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
    &:hover{
        background-color: #fafcfc;
    }
`

const CustomButtons = () => {

    const { cartItems } = useSelector(state => state.cart)

    const [open, setOpen] = useState(false)

    const { account, setAccount } = useContext(DataContext)

    const openDialog = () => {
        setOpen(true)
    }

    return (

        <Wrapper>{account ? <Profile account={account} setAccount={setAccount} /> :
            <LoginButton variant='contained' onClick={() => openDialog()}>Login</LoginButton>
        }
            <Text>Become a Seller</Text>
            <Typography>More</Typography>
            <Component>
                {
                    cartItems && cartItems.length > 0 ?
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                        :
                        <ShoppingCartIcon />
                }
                <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Cart</Typography>
                </Link>
            </Component>
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    )
}

export default CustomButtons

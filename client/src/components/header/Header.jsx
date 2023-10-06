import { AppBar, Box, Drawer, IconButton, List, Toolbar, Typography, styled } from '@mui/material'
import Search from './Search'
import CustomButtons from './CustomButtons'
import { Link } from 'react-router-dom'
import { Menu } from '@mui/icons-material';
import { useState } from 'react';

const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
`

const Component = styled(Box)`
    margin-left: 12%;
    line-height: 0;
`
const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4,
})

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        color: 'white',
    },
}))

const Header = () => {

    const [open, setOpen] = useState(false);
    const handleDrawerClose = () => {
        setOpen(false)
    }

    const list = <List>
        <CustomButtons />
    </List>

    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton>
                    <Menu onClick={() => setOpen(true)} />
                </MenuButton>
                <Drawer open={open} onClose={handleDrawerClose}>{list}</Drawer>
                <Component>
                    <Link to="/">
                        <img src={logoURL} alt='logo' style={{ width: 75 }} />
                    </Link>
                    <Box style={{ display: "flex" }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{ color: "#FFE500" }}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} />
                    </Box>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header

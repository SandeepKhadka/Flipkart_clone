import { Box, Button, Grid, Typography, styled } from '@mui/material';
import React from 'react'
import Slider from './Slider';
import ViewAll from './ViewAll';

// const LeftColumn = styled .div`
//     display: flex;
//     flex-direction: column;
// `

const Wrapper = styled(Box)`
    width: 100%;
    display: flex;
    /* padding: 8; */
    height: 350px;
    margin-top: 8px;
`

const MidComponent = styled(Box)(({ theme, rightBanner }) => ({
    width: rightBanner ? '70%' : '85%',
    [theme.breakpoints.down('xl')]: {
        width: "100%",
    },
    [theme.breakpoints.down('md')]: {
        width: "100%",
        // marginBottom: "50px"
    },
}));

// const MidComponent = styled(Box)(({ theme, rightBanner }) => ({
//     width: rightBanner ? '70%' : '85%', // Default width when rightBanner is false

//     // [theme.breakpoints.down('xl')]: {
//     //     width: rightBanner ? '85%' : '100%', // Customize for XL screens
//     // },
//     // [theme.breakpoints.down('md')]: {
//     //     width: rightBanner ? '100%' : '100%', // Customize for MD screens
//     // },
// }));

const LeftComponent = styled(Grid)(({ theme }) => ({
    background: 'white',
    width: '15%',
    [theme.breakpoints.down('xl')]: {
        display: "none"
    },
}))


/* height: 360.2px; */
/* margin-top: 10px; */
/* margin-bottom: 10px; */

const LeftBanner = styled(Grid)(({ theme }) => ({
    /* float: left; */
    /* background-color: red; */
    display: "flex",
    height: 360.2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // [theme.breakpoints.down('md')]: {
    //     display: "inline"
    // },
}))

const RightComponent = styled(Grid)(({ theme }) => ({
    width: "15%",
    marginLeft: 10,
    padding: '5px 10px',
    backgroundColor: 'white',
    textAlign: 'center',
    [theme.breakpoints.down('xl')]: {
        display: "none"
    },
    /* height: 360.2px; */
    /* margin-top: 10px; */
}))
const RightImage = styled('img')(({ theme }) => ({
    // height: 340,

}))


const RightBanner = styled(Grid)`
  /* float: right; */
    line-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LeftText = styled(Typography)(({ theme }) => ({
    width: 200,
    fontSize: 30,
    textTransform: "capitalize",
    color: "#212121",
    fontFamily: 'Roboto, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    textAlign: 'center',
    // [theme.breakpoints.down('xl')]: {
    //     width: 200,
    //     fontSize: 15,
    //     textAlign: 'center',

    // },
}))
const LeftItem = styled(Box)`
    display: flex;
    /* height: 361.2px; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
    /* float: left; */

`

const MidSlider = ({ products, rightBanner, title }) => {
    return (
        <Wrapper>
            <LeftComponent >
                <LeftBanner>
                    <LeftText variant='h2'>{title}</LeftText>
                    <ViewAll />
                </LeftBanner>
            </LeftComponent>
            <MidComponent rightBanner={rightBanner}>
                <Slider products={products} title={title} />
            </MidComponent>
            {/* {rightBanner ?
                <MidComponent style={{ width: rightBanner ? '70%' : '85%' }}>
                    <Slider products={products} rightBanner={true} title={title} />
                </MidComponent>
                :
                <MidComponent style={{ width: rightBanner ? '70%' : '85%' }}>
                    <Slider products={products} rightBanner={true} title={title} />
                </MidComponent>
            } */}

            {rightBanner &&
                <RightComponent>
                    <RightBanner>
                        <RightImage src='https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70' alt="" style={{ width: 220 }} />
                    </RightBanner>
                </RightComponent>
            }
        </Wrapper>
    )
}

export default MidSlider

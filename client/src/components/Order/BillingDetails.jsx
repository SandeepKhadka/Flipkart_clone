import { Box, Input, TextField, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'

const BillingContainer = styled(Box)(({ theme }) => ({
    // margin: 'auto'
}))

const ShippingContainer = styled(Box)(({ theme }) => ({
    // margin: 'auto'
}))
const BillingDetails = ({ billingData, setBillingData, shippingData, setShippingData, billingDataErrors, shippingDataErrors }) => {

    const [isChecked, setIsChecked] = useState(false)

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData({
            ...billingData,
            // ...shippingData,
            [name]: value,
        });
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData({
            ...shippingData,
            [name]: value,
        });
    };
    // const handleShippingChange = (e) => {
    //     const { name, value } = e.target;
    //     setShippingData({
    //         ...shippingData,
    //         [name]: value,
    //     });

    // }



    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        // console.log(isChecked)
        // if (isChecked) {
        //     setShippingData({
        //         'sfirstname': billingData.firstname,
        //         'smiddlename': billingData.middlename,
        //         'slastname': billingData.lastname,
        //         'scity': billingData.city,
        //         'sstate': billingData.state,
        //         'sstreetNo': billingData.streetNo,
        //         'spostalcode': billingData.postalcode,
        //         'semail': billingData.email,
        //         'sphone': billingData.phone,
        //     });
        // } else {

        // }
        if (!isChecked) {
            setShippingData({
                sfirstname: '',
                smiddlename: '',
                slastname: '',
                sstate: '',
                scity: '',
                sstreetNo: '',
                spostalcode: '',
                semail: '',
                sphone: ''
            });

        }
    };
    useEffect(() => {
        // This code will run after isChecked has changed
        if (isChecked) {
            setShippingData({
                'sfirstname': billingData.firstname,
                'smiddlename': billingData.middlename,
                'slastname': billingData.lastname,
                'scity': billingData.city,
                'sstate': billingData.state,
                'sstreetNo': billingData.streetNo,
                'spostalcode': billingData.postalcode,
                'semail': billingData.email,
                'sphone': billingData.phone,
            });
        } else {
            // Clear shippingData if isChecked is false
            setShippingData({
                sfirstname: '',
                smiddlename: '',
                slastname: '',
                sstate: '',
                scity: '',
                sstreetNo: '',
                spostalcode: '',
                semail: '',
                sphone: ''
            });
        }
    }, [isChecked, billingData]);
    // const onCheckboxChange = (e) => {
    //     const { name } = e.target;
    //     if (name.checked)
    //         setShippingData()

    // }

    // const setShippingData = () => {
    //     setBillingData({
    //         ...billingData,
    //         [name]: billingData.name,
    //     });
    // }
    // console.log(billingData)
    // const [firstname, setFirstName] = useState('')
    // const [middlename, setMiddleName] = useState('')
    // const [lastname, setLastname] = useState('')
    // const [state, setState] = useState('')
    // const [city, setCity] = useState('')
    // const [streetNo, setStreetNo] = useState('')
    // const [postalcode, setPostalcode] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')

    // const [sfirstname, setSFirstName] = useState('')
    // const [smiddlename, setSMiddleName] = useState('')
    // const [slastname, setSLastname] = useState('')
    // const [sstate, setSState] = useState('')
    // const [scity, setSCity] = useState('')
    // const [sstreetNo, setSStreetNo] = useState('')
    // const [spostalcode, setSPostalcode] = useState('')
    // const [semail, setSEmail] = useState('')
    // const [sphone, setSPhone] = useState('')

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        // style={{ background: 'red' }}
        >
            <BillingContainer>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    size='small'
                    name='firstname'
                    value={billingData.firstname}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.firstname && (
                        <Typography color="red" fontSize='13px'>
                            {billingDataErrors.firstname}
                        </Typography>
                    )}

                />
                <TextField
                    id=""
                    label="Middle Name"
                    size='small'
                    name='middlename'
                    value={billingData.middlename}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.middlename && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.middlename}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    size='small'
                    name='lastname'
                    value={billingData.lastname}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.lastname && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.lastname}
                        </Typography>
                    )}
                />
                <TextField
                    disabled
                    id="outlined-required"
                    label="Country"
                    size='small'
                    defaultValue='Nepal'
                />
                <TextField
                    required
                    id="outlined-required"
                    label="State"
                    size='small'
                    name='state'
                    value={billingData.state}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.state && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.state}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Town / City"
                    size='small'
                    name='city'
                    value={billingData.city}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.city && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.city}
                        </Typography>
                    )}
                />
                <TextField
                    label="Street Address"
                    size='small'
                    name='streetNo'
                    value={billingData.streetNo}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.streetNo && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.streetNo}
                        </Typography>
                    )}
                />
                <TextField
                    label="Postal Code / Zip"
                    size='small'
                    name='postalcode'
                    value={billingData.postalcode}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.postalcode && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.postalcode}
                        </Typography>
                    )}
                />
                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Email Address"
                    size='small'
                    name='email'
                    value={billingData.email}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.email && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.email}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    size='small'
                    name='phone'
                    value={billingData.phone}
                    onChange={handleBillingChange}
                    helperText={billingDataErrors.phone && (
                        <Typography color="red" fontSize="13px">
                            {billingDataErrors.phone}
                        </Typography>
                    )}
                />
                <br />
            </BillingContainer>
            <hr style={{ filter: 'blur(0.9px)' }} />
            <ShippingContainer>
                <Typography variant='h6' marginLeft="15px">Shipping Details</Typography>
                <Box style={{ display: 'flex' }}>
                    <Input type='checkbox' style={{ marginLeft: '15px', textDecoration: 'none' }} checked={isChecked}
                        onChange={handleCheckboxChange} />
                    <Typography variant='p' marginLeft="15px">Same as Billing Details</Typography>
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    size='small'
                    name='sfirstname'
                    value={shippingData.sfirstname}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.sfirstname && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.sfirstname}
                        </Typography>
                    )}
                />
                <TextField
                    id=""
                    label="Middle Name"
                    size='small'
                    name='smiddlename'
                    value={shippingData.smiddlename}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.smiddlename && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.smiddlename}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    size='small'
                    name='slastname'
                    value={shippingData.slastname}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.slastname && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.slastname}
                        </Typography>
                    )}
                />
                <TextField
                    disabled
                    id="outlined-required"
                    label="Country"
                    size='small'
                    defaultValue='Nepal'
                />
                <TextField
                    required
                    id="outlined-required"
                    label="State"
                    size='small'
                    name='sstate'
                    value={shippingData.sstate}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.sstate && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.sstate}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Town / City"
                    size='small'
                    name='scity'
                    value={shippingData.scity}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.scity && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.scity}
                        </Typography>
                    )}
                />
                <TextField
                    label="Street Address"
                    size='small'
                    name='sstreetNo'
                    value={shippingData.sstreetNo}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.sstreetNo && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.sstreetNo}
                        </Typography>
                    )}
                />
                <TextField
                    label="Postal Code / Zip"
                    size='small'
                    name='spostalcode'
                    value={shippingData.spostalcode}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.spostalcode && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.spostalcode}
                        </Typography>
                    )}
                />

                <br />
                <TextField
                    required
                    id="outlined-required"
                    label="Email Address"
                    size='small'
                    name='semail'
                    value={shippingData.semail}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.semail && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.semail}
                        </Typography>
                    )}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    size='small'
                    name='sphone'
                    value={shippingData.sphone}
                    onChange={handleShippingChange}
                    disabled={isChecked}
                    helperText={shippingDataErrors.sphone && (
                        <Typography color="red" fontSize="13px">
                            {shippingDataErrors.sphone}
                        </Typography>
                    )}
                />

                <br />
            </ShippingContainer>
        </Box >
    )
}

export default BillingDetails

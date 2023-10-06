import { Box, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import React, { useState } from 'react';

const PaymentMethod = ({ payment, setPayment, paymentErrors }) => {
    // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('esewa');

    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        if (value === 'cashOnDelivery') {
            setPayment({
                ...payment,
                paymentMethod: value,
                paymentStatus: 'Unpaid'
            });
        } else {
            setPayment({
                ...payment,
                paymentMethod: value,
                paymentStatus: 'Paid'
            });
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <Typography variant='h6' style={{ marginBottom: '5px' }}>Choose Payment Method</Typography>
                <RadioGroup
                    value={payment.paymentMethod}
                    onChange={(e) => handlePaymentMethodChange(e)}
                >
                    <Box style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                        <FormControlLabel
                            value="esewa"
                            control={<Radio />}
                            label={<Typography>Esewa</Typography>}
                        />
                    </Box>
                    <Box style={{ display: 'flex', gap: '5px' }}>
                        <FormControlLabel
                            value="cashOnDelivery"
                            control={<Radio />}
                            label={<Typography>Cash On Delivery</Typography>}
                        />
                    </Box>
                </RadioGroup>
                {paymentErrors.paymentMethod && (
                    <Typography color="red" fontSize="sm">
                        {paymentErrors.paymentMethod}
                    </Typography>
                )}
            </div>
        </Box>
    );
};

export default PaymentMethod;

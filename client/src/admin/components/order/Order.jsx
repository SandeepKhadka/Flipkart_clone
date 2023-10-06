import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, styled, FormControl, FormLabel, Input, FormHelperText, VStack, HStack, Textarea } from '@chakra-ui/react'; // Import Chakra UI table components
import DashboardLayout from '../DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getOrders } from '../../../redux/actions/orderAction';
import { AiFillEye } from 'react-icons/ai';
import { getAuthToken } from '../../../auth/auth';
import { authorizedUser } from '../../../redux/actions/userAction';


const Order = () => {
  // Checking Admin Or Not
  // const { authToken, isLoading, isAdmin } = useAuthAndAdminCheck();
  const { user } = useSelector((state) => state.authUser);
  const { products } = useSelector(state => state.getProducts);
  const { orders } = useSelector(state => state.getOrders);

  const dispatch = useDispatch();
  const authToken = getAuthToken()

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(authorizedUser(authToken))
      .then(() => {
        setIsLoading(false); // Set isLoading to false when data is loaded
      })
      .catch((error) => {
        setIsLoading(false); // Set isLoading to false on error as well
        // console.error(error);
      });
  }, [dispatch, authToken]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (!authToken) {
    return <Navigate to='/' />
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to='/' />
  }

  const tableStyle = {
    borderCollapse: 'collapse', // Add border-collapse to prevent double borders
    width: '100%', // Set table width to 100% to fill the container
    height: '100%', // Set table width to 100% to fill the container
    background: 'white',
    marginBottom: '20px'
  };

  const thStyle = {
    border: '1px solid #ded8d8', // Add border styles to table headers
    padding: '20px', // Add padding for spacing
    textAlign: 'left', // Align text left in headers
  };

  const tdStyle = {
    border: '1px solid #ded8d8', // Add border styles to table data cells
    padding: '8px', // Add padding for spacing
  };


  return (
    <div>
      <DashboardLayout title="Orders">
        <Box style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
        </Box>
        <Table variant="simple" style={tableStyle}>
          <Thead>
            <Tr>
              <Th style={thStyle}>Order No</Th>
              <Th style={thStyle}>Order By</Th>
              <Th style={thStyle}>Payment Method</Th>
              <Th style={thStyle}>Payment Status</Th>
              <Th style={thStyle}>Sub-total (in Rs)</Th>
              <Th style={thStyle}>Total (in Rs)</Th>
              <Th style={thStyle}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map(order => (
              <Tr key={order.id}>
                <Td style={tdStyle}>{order.orderNo}</Td>
                <Td style={tdStyle}>{`${order.firstname} ${order.lastname}`}</Td>
                <Td style={tdStyle}>{order.paymentMethod}</Td>
                <Td style={tdStyle}>
                  {order.paymentStatus === "Unpaid" ? (
                    <span style={{ background: "red", color: 'white', borderRadius: '5px', padding: '2px 5px' }}>Unpaid</span>
                  ) : order.paymentStatus === "Paid" ? (
                    <span style={{ background: "green", color: 'white', borderRadius: '5px', padding: '2px 5px' }}>Paid</span>
                  ) : (
                    order.paymentStatus
                  )}
                </Td>
                <Td style={tdStyle}>{order.sub_total}</Td>
                <Td style={tdStyle}>{order.totalAmount}</Td>
                <Td style={tdStyle}>
                  <Box style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                    <Box style={{ background: '#f2f2f2', padding: '10px 10px', cursor: 'pointer' }}>
                      <AiFillEye style={{ color: 'blue', fontSize: '20px', }} />
                    </Box>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </DashboardLayout>
    </div>
  );
};

export default Order;

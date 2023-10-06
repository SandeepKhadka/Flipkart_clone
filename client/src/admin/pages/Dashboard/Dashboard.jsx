import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, getUserData } from '../../../auth/auth';
import { authorizedUser, getLoggedInUser } from '../../../redux/actions/userAction';
import DashboardLayout from '../../components/DashboardLayout';
import PortfolioSection from './components/PortfolioSection';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const authToken = getAuthToken()
  if (!authToken) {
    return <Navigate to='/' />
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(authorizedUser(authToken))
      .then(() => {
        setIsLoading(false); // Set isLoading to false when data is loaded
      })
      .catch((error) => {
        setIsLoading(false); // Set isLoading to false on error as well
        console.error(error);
      });
  }, [dispatch, authToken]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to='/' />
  }

  return (
    <DashboardLayout title="Dashboard">
      <PortfolioSection />
    </DashboardLayout>
  );
};

export default Dashboard;

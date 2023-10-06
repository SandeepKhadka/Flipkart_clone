import React from 'react'
import AdminApp from "../../src/admin/App";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../auth/auth';


const IsAdmin = ({ user, isloggedIn }) => {
    const authToken = getAuthToken()
    console.log(authToken)
    // const { user, isloggedIn } = useSelector((state) => state.user);
    // // Check if the user is logged in and has the role 'admin'
    const isAdmin = isloggedIn && user && user.data.role === 'admin';
    console.log(user)
    console.log(isloggedIn, isAdmin)
    // Conditionally render the LoginDialog if not logged in or not an admin
    // if (!isloggedIn || !isAdmin) {
    //     // Redirect to the login page using the Navigate component
    //     return <Navigate to="/login" />;
    // }
    return (
        <div>
            <AdminApp />
        </div>
    )
}

export default IsAdmin

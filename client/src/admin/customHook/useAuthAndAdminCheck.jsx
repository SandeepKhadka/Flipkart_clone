import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserData, getAuthToken } from "../../auth/auth";

// Custom hook for checking authentication and admin access
const useAuthAndAdminCheck = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const authToken = getAuthToken();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Access the navigate function from React Router

    if (!authToken) {
        return <Navigate to='/' />
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if (authToken) {
                    const response = await getUserData(authToken);
                    if (response) {
                        dispatch(getLoggedInUser(response));
                        if (response.data.role !== 'admin') {
                            navigate('/'); // Use navigate to redirect to the home route
                            return;
                        }
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [authToken, dispatch, navigate]);
}


// const useAuthAndAdminCheck = () => {
//     const { user } = useSelector((state) => state.user);
//     const authToken = getAuthToken(); // Check for the authentication token in local storage
//     // console.log(authToken)
//     const dispatch = useDispatch();

//     const [isLoading, setIsLoading] = useState(true);
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         if (authToken) {
//             fetchUserData(authToken, dispatch)
//                 .then((response) => {
//                     setIsLoading(false);
//                     setIsAdmin(checkAdminAccess(response.data));
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching user data:", error);
//                     setIsLoading(false);
//                 });
//         } else {
//             setIsLoading(false);
//         }
//     }, [authToken, user, dispatch]);

//     console.log(isAdmin)
//     return { authToken, isLoading, isAdmin };
// };

// // Utility function to check if the user is an admin
// const checkAdminAccess = async (user) => {
//     // console.log(user)
//     return await user && user.role === "admin";
// };

export default useAuthAndAdminCheck;

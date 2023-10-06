import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, getAuthToken } from "../../auth/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const checkAdmin = () => {
  const { user, isloggedIn } = useSelector((state) => state.user);

  const authToken = getAuthToken(); // Check for the authentication token in local storage
  const dispatch = useDispatch();
  if (!authToken) {
    return <Navigate to="/" />;
  }
  // Define a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authToken) {
      fetchUserData(authToken, dispatch)
        .then(() => {
          setIsLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false); // Set loading to false in case of an error
        });
    }
  }, [authToken, isloggedIn]);

  const isAdmin = isloggedIn && user && user.data.role === "admin";

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (!isloggedIn || !isAdmin) {
    return <Navigate to="/" />;
  }
};

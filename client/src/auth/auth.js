import { getLoggedInUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux

const URL = "http://localhost:8000";

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export async function fetchUserData(token, dispatch) {
  try {
    const response = await fetch(`${URL}/getUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch(getLoggedInUser(userData));
      return userData;
    } else {
      // Handle API request failure
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function getUserData(token) {
  try {
    const response = await fetch(`${URL}/getUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      // Handle API request failure
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

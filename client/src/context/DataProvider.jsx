import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const { user, isloggedIn } = useSelector((state) => state.user);

    // Use useEffect to set the account value when the user is logged in
    useEffect(() => {
        if (isloggedIn) {
            setAccount(`${user.data.firstname} ${user.data.lastname}`);
        }
    }, [isloggedIn, user]);

    return (
        <DataContext.Provider value={{ account, setAccount }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

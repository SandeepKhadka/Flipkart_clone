import { Box } from "@mui/material";
import Home from "./components/home/home";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/Cart/Cart";
import FilterProduct from "./components/filter/FilterProduct";
import AdminApp from "../src/admin/App";
import LoginDialog from "./components/Login/LoginDialog";
import { useSelector } from "react-redux";
import IsAdmin from "./middleware/IsAdmin";
import Order from "./components/Order/Order";

function App() {
  const { user, isloggedIn } = useSelector((state) => state.user);
  // console.log(user)

  return (
    <BrowserRouter>
      <DataProvider>
        <Box style={{ marginTop: 54 }}>
          <Routes basepath="/">
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products" element={<FilterProduct />} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </Box>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;

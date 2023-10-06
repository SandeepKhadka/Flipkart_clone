import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import Product from "./components/product/Product";
import Order from "./components/order/Order";
import "./App.css"

function App() {
  return (
    <ChakraProvider>
      <Box style={{ marginTop: "-54px" }}> {/* Set marginTop to 0px with !important */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;

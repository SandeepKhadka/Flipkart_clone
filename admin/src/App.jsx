
import DataProvider from '../../client/src/context/DataProvider'
import './App.css'
import Product from './components/product/Product'
import Dashboard from './pages/Dashboard/Dashboard'
import { Box } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <DataProvider>
          <Box>
            <Routes basepath="/">
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Product />} />
            </Routes>
          </Box>
        </DataProvider>
      </BrowserRouter>
    </>
  )
}

export default App

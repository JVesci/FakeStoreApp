import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NavigationBar from './components/NavigationBar'
import AddProduct from './components/AddProduct'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import EditProduct from './components/EditProduct'

function App() {

  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

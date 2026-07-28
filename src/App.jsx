import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import Contact from './page/Contact'
import ProductDetail from './page/Productdetail'
import Addproducts from './page/add_product'
import ProductPage from './page/products'

const App = () => {
   return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="add-Product" element={<Addproducts />} />
        <Route path="Products" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
import React from 'react'
import Card, { ProductCard, SaleCard } from './components/Card'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Dashboard from './page/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import Contact from './page/Contact'
import ProductDetail from './page/Productdetail'

const App = () => {
   return (

    <Routes>

<Route path={'/'} element={<Home/>}/>
<Route path={'/dashboard'} element={<DashboardLayout/>}>
<Route index element={<Dashboard/>}/>
<Route path={'contact'} element={<Contact/>}/>
<Route path={'product-detail'} element={<ProductDetail/>}/>
<Route path={'add-Product'} element={<add_product/>}/>
<Route path={'Products'} element={<add_product/>}/>
</Route>

    </Routes>
    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   <Button>Click me</Button>
    // </div>
  )
}


export default App
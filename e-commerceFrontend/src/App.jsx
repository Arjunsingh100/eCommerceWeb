import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgetPassword from './pages/Auth/ForgetPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/updateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPages from './pages/CartPages';
import AdminOrder from './pages/Admin/AdminOrder';


function App() {


  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/product/:slug' element={<ProductDetails />}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/category/:slug' element={<CategoryProduct />}/>
        <Route path='/cart' element={<CartPages />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element ={<Dashboard />}/>
          <Route path='/dashboard/user/profile' element={<Profile />}/>
          <Route path='/dashboard/user/orders' element={<Orders />}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />}/>
          <Route path='admin/create-product' element={<CreateProduct />}/>
          <Route path='admin/update-product/:slug' element={<UpdateProduct />}/>
          <Route path='admin/allUsers' element={<Users />}/>
          <Route path='admin/products' element={<Products />}/>
          <Route path='admin/orders' element={<AdminOrder />}/>
        </Route>
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='forgot-password' element={<ForgetPassword />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Pages/Allproducts';
// import Navbar from './components/Navbar';
// import Slides from './components/Slides';
// import Categories from './components/Categories';
// import Footer from './components/Footer';
import Register from './Pages/Register';
import Login from './Pages/Login'; // Import your Login page
import Home from './Pages/Home';
import Admin from './Admin/Admin';
import AddProducts from './Admin/AddProducts';
import Logout from './components/Logout';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import ManageProducts from './Pages/ManageProducts';
import AdminEditProduct from './Pages/AdminEditProduct';
import AdminDeleteProduct from './Pages/AdminDeleteProduct';
import PaymentSuccess from './Pages/PaymentSuccess';
import About from './Pages/About';
import Account from './Pages/Account';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/admin/modify-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/delete-product/:id" element={<AdminDeleteProduct />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="*" element={<h2>Page Not Found </h2>} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />

      </Routes>
      {/* <Navbar /> */}
    </div>
  );
}

export default App;

import React from 'react'
import Navbar from '../components/Navbar'
import Slides from '../components/Slides'
import Categories from '../components/Categories'
import Allproducts from "./Allproducts";
import home from './Home.css';
import Footer from '../components/Footer';

// import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slides />
      <Categories />
      <Allproducts />
      <Footer />
     
    </div>
  )
}

export default Home

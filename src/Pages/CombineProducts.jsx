import React from 'react'
import '../Pages/CombineProducts.css';
import Toys from '../Pages/Toys';
import Sports from './Sports';

const CombineProducts = () => {
  return (
    <div className='combine-products'>
      <div className="one">
        <h2>Toys</h2>
        <p>Here you can find toy products.</p>
        <Toys />
      </div>
      <div className="two">
        <h2>Sports</h2>
        <p>Here you can find sports products.</p>
        <Sports />
      </div>
    </div>
  )
}

export default CombineProducts;

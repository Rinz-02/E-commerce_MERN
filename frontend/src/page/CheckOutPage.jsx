import { cartContext } from '../context/CartProvider';
import React, { useContext, useEffect, useState } from 'react';
import RemoveIcon from "@mui/icons-material/Remove";

function CheckOutPage() {
  const theme = localStorage.getItem("theme");
  const {cart,remove} = useContext(cartContext);
  
  return (
    <div className='m-4'>
      <p className='flex justify-center mb-10 text-md font-semibold'>Please Check the Items before Check Out</p>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        {cart.map((product, index) => (
                  <div
                    key={index}
                    className={` flex md:w-7/12 container rounded-xl mb-7 transition-transform duration-300 hover:scale-105  bg-gray-300`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className=" w-16 rounded-l-lg "
                    />
                    <div
                      className={` m-2 gap-2 w-full flex rounded-lg p-1  bg-gray-400 opacity-60`}
                    >
                      <div className="flex flex-col w-full font-semibold">
                        <p>{product.name}</p>
                        <p className="text-green-400 mt-2">${product.price}</p>
                      </div>
                      <button
                        className="flex items-center justify-center hover:text-red-500 h-5 w-6 hover:bg-gray-200 rounded-md"
                        onClick={() => remove(product._id)}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                ))}
          
    </div>
    </div>
  )
}

export default CheckOutPage;

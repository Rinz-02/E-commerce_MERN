import React, { createContext, useEffect, useState } from 'react'

export const cartContext = createContext();

function CartProvider({children}) {
  const [cart,setCart] = useState([]);

  const add = (product) => {
    setCart(prev => [...prev,product]);
  }
 
    
  const remove = (pid) => {
     setCart(prev => prev.filter(item => item._id !== pid));
  }
  
    
  return (
    <cartContext.Provider value={{cart,add,remove}}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider;

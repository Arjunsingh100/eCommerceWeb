import { useState,useContext,createContext, useEffect } from "react";
const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        let existingCartItems = JSON.parse(localStorage.getItem('cart'));
         if(existingCartItems){
             return setCart(existingCartItems)
         }
    },[])
    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () =>{return useContext(CartContext)}

export {useCart,CartProvider}

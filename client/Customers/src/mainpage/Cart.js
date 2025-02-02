import Cookies from "js-cookie";
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = Cookies.get("cart");
    if (existingCartItem && cart.length === 0) {
      setCart(JSON.parse(existingCartItem));
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // expires in 7 days
  }, [cart]);
  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

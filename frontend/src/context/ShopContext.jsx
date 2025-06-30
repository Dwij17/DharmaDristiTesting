import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return totalAmount;
  };

  const updateQuantity = (itemID, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemID] = quantity;
    setCartItems(cartData);
  };

  const getProductsData = async () => {
    try{

      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {

    }
  }

  useEffect(()=>{
    getProductsData()
  },[])

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity, getCartAmount,
    navigate,backendUrl
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
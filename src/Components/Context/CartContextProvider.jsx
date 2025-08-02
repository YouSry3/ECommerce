import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [numsCartItems, setNumCartItems] = useState(null);

  const baseUrl = "https://ecommerce.routemisr.com/api/v1/cart";
  const headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  let query = useQuery({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await axios.get(baseUrl, headerOptions);
      return response.data; 
    },
    refetchOnWindowFocus: false, 
  });

  useEffect(() => {
    setNumCartItems(query?.data?.numOfCartItems);
  }, [query?.data]); 

  function getUserCart() {
    return query;
  }

  async function addUserCart(id) {
    let data = { productId: id };
    await axios.post(baseUrl, data, headerOptions);
    query.refetch(); 
    toast.success("Item Added Successfully");
  }

  async function deleteUserCart(id) {
    await axios.delete(`${baseUrl}/${id}`, headerOptions);
    query.refetch(); 
    toast.success("Item Deleted Successfully");
  }

  async function clearUserCart() {
    await axios.delete(baseUrl, headerOptions);
    query.refetch(); 
    toast.success("Cart Cleared Successfully");
  }

  async function updateUserCart(id, count) {
    let data = { count };
    await axios.put(`${baseUrl}/${id}`, data, headerOptions);
    query.refetch(); 
  }

  return (
    <CartContext.Provider
      value={{
        getUserCart,
        numsCartItems,
        setNumCartItems,
        addUserCart,
        deleteUserCart,
        clearUserCart,
        updateUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

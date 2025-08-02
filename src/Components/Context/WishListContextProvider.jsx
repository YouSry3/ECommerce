
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { createContext} from "react";


// export let WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {


//   const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";
//   const headerOptions = {
//     headers: {
//       token: localStorage.getItem("token"),
//     },
//   };

//   let query = useQuery({
//     queryKey: ["getWishlist"],
//     queryFn: async () => {
//       const response = await axios.get(baseUrl, headerOptions);
//       return response.data;
//     },
//     refetchOnWindowFocus: false,
//   });


//   function getUserWishlist() {
//     return query;
//   }

//   async function addUserWishlist(id) {
//     let data = { productId: id };
//     await axios.post(baseUrl, data, headerOptions);
//     query.refetch();
    
//   }

//   async function deleteUserWishlist(id) {
//     await axios.delete(`${baseUrl}/${id}`, headerOptions);
//     query.refetch();
    
//   }

//   return (
//     <WishlistContext.Provider
//       value={{
//         getUserWishlist,
//         addUserWishlist,
//         deleteUserWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }







// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { createContext } from "react";

// export let WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//   const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";
//   const headerOptions = {
//     headers: {
//       token: localStorage.getItem("token"),
//     },
//   };

//   let query = useQuery({
//     queryKey: ["getWishlist"],
//     queryFn: async () => {
//       const response = await axios.get(baseUrl, headerOptions);
//       return response.data;
//     },
//     refetchOnWindowFocus: false,
//   });

//   function getUserWishlist() {
//     return query.data?.data || []; // ✅ Always return an array of wishlist items
//   }

//   async function addUserWishlist(id) {
//     let data = { productId: id };
//     await axios.post(baseUrl, data, headerOptions);
//     query.refetch();
//   }

//   async function deleteUserWishlist(id) {
//     await axios.delete(`${baseUrl}/${id}`, headerOptions);
//     query.refetch();
//   }

//   return (
//     <WishlistContext.Provider
//       value={{
//         getUserWishlist,
//         addUserWishlist,
//         deleteUserWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }





import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const baseUrl = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const headerOptions = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  let query = useQuery({
    queryKey: ["getWishlist"],
    queryFn: async () => {
      const response = await axios.get(baseUrl, headerOptions);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  function getUserWishlist() {
    return query;
  }

  async function addUserWishlist(id) {
    let data = { productId: id };
    await axios.post(baseUrl, data, headerOptions);
    query.refetch();
  }

  async function deleteUserWishlist(id) {
    await axios.delete(`${baseUrl}/${id}`, headerOptions);
    query.refetch();
  }

  return (
    <WishlistContext.Provider
      value={{
        getUserWishlist,
        addUserWishlist,
        deleteUserWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


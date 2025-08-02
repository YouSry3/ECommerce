// import axios from "axios";
// import React, { useContext, useState } from "react";
// import MainSlider from "../MainSlider/MainSlider";
// import CategorySlider from "../CategorySlider/CategorySlider";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { CartContext } from "../Context/CartContextProvider";
// import toast, { Toaster } from "react-hot-toast";
// import Footer from "../Footer/Footer";
// import { WishlistContext } from "../Context/WishListContextProvider";
// import { Helmet } from "react-helmet";


// export default function Home() {
//   let { addUserCart, setNumCartItems } = useContext(CartContext);
//   let { addUserWishlist } = useContext(WishlistContext);
//   let [searchQuery, setSearchQuery] = useState("");


//   function getAllProducts() {
//     return axios.get(
//       "https://ecommerce.routemisr.com/api/v1/products?limit=100"
//     );
//   }

//   let { isLoading, data, isError, error } = useQuery({
//     queryKey: ["products"],
//     queryFn: getAllProducts,
//   });

//   function addCart(id) {
//     addUserCart(id)
//       .then((req) => {
//         setNumCartItems(req.data.numOfCartItems);
//         toast.success(req.data.message);
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   }

//   function addWishlist(id) {
//     addUserWishlist(id)
//       .then(() => {
//         toast.success("Added to Wishlist");
//       })
//       .catch((err) => {
//         toast.error(err.response?.data?.message || "Failed to add item");
//       });
//   }

//   // Filter products based on search query
//   const filteredProducts = data?.data?.data?.filter((product) =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Toaster />
//       <Helmet>
//         <title> Home</title>
//       </Helmet>
//       {isLoading ? (
//         <div className="bg-slate-900 flex justify-center items-center h-screen">
//           <div className="relative w-16 h-16">
//             <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
//             <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
//           </div>
//         </div>
//       ) : (
//         <div className="container w-10/12 mx-auto my-5">
//           <MainSlider />
//           <CategorySlider />
  
//           {/* Search Bar */}
//           <div className="flex justify-center w-9/12 mx-auto mb-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 className="w-full p-3 pl-12 border bg-main placeholder:text-white text-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-md transition duration-300"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-lg"></i>
//             </div>
//           </div>
  
//           {/* Product Grid */}
//           <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {filteredProducts?.length > 0 ? (
//               filteredProducts.map((product) => {
//                 let { _id, title, imageCover, price, ratingsAverage, category } = product;
//                 let { name } = category;
  
//                 return (
//                   <div key={_id} className="px-2 transition-transform duration-300 hover:scale-105">
//                     <div className="item relative group shadow-lg overflow-hidden border hover:shadow-main duration-300 hover:border-main border-gray-200 rounded-lg p-4 bg-white min-h-[350px] flex flex-col justify-between">
//                       <Link to={`/productDetails/${_id}`}>
//                         <img
//                           src={imageCover}
//                           alt={title}
//                           className="w-full object-cover rounded-lg mb-3"
//                         />
//                         <div className="flex items-center relative justify-between">
//                           <h3 className="text-sm text-main">{name}</h3>
//                         </div>
//                         <h2 className="text-lg font-semibold mt-2 text-gray-800 line-clamp-2 h-12">
//                           {title.split(" ").slice(0, 2).join(" ")}
//                         </h2>
//                         <div className="flex justify-between items-center mt-2">
//                           <span className="font-semibold text-main">{price} EGP</span>
//                           <span className="flex items-center text-yellow-500 font-medium">
//                             {ratingsAverage}
//                             <i className="fa-solid fa-star ms-1"></i>
//                           </span>
//                         </div>
//                       </Link>
//                           <i onClick={() => addWishlist(_id)} className="fa-solid fa-heart text-2xl sm:text-3xl absolute top-64 right-4 sm:top-[19rem] sm:right-2 text-gray-400 hover:text-red-600 duration-300 hover:cursor-pointer"></i>
  
//                       <button
//                         onClick={() => addCart(_id)}
//                         className="bg-main text-white py-2 px-4 rounded-full mt-4 w-full transition-all duration-300 transform translate-y-20 group-hover:translate-y-0 hover:bg-green-500"
//                       >
//                         Add To Cart
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-center text-gray-500 w-full">No products found.</p>
//             )}
//           </div>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
  
// } 


import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import { WishlistContext } from "../Context/WishListContextProvider";
import { Helmet } from "react-helmet";


export default function Home() {
  let { addUserCart, setNumCartItems } = useContext(CartContext);
  let { addUserWishlist, getUserWishlist, deleteUserWishlist } = useContext(WishlistContext);
  let [searchQuery, setSearchQuery] = useState("");
  let [wishlistItems, setWishlistItems] = useState([]);
  
  // Get wishlist data
  const wishlistQuery = getUserWishlist();
  
  useEffect(() => {
    if (wishlistQuery.data) {
      // Extract product IDs from wishlist data
      const wishlistIds = wishlistQuery.data.data.map(item => item._id);
      setWishlistItems(wishlistIds);
    }
  }, [wishlistQuery.data]);

  function getAllProducts() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?limit=100"
    );
  }

  let { isLoading, data, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  function addCart(id) {
    addUserCart(id)
      .then((req) => {
        setNumCartItems(req.data.numOfCartItems);
        toast.success(req.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  function handleWishlistToggle(id) {
    if (wishlistItems.includes(id)) {
      // Remove from wishlist
      deleteUserWishlist(id)
        .then(() => {
          setWishlistItems(wishlistItems.filter(item => item !== id));
          toast.success("Removed from Wishlist");
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Failed to remove item");
        });
    } else {
      // Add to wishlist
      addUserWishlist(id)
        .then(() => {
          setWishlistItems([...wishlistItems, id]);
          toast.success("Added to Wishlist");
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Failed to add item");
        });
    }
  }

  // Filter products based on search query
  const filteredProducts = data?.data?.data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Toaster />
      <Helmet>
        <title> Home</title>
      </Helmet>
      {isLoading ? (
        <div className="bg-slate-900 flex justify-center items-center h-screen">
          <div className="relative w-16 h-16">
            <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      ) : (
        <div className="container w-10/12 mx-auto my-5">
          <MainSlider />
          <CategorySlider />
  
          {/* Search Bar */}
          <div className="flex justify-center w-10/12 mx-auto mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-3 sm:w-full pl-12 border bg-main placeholder:text-white text-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-md transition duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-lg"></i>
            </div>
          </div>
  
          {/* Product Grid */}
          <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => {
                let { _id, title, imageCover, price, ratingsAverage, category } = product;
                let { name } = category;
                
                // Check if the product is in the wishlist
                const isInWishlist = wishlistItems.includes(_id);
  
                return (
                  <div key={_id} className="px-2 transition-transform duration-300 hover:scale-105">
                    <div className="item relative group shadow-lg overflow-hidden border hover:shadow-main duration-300 hover:border-main border-gray-200 rounded-lg p-4 bg-white min-h-[350px] flex flex-col justify-between">
                      <Link to={`/productDetails/${_id}`}>
                        <img
                          src={imageCover}
                          alt={title}
                          className="w-full object-cover rounded-lg mb-3"
                        />
                        <div className="flex items-center relative justify-between">
                          <h3 className="text-sm text-main">{name}</h3>
                        </div>
                        <h2 className="text-lg font-semibold mt-2 text-gray-800 line-clamp-2 h-12">
                          {title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-main">{price} EGP</span>
                          <span className="flex items-center text-yellow-500 font-medium">
                            {ratingsAverage}
                            <i className="fa-solid fa-star ms-1"></i>
                          </span>
                        </div>
                      </Link>
                      <i 
                        onClick={() => handleWishlistToggle(_id)} 
                        className={`heartIcon fa-solid fa-heart text-2xl  sm:text-3xl absolute top-1 right-1 sm:top-[19rem] sm:right-2 ${isInWishlist ? 'text-red-600' : 'text-gray-400'} hover:text-red-600 duration-300 hover:cursor-pointer`}
                      ></i>
  
                      <button
                        onClick={() => addCart(_id)}
                        className="bg-main text-white py-2 px-4 rounded-full mt-4 w-full transition-all duration-300 transform lg:translate-y-20 lg:group-hover:translate-y-0 hover:bg-green-500"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 w-full">No products found.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useContext } from "react";
// import { useParams } from "react-router-dom";
// import { CartContext } from "../Context/CartContextProvider";
// import { WishlistContext } from "../Context/WishListContextProvider";
// import toast, { Toaster } from "react-hot-toast";
// import Footer from "../Footer/Footer";

// export default function ProductDetails() {
//   let { id } = useParams();
//   let { addUserCart, setNumCartItems } = useContext(CartContext);
//   let { addUserWishlist } = useContext(WishlistContext);
//   let { isLoading, data, error, isError } = useQuery({
//     queryKey: ["productDetails", id],
//     queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
//   });

//   function changeImg(e) {
//     let imgSrc = e.target.getAttribute("src");
//     document.getElementById("myImg").setAttribute("src", imgSrc);
//   }

//   let product = data?.data?.data;

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

//   return (
//     <>
    
//     <div>
//       <Toaster />
//       {isLoading ? (
//         <div className="bg-slate-900 flex justify-center items-center h-screen">
//         <div className="relative w-16 h-16">
//           <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
//           <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
//         </div>
//       </div>
//       ) : (
//         <div className="w-10/12 mx-auto my-10 mt-28">
//           <div className="flex  items-center flex-col md:flex-row  gap-10">
//             {/* Image Section */}
//             <div className=" md:w-4/12">
//               <img
//                 src={product?.imageCover}
//                 id="myImg"
//                 className="w-10/12 rounded-lg shadow-md"
//                 alt={product?.title}
//               />
//               <div className="flex gap-2 w-10/12 mt-4 justify-center">
//                 {product?.images.map((image, i) => (
//                   <img
//                     key={i}
//                     onClick={changeImg}
//                     src={image}
//                     className="w-1/5 cursor-pointer border rounded-lg hover:scale-105 transition duration-300"
//                     alt=""
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Product Info Section */}
//             <div className="w-full md:w-8/12">
//               <h2 className="text-3xl font-bold mb-3">{product?.title}</h2>
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-gray-600 text-lg">{product?.description}</p>
//                 <i onClick={() => addWishlist(product?._id)} className="fa-solid fa-heart text-3xl text-gray-400 hover:text-red-600 transition duration-300 cursor-pointer"></i>
//               </div>

//               <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
//                 <span className="text-xl font-semibold text-green-700">{product?.price} EGP</span>
//                 <span className="flex items-center text-xl text-yellow-500 font-bold">
//                   {product?.ratingsAverage} <i className="fa-solid fa-star ml-1"></i>
//                 </span>
//               </div>

//               <button
//                 onClick={() => addCart(product._id)}
//                 className="w-full bg-green-600 text-white text-lg p-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     <Footer/>
    
    
//     </>
//   );
// }


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContextProvider";
import { WishlistContext } from "../Context/WishListContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";

export default function ProductDetails() {
  let { id } = useParams();
  let { addUserCart, setNumCartItems } = useContext(CartContext);
  let { addUserWishlist, getUserWishlist, deleteUserWishlist } = useContext(WishlistContext);
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
  
  let { isLoading, data, error, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
  });

  function changeImg(e) {
    let imgSrc = e.target.getAttribute("src");
    document.getElementById("myImg").setAttribute("src", imgSrc);
  }

  let product = data?.data?.data;

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

  return (
    <>
    <div>
      <Toaster />
      {isLoading ? (
        <div className="bg-slate-900 flex justify-center items-center h-screen">
          <div className="relative w-16 h-16">
            <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-10 mt-28">
          <div className="flex items-center flex-col md:flex-row gap-10">
            {/* Image Section */}
            <div className="md:w-4/12">
              <img
                src={product?.imageCover}
                id="myImg"
                className="w-10/12 rounded-lg shadow-md"
                alt={product?.title}
              />
              <div className="flex gap-2 w-10/12 mt-4 justify-center">
                {product?.images.map((image, i) => (
                  <img
                    key={i}
                    onClick={changeImg}
                    src={image}
                    className="w-1/5 cursor-pointer border rounded-lg hover:scale-105 transition duration-300"
                    alt=""
                  />
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="w-full md:w-8/12">
              <h2 className="text-3xl font-bold mb-3">{product?.title}</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 text-lg">{product?.description}</p>
                <i 
                  onClick={() => handleWishlistToggle(product?._id)}
                  className={`fa-solid fa-heart text-3xl ${wishlistItems.includes(product?._id) ? 'text-red-600' : 'text-gray-400'} hover:text-red-600 transition duration-300 cursor-pointer`}
                ></i>
              </div>

              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                <span className="text-xl font-semibold text-green-700">{product?.price} EGP</span>
                <span className="flex items-center text-xl text-yellow-500 font-bold">
                  {product?.ratingsAverage} <i className="fa-solid fa-star ml-1"></i>
                </span>
              </div>

              <button
                onClick={() => addCart(product._id)}
                className="w-full bg-green-600 text-white text-lg p-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
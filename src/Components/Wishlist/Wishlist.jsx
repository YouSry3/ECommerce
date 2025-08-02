// import React, { useContext } from "react";
// import { WishlistContext } from "../Context/WishListContextProvider";
// import { CartContext } from "../Context/CartContextProvider";
// import toast, { Toaster } from "react-hot-toast";
// import Footer from "../Footer/Footer";
// import { Helmet } from "react-helmet";

// export default function Wishlist() {
//   let { getUserWishlist, deleteUserWishlist } = useContext(WishlistContext);
//   let { addUserCart } = useContext(CartContext);
//   let { isLoading, data, isError, error } = getUserWishlist();
//   let wishlistData = data?.data;

//   if (isLoading) {
//     return (
//       <div className="bg-slate-900 flex justify-center items-center h-screen">
//         <div className="relative w-16 h-16">
//           <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
//           <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <h2 className="text-red-600">
//         {error.response?.data?.message || "Something went wrong"}
//       </h2>
//     );
//   }

//   return (
//     <>
//       <Toaster />

//       <Helmet>
//         <title>Wishlist</title>
//       </Helmet>
//       {wishlistData?.length === 0 ? (
//         <div className="w-11/12 mx-auto my-5 mt-28">
//           <div className="bg-gray-800 rounded-lg p-5 shadow-lg h-96 flex flex-col justify-center items-center">
//             <h1 className="text-3xl font-semibold text-white">
//               <i className="fa-solid fa-heart text-red-600"></i> Wishlist
//             </h1>
//             <h2 className="text-xl text-gray-200 mt-4">Your wishlist is empty</h2>
//           </div>
//         </div>
//       ) : (
//         <div className="w-11/12 mx-auto my-5 mt-28">
//           <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
//             <div className="flex justify-between">
//               <h1 className="text-3xl font-semibold text-white">
//                 <i className="fa-solid fa-heart text-red-600"></i> Wishlist
//               </h1>
//               <button
//                 onClick={() => wishlistData.forEach((item) => deleteUserWishlist(item._id), toast.success("Wishlist cleared")) }
//                 className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition duration-300"
//               >
//                 <i className="fa-solid fa-trash-can"></i> Clear Wishlist
//               </button>
//             </div>

//             <div className="divide-y divide-gray-600 mt-4">
//               {wishlistData?.map((item) => {
//                 let { _id, title, imageCover, price } = item;
//                 return (
//                   <div key={_id} className="flex items-center justify-between py-4 gap-5">
//                     <div className="w-1/12">
//                       <img
//                         src={imageCover}
//                         className="w-full rounded-md shadow-md"
//                         alt={title}
//                       />
//                     </div>

//                     <div className="w-9/12">
//                       <h2 className="text-lg font-semibold text-white">{title}</h2>
//                       <h2 className="text-gray-300">
//                         Price: <span className="text-main font-bold">{price} EGP</span>
//                       </h2>
//                       <button
//                         onClick={() => {deleteUserWishlist(_id), toast.success("Item Removed from Wishlist");}}
//                         className="mt-3 border border-red-500 px-5 py-2 rounded-md text-red-500 hover:bg-red-600 hover:text-white font-semibold transition duration-300 shadow-md"
//                       >
//                         <i className="fa-solid fa-trash-can"></i> Remove
//                       </button>
//                     </div>

//                     <div className="w-2/12 flex flex-col items-center">
//                       <button
//                         onClick={() => {
//                           addUserCart(_id);
                          
//                         }}
//                         className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold shadow-md hover:bg-green-700 transition duration-300"
//                       >
//                         <i className="fa-solid fa-cart-plus"></i> Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer/>
//     </>
//   );
// }



// import React, { useContext } from "react";
// import { WishlistContext } from "../Context/WishListContextProvider";
// import { CartContext } from "../Context/CartContextProvider";
// import toast, { Toaster } from "react-hot-toast";
// import Footer from "../Footer/Footer";
// import { Helmet } from "react-helmet";

// export default function Wishlist() {
//   let { getUserWishlist, deleteUserWishlist } = useContext(WishlistContext);
//   let { addUserCart } = useContext(CartContext);
//   let { isLoading, data, isError, error } = getUserWishlist();
//   let wishlistData = data?.data;

//   if (isLoading) {
//     return (
//       <div className="bg-slate-900 flex justify-center items-center h-screen">
//         <div className="relative w-16 h-16">
//           <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
//           <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <h2 className="text-red-600 text-center mt-5">
//         {error.response?.data?.message || "Something went wrong"}
//       </h2>
//     );
//   }

//   return (
//     <>
//       <Toaster />

//       <Helmet>
//         <title>Wishlist</title>
//       </Helmet>
//       {wishlistData?.length === 0 ? (
//         <div className="w-11/12 mx-auto my-5 mt-28">
//           <div className="bg-gray-800 rounded-lg p-5 shadow-lg h-96 flex flex-col justify-center items-center text-center">
//             <h1 className="text-3xl font-semibold text-white">
//               <i className="fa-solid fa-heart text-red-600"></i> Wishlist
//             </h1>
//             <h2 className="text-xl text-gray-200 mt-4">
//               Your wishlist is empty
//             </h2>
//           </div>
//         </div>
//       ) : (
//         <div className="w-11/12 mx-auto my-5 mt-28">
//           <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <h1 className="text-3xl font-semibold text-white mb-3 sm:mb-0">
//                 <i className="fa-solid fa-heart text-red-600"></i> Wishlist
//               </h1>
//               <button
//                 onClick={() =>
//                   wishlistData.forEach(
//                     (item) => deleteUserWishlist(item._id),
//                     toast.success("Wishlist cleared")
//                   )
//                 }
//                 className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
//               >
//                 <i className="fa-solid fa-trash-can"></i> Clear Wishlist
//               </button>
//             </div>

//             <div className="divide-y divide-gray-600 mt-4">
//               {wishlistData?.map((item) => {
//                 let { _id, title, imageCover, price } = item;
//                 return (
//                   <div
//                     key={_id}
//                     className="flex flex-col sm:flex-row items-center sm:items-start justify-between py-4 gap-5"
//                   >
//                     {/* Product Image */}
//                     <div className="w-full sm:w-1/12 flex justify-center">
//                       <img
//                         src={imageCover}
//                         className="w-28 sm:w-full rounded-md shadow-md"
//                         alt={title}
//                       />
//                     </div>

//                     {/* Product Details */}
//                     <div className="w-full sm:w-7/12 text-center sm:text-left">
//                       <h2 className="text-lg font-semibold text-white">
//                         {title}
//                       </h2>
//                       <h2 className="text-gray-300">
//                         Price:{" "}
//                         <span className="text-main font-bold">{price} EGP</span>
//                       </h2>
//                       <button
//                         onClick={() => {
//                           deleteUserWishlist(_id),
//                             toast.success("Item Removed from Wishlist");
//                         }}
//                         className="mt-3 border border-red-500 px-4 py-2 rounded-md text-red-500 hover:bg-red-600 hover:text-white font-semibold transition duration-300 shadow-md w-full sm:w-auto"
//                       >
//                         <i className="fa-solid fa-trash-can"></i> Remove
//                       </button>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <div className="w-full sm:w-3/12 flex justify-center sm:justify-end">
//                       <button
//                         onClick={() => {
//                           addUserCart(_id);
//                         }}
//                         className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-700 transition duration-300 w-full sm:w-auto"
//                       >
//                         <i className="fa-solid fa-cart-plus"></i> Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//       <Footer />
//     </>
//   );
// }



import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishListContextProvider";
import { CartContext } from "../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  let { getUserWishlist, deleteUserWishlist } = useContext(WishlistContext);
  let { addUserCart } = useContext(CartContext);
  let { isLoading, data, isError, error } = getUserWishlist();
  let wishlistData = data?.data || [];

  if (isLoading) {
    return (
      <div className="bg-slate-900 flex justify-center items-center h-screen">
        <div className="relative w-16 h-16">
          <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <h2 className="text-red-600 text-center mt-5">
        {error.response?.data?.message || "Something went wrong"}
      </h2>
    );
  }

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Wishlist</title>
      </Helmet>

      {wishlistData.length === 0 ? (
        <div className="w-11/12 mx-auto my-5 mt-28">
          <div className="bg-gray-800 rounded-lg p-5 shadow-lg h-96 flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-semibold text-white">
              <i className="fa-solid fa-heart text-red-600"></i> Wishlist
            </h1>
            <h2 className="text-xl text-gray-200 mt-4">
              Your wishlist is empty
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-11/12 mx-auto my-5 mt-28">
          <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl font-semibold text-white mb-3 sm:mb-0">
                <i className="fa-solid fa-heart text-red-600"></i> Wishlist
              </h1>
              <button
                onClick={() => {
                  wishlistData.forEach((item) => deleteUserWishlist(item._id));
                  toast.success("Wishlist cleared");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition duration-300 w-full sm:w-auto"
              >
                <i className="fa-solid fa-trash-can"></i> Clear Wishlist
              </button>
            </div>

            <div className="divide-y divide-gray-600 mt-4">
              {wishlistData.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start justify-between py-4 gap-5"
                >
                  <div className="w-full sm:w-1/12 flex justify-center">
                    <img
                      src={item.imageCover}
                      className="w-28 sm:w-full rounded-md shadow-md"
                      alt={item.title}
                    />
                  </div>

                  <div className="w-full sm:w-7/12 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-white">
                      {item.title}
                    </h2>
                    <h2 className="text-gray-300">
                      Price:{" "}
                      <span className="text-main font-bold">
                        {item.price} EGP
                      </span>
                    </h2>
                    <button
                      onClick={() => {
                        deleteUserWishlist(item._id);
                        toast.success("Item Removed from Wishlist");
                      }}
                      className="mt-3 border border-red-500 px-4 py-2 rounded-md text-red-500 hover:bg-red-600 hover:text-white font-semibold transition duration-300 shadow-md w-full sm:w-auto"
                    >
                      <i className="fa-solid fa-trash-can"></i> Remove
                    </button>
                  </div>

                  <div className="w-full sm:w-3/12 flex justify-center sm:justify-end">
                    <button
                      onClick={() => {
                        addUserCart(item._id);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-700 transition duration-300 w-full sm:w-auto"
                    >
                      <i className="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}


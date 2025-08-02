// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../Footer/Footer";
// import { Helmet } from "react-helmet";

// export default function AllOrders() {
//   const [userId, setUserId] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const token = localStorage.getItem("token");
//   const headerOptions = { headers: { token } };

//   useEffect(() => {
//     axios
//       .get("https://ecommerce.routemisr.com/api/v1/users/getMe", headerOptions)
//       .then((res) => setUserId(res.data.data._id));
//   }, []);

//   function getOrders() {
//     return axios.get(
//       `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
//       headerOptions
//     );
//   }

//   let { data, isLoading, isError, error } = useQuery({
//     queryKey: ["orders", userId],
//     queryFn: getOrders,
//   });

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

//   if (isError)
//     return (
//       <p className="text-center text-red-600 mt-28">
//         Failed to fetch orders: {error.message}
//       </p>
//     );

//   return (
//     <>
//       <Helmet>
//         <title>Orders</title>
//       </Helmet>

//       <div className="w-10/12 mx-auto my-10 mt-28">
//         <h1 className="text-2xl font-bold mb-5">Your Orders</h1>
//         {data?.data.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <div className="grid gap-4">
//             {[...data?.data].reverse().map((order) => (
//               <div
//                 key={order._id}
//                 className="border p-4 rounded-lg shadow-md bg-white"
//               >
//                 <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
//                 <p>City: {order.shippingAddress.city || "N/A"}</p>
//                 <p>Details: {order.shippingAddress.details || "N/A"}</p>
//                 <p>Phone: {order.shippingAddress.phone || "N/A"}</p>
//                 <p className="font-bold mt-2">
//                   Total Price: ${order.totalOrderPrice || 0}
//                 </p>

//                 <button
//                   className="mt-3 bg-main text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
//                   onClick={() =>
//                     setExpandedOrder(
//                       expandedOrder === order._id ? null : order._id
//                     )
//                   }
//                 >
//                   {expandedOrder === order._id ? "Hide Items" : "View Items"}
//                 </button>

//                 <AnimatePresence>
//                   {expandedOrder === order._id && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.4, ease: "easeInOut" }}
//                       className="mt-4 p-3 bg-gray-100 rounded-lg overflow-hidden"
//                     >
//                       <h3 className="font-semibold mb-2">Order Items:</h3>
//                       {order.cartItems.length > 0 ? (
//                         order.cartItems.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center border-b pb-2 mb-2"
//                           >
//                             <img
//                               src={item.product.imageCover}
//                               alt={item.product.title}
//                               className="w-16 h-16 object-cover rounded mr-3"
//                             />
//                             <div>
//                               <p className="text-gray-800">
//                                 <span className="font-semibold">Product:</span>{" "}
//                                 {item.product.title
//                                   .split(" ")
//                                   .slice(0, 2)
//                                   .join(" ")}
//                               </p>
//                               <p className="text-gray-700">
//                                 <span className="font-semibold">Quantity:</span>{" "}
//                                 {item.count}
//                               </p>
//                               <p className="text-gray-700">
//                                 <span className="font-semibold">Price:</span> $
//                                 {item.price}
//                               </p>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-600">No items found.</p>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function AllOrders() {
  const [userId, setUserId] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headerOptions = { headers: { token } };

  // Fetch user ID with better error handling
  useEffect(() => {
    setIsLoadingUser(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/users/getMe", headerOptions)
      .then((res) => {
        setUserId(res.data.data._id);
        setIsLoadingUser(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUserError(error.message || "Failed to fetch user data");
        setIsLoadingUser(false);
        
        // If unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  // Order fetching function
  function getOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      headerOptions
    );
  }

  // React Query with improved configuration
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", userId],
    queryFn: getOrders,
    enabled: !!userId && !isLoadingUser, // Only run when userId is available
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  // Loading state (either user loading or orders loading)
  if (isLoadingUser || isLoading) {
    return (
      <div className="bg-slate-900 flex justify-center items-center h-screen">
        <div className="relative w-16 h-16">
          <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  // User error handling
  if (userError) {
    return (
      <div className="text-center text-red-600 mt-28 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading User Data</h2>
        <p>{userError}</p>
        <button 
          className="mt-4 bg-main text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Order fetching error handling
  if (isError) {
    return (
      <div className="text-center text-red-600 mt-28 p-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Orders</h2>
        <p>{error.message || "Failed to fetch orders"}</p>
        <button 
          className="mt-4 bg-main text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      <div className="w-10/12 mx-auto my-10 mt-28">
        <h1 className="text-2xl font-bold mb-5">Your Orders</h1>
        {!data?.data || data.data.length === 0 ? (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-lg text-gray-600">No orders found.</p>
            <button 
              className="mt-4 bg-main text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
              onClick={() => navigate("/product")}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {[...data.data].reverse().map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                <p>City: {order.shippingAddress?.city || "N/A"}</p>
                <p>Details: {order.shippingAddress?.details || "N/A"}</p>
                <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>
                <p className="font-bold mt-2">
                  Total Price: ${order.totalOrderPrice || 0}
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: {order.paymentMethodType || "Cash on delivery"}
                </p>

                <button
                  className="mt-3 bg-main text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  {expandedOrder === order._id ? "Hide Items" : "View Items"}
                </button>

                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-4 p-3 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <h3 className="font-semibold mb-2">Order Items:</h3>
                      {order.cartItems && order.cartItems.length > 0 ? (
                        order.cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center border-b pb-2 mb-2"
                          >
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title || "Product image"}
                              className="w-16 h-16 object-cover rounded mr-3"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                              }}
                            />
                            <div>
                              <p className="text-gray-800">
                                <span className="font-semibold">Product:</span>{" "}
                                {item.product?.title
                                  ? item.product.title.split(" ").slice(0, 2).join(" ")
                                  : "N/A"}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">Quantity:</span>{" "}
                                {item.count || 0}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-semibold">Price:</span> $
                                {item.price || 0}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No items found.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
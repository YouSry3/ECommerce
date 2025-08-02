// import React from "react";
// import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
// import Layout from "./Components/Layout/Layout";
// import Home from "./Components/Home/Home";
// import Product from "./Components/Product/Product";
// import Cart from "./Components/Cart/Cart";
// import Login from "./Components/Login/Login";
// import Signup from "./Components/Signup/Signup";
// import Notfound from "./Components/Notfound/Notfound";
// import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
// import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
// import AuthContextProvider from "./Components/Context/AuthContextProvider";
// import ProtectedRouting from "./Components/ProtectedRouting/ProtectedRouting";
// import Brands from "./Components/Brands/Brands";
// import Category from "./Components/Category/Category";
// import ProductDetails from "./Components/ProductDetails/ProductDetails";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import CartContextProvider from "./Components/Context/CartContextProvider";
// import ShippingDetails from "./Components/ShippingDetails/ShippingDetails";
// import WishListContextProvider from "./Components/Context/WishListContextProvider";
// import Wishlist from "./Components/Wishlist/Wishlist";
// import AllOrders from "./Components/AllOrders/AllOrders";
// import { Offline, Online } from "react-detect-offline";
// import img from './assets/images/error.svg'

// export default function App() {
//   let routes = createHashRouter([
//     {
//       path: "",
//       element: <Layout />,
//       children: [
//         {
//           index: true,
//           element: (
//             <ProtectedRouting>
//               <Home />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "product",
//           element: (
//             <ProtectedRouting>
//               <Product />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "wishlist",
//           element: (
//             <ProtectedRouting>
//               <Wishlist />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "brands",
//           element: (
//             <ProtectedRouting>
//               <Brands />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "cart",
//           element: (
//             <ProtectedRouting>
//               <Cart />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "shippingDetails/:id",
//           element: (
//             <ProtectedRouting>
//               <ShippingDetails />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "category",
//           element: (
//             <ProtectedRouting>
//               <Category />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "allorders",
//           element: (
//             <ProtectedRouting>
//               <AllOrders />
//             </ProtectedRouting>
//           ),
//         },
//         {
//           path: "productDetails/:id",
//           element: (
//             <ProtectedRouting>
//               <ProductDetails />
//             </ProtectedRouting>
//           ),
//         },
//         { path: "Login", element: <Login /> },
//         { path: "register", element: <Signup /> },
//         { path: "forgetPassword", element: <ForgetPassword /> },
//         { path: "updatePassword", element: <UpdatePassword /> },
//         { path: "*", element: <Notfound /> },
//       ],
//     },
//   ]);
//   let client = new QueryClient()
//   return (
//     <>
//       <Online>
//       <QueryClientProvider client={client}>
//         <ReactQueryDevtools></ReactQueryDevtools>
//         <AuthContextProvider>
//         <CartContextProvider>
//             <WishListContextProvider>
//               <RouterProvider router={routes}></RouterProvider>
//               </WishListContextProvider>
//           </CartContextProvider>
//         </AuthContextProvider>
//       </QueryClientProvider>
//       </Online>

//       <Offline>
//   <div className="flex flex-col justify-center items-center h-screen bg-gray-200 text-white px-4">
//     <div className="flex flex-col items-center space-y-4 p-6 bg-red-600 rounded-2xl shadow-lg">
//       <img src={img} alt="Offline" className="w-72 opacity-75" />
//       <h1 className="text-3xl font-semibold">You are offline</h1>
//       <p className="text-lg opacity-80 text-center">Check your internet connection and try again.</p>
//       <div className="flex space-x-2 items-center">
//         <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
//         <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-200"></div>
//         <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-400"></div>
//       </div>
//     </div>
//   </div>
// </Offline>

//     </>
//   );
// }
import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Notfound from "./Components/Notfound/Notfound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import AuthContextProvider from "./Components/Context/AuthContextProvider";
import ProtectedRouting from "./Components/ProtectedRouting/ProtectedRouting";
import Brands from "./Components/Brands/Brands";
import Category from "./Components/Category/Category";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Components/Context/CartContextProvider";
import ShippingDetails from "./Components/ShippingDetails/ShippingDetails";
import WishListContextProvider from "./Components/Context/WishListContextProvider";
import Wishlist from "./Components/Wishlist/Wishlist";
import AllOrders from "./Components/AllOrders/AllOrders";
import { Offline, Online } from "react-detect-offline";
import img from './assets/images/error.svg';

export default function App() {
  // Create a QueryClient with better error handling
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 30000,
      },
    },
  });

  // Create router
  const routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRouting>
              <Product />
            </ProtectedRouting>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouting>
              <Wishlist />
            </ProtectedRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "shippingDetails/:id",
          element: (
            <ProtectedRouting>
              <ShippingDetails />
            </ProtectedRouting>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRouting>
              <Category />
            </ProtectedRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouting>
              <AllOrders />
            </ProtectedRouting>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRouting>
              <ProductDetails />
            </ProtectedRouting>
          ),
        },
        { path: "Login", element: <Login /> },
        { path: "register", element: <Signup /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <Online>
        <QueryClientProvider client={client}>
          <AuthContextProvider>
            <CartContextProvider>
              <WishListContextProvider>
                <RouterProvider router={routes} />
              </WishListContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </Online>

      <Offline>
        <div className="flex flex-col justify-center items-center h-screen bg-gray-200 text-white px-4">
          <div className="flex flex-col items-center space-y-4 p-6 bg-red-600 rounded-2xl shadow-lg">
            <img src={img} alt="Offline" className="w-72 opacity-75" />
            <h1 className="text-3xl font-semibold">You are offline</h1>
            <p className="text-lg opacity-80 text-center">Check your internet connection and try again.</p>
            <div className="flex space-x-2 items-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-200"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-400"></div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </Offline>
    </>
  );
}
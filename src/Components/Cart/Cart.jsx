import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let { getUserCart, deleteUserCart, clearUserCart, updateUserCart } = useContext(CartContext);
  let { isLoading, data, isError, error } = getUserCart();
  let cartData = data?.data;

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
    return <h2 className="text-red-600">{error.response?.data?.message || "Something went wrong"}</h2>;
  }

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* If cart is empty */}
      {cartData?.products?.length === 0 ? (

        <div className="w-11/12 mx-auto my-5 mt-28">
        <div className="bg-gray-800 rounded-lg p-5 shadow-lg h-96 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold text-white">
            <i className="fa-solid fa-cart-shopping text-main"></i> Shop Cart
          </h1>
          <h2 className="text-xl text-gray-200 mt-4">Your cart is empty</h2>
          <Link to="/product" className="bg-main text-white px-4 py-2 mt-3 rounded-md font-semibold shadow-md hover:bg-main-dark transition duration-300">Start Shopping</Link>
        </div>
      </div>
      ) : (
        // If cart has products, display them
        <div className="w-11/12 mx-auto my-5 mt-28">
          <div className="bg-gray-800 rounded-lg p-5 shadow-lg">
            <h1 className="text-3xl font-semibold text-white">
              <i className="fa-solid fa-cart-shopping text-main"></i> Shop Cart
            </h1>

            <div className="flex justify-between items-center mt-4 border-b border-gray-600 pb-3">
              <h2 className="text-xl text-gray-200">
                Total Cart Price: <span className="font-bold text-main">{cartData?.totalCartPrice} EGP</span>
              </h2>
              <button 
                onClick={() => clearUserCart()} 
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition duration-300"
              >
                <i className="fa-solid fa-trash-can"></i> Clear Cart
                
              </button>
            </div>

            <div className="divide-y divide-gray-600 mt-4">
              {cartData.products.map((item) => {
                let { count, product, price } = item;
                let { title, imageCover, _id } = product;
                return (
                  <div key={_id} className="flex items-center justify-between py-4 gap-5">
                    <div className="w-1/12">
                      <img src={imageCover} className="w-full rounded-md shadow-md" alt={title} />
                    </div>

                    <div className="w-9/12">
                      <h2 className="text-lg font-semibold text-white">{title}</h2>
                      <h2 className="text-gray-300">
                        Price: <span className="text-main font-bold">{price} EGP</span>
                      </h2>
                      <button 
                        onClick={() => deleteUserCart(_id)}
                        className="mt-3 border border-red-500 px-5 py-2 rounded-md text-red-500 hover:bg-red-600 hover:text-white font-semibold transition duration-300 shadow-md"
                      >
                        <i className="fa-solid fa-trash-can"></i> Remove
                      </button>
                    </div>

                    <div className="w-2/12 flex items-center justify-center gap-3">
                      <i 
                        className="fa-solid fa-minus border border-gray-400 p-2 rounded-md text-white cursor-pointer hover:bg-red-600 hover:border-red-600 transition duration-300"
                        onClick={() =>  updateUserCart(_id, count - 1)}
                      ></i>
                      <span className="text-white font-bold">{count}</span>
                      <i 
                        className="fa-solid fa-plus border border-gray-400 p-2 rounded-md text-white cursor-pointer hover:bg-main hover:border-main transition duration-300"
                        onClick={() => updateUserCart(_id, count + 1)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to={"/shippingDetails/" + cartData._id}
              className="block text-center w-full bg-main text-white py-3 mt-5 rounded-md font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Check-out <i className="fa-brands fa-cc-visa"></i>
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

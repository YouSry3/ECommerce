import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import { WishlistContext } from "../Context/WishListContextProvider";
import { Helmet } from "react-helmet";
export default function Product() {
  let { addUserCart, setNumCartItems } = useContext(CartContext);
  let [searchQuery, setSearchQuery] = useState("");
  let { addUserWishlist } = useContext(WishlistContext);
  function getAllProducts() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?limit=100"
    );
  }
  function addWishlist(id) {
    addUserWishlist(id)
      .then(() => {
        toast.success("Added to Wishlist!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to add item");
      });
  }
  let { isLoading, data} = useQuery({
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

  // Filter products based on search query
  const filteredProducts = data?.data?.data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <>
      <Helmet>
        <title>Product</title>
      </Helmet>
        <Toaster />
        {isLoading ? (
          <div className="bg-slate-900 flex justify-center items-center h-screen">
            <div className="relative w-16 h-16">
              <div className="w-full h-full border-4 border-transparent border-t-main border-b-main rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-main border-r-main rounded-full animate-spin-reverse"></div>
            </div>
          </div>
        ) : (
          <div className="container w-10/12 mx-auto my-5 mt-28">

    
            {/* Search Bar */}
            <div className="flex justify-center w-9/12 mx-auto mb-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full p-3 pl-12 border bg-main placeholder:text-white text-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white shadow-md transition duration-300"
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
                            <i onClick={() => addWishlist(_id)} className="fa-solid absolute top-1 right-1  fa-heart text-3xl text-gray-400 hover:text-red-600 duration-300"></i>
    
                        <button
                          onClick={() => addCart(_id)}
                          className="bg-main text-white py-2 px-4 rounded-full mt-4 w-full transition-all duration-300 transform lg:translate-y-20 lg:group-hover:translate-y-0 lg:hover:bg-green-500"
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

import React, { useState } from "react";
import useApi from "../Hooks/useApi";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Category() {
  let { data, isLoading } = useApi("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  function fetchSubcategories(categoryId) {
    setLoadingSubcategories(true);
    setSelectedCategory(categoryId);

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
      .then((response) => {
        setSubcategories(response.data.data);
        setLoadingSubcategories(false);
      });
  }

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

  return (
    <>
    <Helmet>
        <title>Category</title>
      </Helmet>
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data?.data?.data?.map((category) => (
            <div
              key={category._id}
              className={`group overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ${
                selectedCategory === category._id ? "border-2 border-main" : ""
              }`}
              onClick={() => fetchSubcategories(category._id)}
            >
              <img
                src={category.image}
                className="h-64 w-full object-cover object-top group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                alt={category.name}
              />
              <h5 className="text-center text-lg font-medium py-3 bg-gray-100 group-hover:bg-main group-hover:text-white transition-colors duration-300 cursor-pointer">
                {category.name}
              </h5>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Subcategories
            </h3>
            {loadingSubcategories ? (
              <p className="text-center text-lg text-gray-600">Loading...</p>
            ) : subcategories.length === 0 ? (
              <p className="text-center text-lg text-red-500">
                No subcategories found.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-11/12 mx-auto"  >
                {subcategories.map((sub) => (
                  <div
                    key={sub._id}
                    className="p-4 bg-gray-100 rounded-lg text-center shadow-md hover:bg-main hover:text-white transition duration-300 cursor-pointer"
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

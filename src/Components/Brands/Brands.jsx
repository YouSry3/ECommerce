import React, { useState } from "react";
import useApi from "../Hooks/useApi";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Brands() {
  let { data, isLoading } = useApi("brands");
  const [selectedBrand, setSelectedBrand] = useState(null);

  function openModal(brand) {
    setSelectedBrand(brand);
    document.getElementById("brand-modal").classList.remove("hidden");
  }

  function closeModal() {
    setSelectedBrand(null);
    document.getElementById("brand-modal").classList.add("hidden");
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
        <title>Brands</title>
      </Helmet>
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Top Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data?.data?.data?.map((brand) => (
            <div
              key={brand._id}
              className="group overflow-hidden rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openModal(brand)}
            >
              <img
                src={brand.image}
                className="h-64 w-full object-cover object-top"
                alt={brand.name}
              />
              <h5 className="text-center text-lg font-medium py-3 bg-gray-100 group-hover:bg-main group-hover:text-white transition-colors duration-300">
                {brand.name}
              </h5>
            </div>
          ))}
        </div>
      </div>

      
      <div
        id="brand-modal"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-black bg-opacity-50 flex"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedBrand?.name}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

           
            <div className="p-4 flex justify-center">
              <img
                src={selectedBrand?.image}
                alt={selectedBrand?.name}
                className="w-full rounded-lg max-h-96 object-contain"
              />
            </div>

           
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={closeModal}
                className="text-white bg-main hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

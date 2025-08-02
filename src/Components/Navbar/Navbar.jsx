// import React, { useContext } from 'react'
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import logoImg from '../../assets/images/freshcart-logo.svg'
// import { AuthContext } from '../Context/AuthContextProvider';
// import { jwtDecode } from 'jwt-decode';
// import { CartContext } from '../Context/CartContextProvider';
// export default function Navbar() {
//     let {numsCartItems} = useContext(CartContext)
//   let {token , setToken} = useContext(AuthContext)
//   let nav = useNavigate()

//   function logOut(){
//   localStorage.removeItem("token")
//   setToken(null)
//   nav("/Login")
// }
// let userName = "";
//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       userName = decoded.name || "User"; // Adjust according to your token payload structure
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }
//   return (
//     <nav className="bg-white border-gray-200 shadow fixed z-50 w-full top-0 left-0 ">
//       <div className="max-w-screen-xl flex   items-center  mx-auto p-4">
//         <Link
//           to=""
//           className="flex items-center  space-x-3 rtl:space-x-reverse"
//         >
//           <img
//             src={logoImg}
//             className="h-8"
//             alt=""
//           />
          
//         </Link>
//         <button
//           data-collapse-toggle="navbar-default"
//           type="button"
//           className="inline-flex items-center ms-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//           aria-controls="navbar-default"
//           aria-expanded="false"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div className="hidden w-full md:flex justify-between  md:w-full" id="navbar-default">
//           {token? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row rtl:space-x-reverse md:mt-0 md:border-0  ">
//             <li>
//               <NavLink
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/product"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 Products
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/brands"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 Brands
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/category"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 Category
//               </NavLink>
//             </li>
         
//             <li>
//               <NavLink
//                 to="/cart"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 Cart
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/wishlist"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 Wishlist
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/allorders"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//                 All Orders
//               </NavLink>
//             </li>
//           </ul>: ""}
          

//           <ul className="ms-auto font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row rtl:space-x-reverse md:mt-0 md:border-0  ">
//             <li className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-instagram"></i>
//               </Link>
//             </li>
//             <li  className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-facebook"></i>
//               </Link>
//             </li>
//             <li className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-tiktok"></i>
//               </Link>
//             </li>
//             <li className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-twitter"></i>
//               </Link>
//             </li>
//             <li className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-linkedin"></i>
//               </Link>
//             </li>
//             <li className='hover:text-main duration-300'>
//               <Link
//                 to="/"
//                 className="block py-2 px-3  "
//                 aria-current="page"
//               >
//                <i className="fa-brands fa-youtube"></i>
//               </Link>
//             </li>
            
//             {token? <li>
//               <Link to="/cart" className='relative'>
//                 <i className='fa-solid fa-shopping-cart ms-3 me-3 text-main'></i>
//                 <span className="absolute -top-3 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md ">
//   {numsCartItems}
// </span>

//               </Link>
//               <Link
//                 onClick={logOut}
//                 to="/Login"
//                 className="inline-block ms-2 py-2 px-3 hover:text-main duration-300 " 
//                 aria-current="page"
//               >
//               Logout
//               </Link>
//               <Link
//                 to=""
//                 className="inline-block py-2 px-3  hover:text-main duration-300"
//                 aria-current="page"
//               >
//               Hello {userName}
//               </Link>
              
//             </li> : <><li>
//               <NavLink
//                 to="/Login"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//               Login
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/register"
//                 className="block py-2 px-3 "
//                 aria-current="page"
//               >
//               Register
//               </NavLink>
//             </li>
//             </>}
            
        
         
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }


import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/freshcart-logo.svg';
import { AuthContext } from '../Context/AuthContextProvider';
import { jwtDecode } from 'jwt-decode';
import { CartContext } from '../Context/CartContextProvider';

export default function Navbar() {
  const { numsCartItems } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/Login');
  };

  let userName = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name || 'User';
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <nav className="bg-white border-gray-200 shadow fixed z-50 w-full top-0 left-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logoImg} className="h-8" alt="FreshCart Logo" />
        </Link>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-between w-full">
          <ul className="font-medium flex ">
            {token && (
              <>
                <li><NavLink to="/" className="py-2 px-3">Home</NavLink></li>
                <li><NavLink to="/product" className="py-2 px-3">Products</NavLink></li>
                <li><NavLink to="/brands" className="py-2 px-3">Brands</NavLink></li>
                <li><NavLink to="/category" className="py-2 px-3">Category</NavLink></li>
                <li><NavLink to="/cart" className="py-2 px-3">Cart</NavLink></li>
                <li><NavLink to="/wishlist" className="py-2 px-3">Wishlist</NavLink></li>
                <li><NavLink to="/allorders" className="py-2 px-3">All Orders</NavLink></li>
              </>
            )}
          </ul>

          {/* Social Icons & Auth Links */}
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-instagram"></i></Link></li>
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-facebook"></i></Link></li>
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-tiktok"></i></Link></li>
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-twitter"></i></Link></li>
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-linkedin"></i></Link></li>
            <li><Link to="/" className="hover:text-main duration-300"><i className="fa-brands fa-youtube"></i></Link></li>

            {token ? (
              <>
                <li>
                  <Link to="/cart" className="relative">
                    <i className="fa-solid fa-shopping-cart text-main"></i>
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                      {numsCartItems}
                    </span>
                  </Link>
                </li>
                <li><button onClick={logOut} className="py-2 ">Logout</button></li>
                <li><span className="py-2 ">Hello {userName}</span></li>
              </>
            ) : (
              <>
                <li><NavLink to="/Login" className="py-2 px-3">Login</NavLink></li>
                <li><NavLink to="/register" className="py-2 px-3">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button (Hidden on Desktop) */}
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg absolute top-full left-0 w-full">
          <ul className="flex flex-col p-4 space-y-2">
            {token && (
              <>
                <li><NavLink to="/" className="block py-2 px-3" onClick={toggleMobileMenu}>Home</NavLink></li>
                <li><NavLink to="/product" className="block py-2 px-3" onClick={toggleMobileMenu}>Products</NavLink></li>
                <li><NavLink to="/brands" className="block py-2 px-3" onClick={toggleMobileMenu}>Brands</NavLink></li>
                <li><NavLink to="/category" className="block py-2 px-3" onClick={toggleMobileMenu}>Category</NavLink></li>
                <li><NavLink to="/cart" className="block py-2 px-3" onClick={toggleMobileMenu}>Cart</NavLink></li>
                <li><NavLink to="/wishlist" className="block py-2 px-3" onClick={toggleMobileMenu}>Wishlist</NavLink></li>
                <li><NavLink to="/allorders" className="block py-2 px-3" onClick={toggleMobileMenu}>All Orders</NavLink></li>
                <li><button onClick={logOut} className="block py-2 px-3">Logout</button></li>
              </>
            )}
            {!token && (
              <>
                <li><NavLink to="/Login" className="block py-2 px-3" onClick={toggleMobileMenu}>Login</NavLink></li>
                <li><NavLink to="/register" className="block py-2 px-3" onClick={toggleMobileMenu}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken } = useContext(AuthContext);
  let [errorMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();

  let validationYup = Yup.object({
    email: Yup.string().required("Email Required").email("Enter a valid Email"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password Invalid"
      ),
  });

  let user = { email: "", password: "" };

  let loginForm = useFormik({
    initialValues: user,
    onSubmit: loginApi,
    validationSchema: validationYup,
  });

  async function loginApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        if (req.data.message == "success") {
          setToken(req.data.token);
          localStorage.setItem("token", req.data.token);
          navg("/");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
<Helmet>
        <title>login</title>
      </Helmet>
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-main">Login</h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-800 rounded-lg bg-red-100 border border-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={loginForm.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main focus:border-main transition duration-200 outline-none"
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="text-red-500 text-xs mt-1">{loginForm.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Password</label>
            <input
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-main focus:border-main transition duration-200 outline-none"
            />
            {loginForm.touched.password && loginForm.errors.password && (
              <p className="text-red-500 text-xs mt-1">{loginForm.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link to="/forgetPassword" className="text-main hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={!(loginForm.isValid && loginForm.dirty)}
            type="submit"
            className="w-full py-2 bg-main hover:bg-green-700 transition duration-200 text-white font-medium rounded-lg disabled:bg-opacity-50"
          >
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-main hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

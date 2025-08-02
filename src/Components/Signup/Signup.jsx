import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SignUp() {
  let [errorMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();

  let validationYup = Yup.object({
    name: Yup.string()
      .required("Name Required")
      .min(3, "Name must be at least 3 characters")
      .max(16, "Name must be at most 16 characters"),
    email: Yup.string().required("Email Required").email("Enter a valid Email"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password Invalid"
      ),
    rePassword: Yup.string()
      .required("Confirm Password")
      .oneOf([Yup.ref("password")], "Password does not match"),
    phone: Yup.string()
      .required("Phone Required")
      .matches(/^(01)(0|1|2|5)[0-9]{8}$/, "Enter valid Phone number"),
  });

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  let registerForm = useFormik({
    initialValues: user,
    onSubmit: registerApi,
    validationSchema: validationYup,
  });

  function registerApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message == "success") {
          navg("/login");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
<Helmet>
        <title>Register</title>
      </Helmet>
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 bg-white mt-28 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-main mb-6">
          Register Now
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-800 rounded-lg bg-red-100 border border-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={registerForm.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {registerForm.touched.name && registerForm.errors.name && (
              <p className="text-red-500 text-xs mt-1">{registerForm.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {registerForm.touched.email && registerForm.errors.email && (
              <p className="text-red-500 text-xs mt-1">{registerForm.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Password
            </label>
            <input
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {registerForm.touched.password && registerForm.errors.password && (
              <p className="text-red-500 text-xs mt-1">{registerForm.errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {registerForm.touched.rePassword && registerForm.errors.rePassword && (
              <p className="text-red-500 text-xs mt-1">{registerForm.errors.rePassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Phone
            </label>
            <input
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {registerForm.touched.phone && registerForm.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{registerForm.errors.phone}</p>
            )}
          </div>

          <button
            disabled={!(registerForm.isValid && registerForm.dirty)}
            type="submit"
            className="w-full py-2 bg-main hover:bg-green-700 transition duration-200 text-white font-medium rounded-lg disabled:bg-opacity-50"
          >
            Submit
          </button>
          <p className="text-center text-sm mt-3">
            Already have an account? <Link to="/login" className="text-main hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

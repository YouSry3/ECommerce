import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  let [errorMessage, setError] = useState(null);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();

  let validationYup = Yup.object({
    email: Yup.string().required("Email Required").email("Enter a valid Email"),
    newPassword: Yup.string()
      .required("New Password Required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "New Password Invalid"
      ),
  });

  let user = {
    email: "",
    newPassword: "",
  };

  let loginForm = useFormik({
    initialValues: user,
    onSubmit: updatePassowrd,
    validationSchema: validationYup,
  });

  function updatePassowrd(data) {
    axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        if (req.data.token) {
          navg("/login");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-main mb-6">
          Update Password
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={loginForm.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {loginForm.touched.email && loginForm.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {loginForm.errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your New Password
            </label>
            <input
              value={loginForm.values.newPassword}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type="password"
              name="newPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main outline-none"
            />
            {loginForm.touched.newPassword && loginForm.errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {loginForm.errors.newPassword}
              </p>
            )}
          </div>

          <button
            disabled={!(loginForm.isValid && loginForm.dirty)}
            type="submit"
            className="w-full py-2 bg-main hover:bg-green-700 transition duration-200 text-white font-medium rounded-lg disabled:bg-opacity-50"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

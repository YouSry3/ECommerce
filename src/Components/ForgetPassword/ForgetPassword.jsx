import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let [errorMessage, setError] = useState(null);
  let [formDisplay, setformDisplay] = useState(true);
  const baseUrl = "https://ecommerce.routemisr.com";
  let navg = useNavigate();
  
  let validationYup = Yup.object({
    email: Yup.string().required("Email Required").email("Enter a valid Email"),
  });

  let validationYup2 = Yup.object({
    resetCode: Yup.string().required("Reset Code Required"),
  });

  let user = { email: "" };

  let forgetForm = useFormik({
    initialValues: user,
    onSubmit: forgetPasswordApi,
    validationSchema: validationYup,
  });

  let verifyResetCodeForm = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: verifyResetCodeApi,
    validationSchema: validationYup2,
  });

  function verifyResetCodeApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.status == "Success") {
          navg("/updatePassword");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }

  function forgetPasswordApi(data) {
    axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
      .then((req) => {
        console.log(req.data);
        if (req.data.statusMsg == "success") {
          setformDisplay(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  }

  return (
    <>
      {formDisplay ? (
        <div className="mt-28">
          <h2 className="w-7/12 mx-auto mt-8 mb-5 text-xl text-[#0aad0a]">Forgot Password:</h2>

          {errorMessage && (
            <div className="w-7/12 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-400">
              {errorMessage}
            </div>
          )}

          <form onSubmit={forgetForm.handleSubmit} className="w-7/12 mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                value={forgetForm.values.email}
                onChange={forgetForm.handleChange}
                onBlur={forgetForm.handleBlur}
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0aad0a] focus:border-[#0aad0a] transition duration-200 outline-none"
              />
              {forgetForm.touched.email && forgetForm.errors.email && (
                <p className="text-red-500 text-xs mt-1">{forgetForm.errors.email}</p>
              )}
            </div>

            <button
              disabled={!(forgetForm.isValid && forgetForm.dirty)}
              type="submit"
              className="w-full py-2 bg-[#0aad0a] hover:bg-green-700 transition duration-200 text-white font-medium rounded-lg disabled:bg-opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-28">
          <h2 className="w-7/12 mx-auto mt-8 mb-5 text-xl text-[#0aad0a]">Reset Code:</h2>

          {errorMessage && (
            <div className="w-7/12 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 border border-red-400">
              {errorMessage}
            </div>
          )}

          <form onSubmit={verifyResetCodeForm.handleSubmit} className="w-7/12 mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Reset Code</label>
              <input
                value={verifyResetCodeForm.values.resetCode}
                onChange={verifyResetCodeForm.handleChange}
                onBlur={verifyResetCodeForm.handleBlur}
                type="text"
                id="resetCode"
                name="resetCode"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0aad0a] focus:border-[#0aad0a] transition duration-200 outline-none"
              />
              {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode && (
                <p className="text-red-500 text-xs mt-1">{verifyResetCodeForm.errors.resetCode}</p>
              )}
            </div>

            <button
              disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
              type="submit"
              className="w-full py-2 bg-[#0aad0a] hover:bg-green-700 transition duration-200 text-white font-medium rounded-lg disabled:bg-opacity-50"
            >
              Verify
            </button>
          </form>
        </div>
      )}
    </>
  );
}

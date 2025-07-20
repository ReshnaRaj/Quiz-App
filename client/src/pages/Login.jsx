import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setCredentials } from "@/store/slice/authSlice";
import { loginUser } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = { mobile: "", password: "" };
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await loginUser(values);

      const userData = {
        user: {
          id: response.user.id,
          name: response.user.name,

          mobile: response.user.mobile,
        },
        token: response.token,
      };
      dispatch(setCredentials(userData));
      toast.success("Login successful");
      if (response.status === 200) {
        navigate("/question");
      }
    } catch (err) {
      setFieldError("general", err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white px-4 md:px-6 py-6">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 mt-20 text-center">
        <h1
          className="text-3xl font-bold mb-6 text-[#2A586F]"
        >
         <span className="relative inline-block">
            <span className="bg-[#f5c45a] absolute inset-x-0 bottom-1 sm:bottom-1 md:bottom-0 h-2 z-0  "></span>
            <span className="relative z-10">Login</span>
          </span>
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                {/* General Error */}
                {errors.general && (
                  <div className="text-red-500 text-sm mb-2">
                    {errors.general}
                  </div>
                )}

                {/* Mobile Number Field */}
                <div className="mb-4">
                  <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                    Mobile Number
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <div className="flex items-center px-2 gap-1 bg-gray-100">
                      <img
                        src="https://flagcdn.com/w40/in.png"
                        alt="IN"
                        className="w-5 h-4"
                      />
                      <span className="text-sm font-medium">+91</span>
                      <FaChevronDown className="text-xs ml-1 text-gray-500" />
                    </div>
                    <Field
                      type="text"
                      name="mobile"
                      placeholder="Enter your phone number"
                      className="flex-1 border-none focus-visible:ring-0 focus:outline-none rounded-none px-2 py-2"
                    />
                  </div>
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1 text-left"
                  />
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2A586F] hover:bg-[#234b5e] text-white font-semibold py-4"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center text-[#313131]">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register Now
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;

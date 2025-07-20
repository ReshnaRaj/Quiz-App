import React from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../../api/auth";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    status: "",
    mobile: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    status: Yup.string().required("Select your current status"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
   
      const res = await signupUser(values);
      toast.success("Signup successful");
      if (res.status === 201) navigate("/login");
    } catch (err) {
     const errorMessage =
      err?.response?.data?.message || err?.message || "Something went wrong";
 
    setFieldError("general", errorMessage);
    toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white px-4 md:px-6 py-6">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1  text-center">
         <h1
          className="text-3xl font-bold mb-6 text-[#2A586F]"
        >
         <span className="relative inline-block">
            <span className="bg-[#f5c45a] absolute inset-x-0 bottom-1 sm:bottom-1 md:bottom-0 h-2 z-0  "></span>
            <span className="relative z-10">Register</span>
          </span>
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-4">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <Field
                    as={Input}
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="flex-1 border-none focus-visible:ring-0 focus:outline-none rounded-none"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border-none focus-visible:ring-0 focus:outline-none rounded-none"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </div>

              {/* Current Status */}
              <div className="mb-4">
                <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                  Current Status
                </label>
                <div className="flex gap-6">
                  {["student", "employee"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <span className="relative flex items-center justify-center w-4 h-4">
                        <Field
                          type="radio"
                          name="status"
                          value={option}
                          className="peer appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:border-black"
                        />
                        <span className="  absolute w-2 h-2 bg-black  rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200" />
                      </span>
                      <span className="text-sm text-[#313131] capitalize">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </div>
 
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
                    as={Input}
                    name="mobile"
                    type="text"
                    placeholder="Enter your phone number"
                    className="flex-1 border-none focus-visible:ring-0 focus:outline-none rounded-none"
                  />
                </div>
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </div>

              
              <div className="mb-6">
                <label className="block text-left text-sm font-semibold mb-1 text-[#313131]">
                  Password
                </label>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </div>

              {/* General Error */}
              <ErrorMessage
                name="general"
                component="div"
                className="text-red-600 text-sm mb-2 text-left"
              />

              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2A586F] hover:bg-[#234b5e] text-white font-semibold py-4 cursor-pointer"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              
              <p className="mt-4 text-sm text-center text-[#313131]">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login Now
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Register;

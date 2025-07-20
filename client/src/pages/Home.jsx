import React from "react";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock user authentication (replace with real auth logic)
const mockUser = {
  name: "John Doe",
  avatar: "",
};
const isAuthenticated = false; // toggle based on your auth state

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-4 md:px-6 py-6">
      <Header isAuthenticated={isAuthenticated} user={mockUser} />

      <main className="flex flex-col items-center justify-center flex-1 mt-22 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold leading-tight"
          style={{ color: "#313131" }}
        >
          Welcome to{" "}
          <span className="relative inline-block">
            <span className="bg-[#F7931E] absolute inset-x-0 bottom-1 sm:bottom-1 md:bottom-2 h-2 z-0  "></span>
            <span className="relative z-10">TSEEP Mastery Box</span>
          </span>
        </h1>

        <p className=" mt-4 text-base sm:text-lg" style={{ color: "#313131" }}>
          Unlock your potential with{" "}
          <span className="font-semibold">AI inspired tool</span>
        </p>

        <hr className="w-full max-w-6xl border-t mt-54 mb-6" />

        <div className="flex flex-col sm:flex-row items-center  justify-between w-full max-w-6xl gap-4">
          <div
            className="flex items-start gap-2 text-sm "
            style={{ color: "#000000" }}
          >
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="leading-tight text-start    font-semibold"
            >
              I confirm that I have read and accept the terms and conditions
              <br />
              and privacy policy.
            </label>
          </div>
          <Link to="/login">
            <Button className="bg-[#2A586F] hover:bg-[#234b5e] text-white w-[150px] cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;

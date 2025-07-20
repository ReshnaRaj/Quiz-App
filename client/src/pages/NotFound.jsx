import Header from '@/components/Header'
import React from 'react'
import Image from "@/assets/404.jpg"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-white px-4 md:px-6 py-6">
      <Header />
      <div className='flex-grow flex flex-col items-center justify-center text-center'>
      <img src={Image} className="w-[320px] md:w-[760px] h-auto mb-8"/>
       <h2 className="text-lg md:text-5xl font-normal text-[#000000] mb-6">
          Sorry, it looks like the page get
        </h2>
        <Button
          className=" min-w-[200px] bg-[#2B5C74] text-white px-6 py-2 rounded-md shadow-md cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
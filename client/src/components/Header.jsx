import React,{useState} from 'react'
import headerLogo from "@/assets/homelogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import { logout } from '@/store/slice/authSlice';
const Header = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
   <>
   <header className='flex justify-between items-center px-6'>
    <img
    src={headerLogo}
    className='w-[200px] h-auto'
    alt="TSEEP Logo"
    ></img>
     
     {user && (
        <div className="relative" >
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"  />
            
          </Avatar>
        </div>
        
        {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <div className="px-4 py-2 text-sm text-gray-700">
                {user?.name}
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                 <IoIosLogOut className="text-lg" />
  Logout
              </button>
            </div>
          )}
          </div>
          )}
          
      
   </header>
   </>
  )
}

export default Header
import { School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux";
import DarkMode from "@/DarkMode";
import MobileNavbar from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/api/authApi";
import { toast } from "sonner";


const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [logoutUser, {isSuccess: logoutUserIsSuccess, data: logoutUserData}] = useLogoutUserMutation();

  const handleLogout = async() => {
    try {
      await logoutUser().unwrap();
      navigate('/auth')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    if(logoutUserData)
      toast.success(logoutUserData.message)
  },[logoutUserIsSuccess])
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="hidden md:flex max-w-7xl mx-auto justify-between gap-10 h-full items-center px-3">
        <Link to={'/'}>
          <div className="flex items-center gap-2">
            <School size={"30"} />
            <h1 className="font-extrabold text-xl">E-Learning</h1>
          </div>
        </Link>
        

        {/* User icons and dark mode icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-[#1a1a1a]">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-bold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={'/mylearning'}>My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={'/profile'}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/auth')}>Login</Button>
              <Button onClick={() => navigate('/auth')}>Signup</Button>
            </div>
          )}
          <DarkMode/>
        </div>
      </div>

      {/* Mobile */}
      <MobileNavbar/>
    </div>
  );
};

export default Navbar;

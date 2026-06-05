import React from 'react'
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import DarkMode from "@/DarkMode"
import { useSelector } from "react-redux"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MobileNavbar = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="md:hidden flex items-center justify-between gap-3 px-3 h-16">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="dark:bg-[#0A0A0A]">
          <SheetHeader>
            <SheetTitle>E-Learning</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-6">
            <SheetClose asChild>
              <Button variant="ghost" className="justify-start w-full">Home</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="justify-start w-full">Courses</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="justify-start w-full">My Learning</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="justify-start w-full">About</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#1a1a1a]">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-bold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Learning</DropdownMenuItem>
                <DropdownMenuItem>Edit profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Login</Button>
            <Button size="sm">Signup</Button>
          </div>
        )}
        <DarkMode />
      </div>
    </div>
  )
}

export default MobileNavbar
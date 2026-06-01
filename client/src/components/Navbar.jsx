import { School } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      {/* Desktop */}
      <div className='md:flex max-w-7xl mx-auto items-center gap-10 h-full bg-amber-300'>
        <div className='flex items-center gap-2 mx-3'>
          <School size={"30"}/>
          <h1 className='hidden md:block font-extrabold text-xl'>E-Learning</h1>
        </div>
      </div>
    </div>
  )
}

export default Navbar
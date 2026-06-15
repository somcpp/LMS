import React from 'react'

const HeroSection = () => {
  return (
    <div className='relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-12 px-4 text-center'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white text-4xl font-extrabold mb-4 tracking-tight'>
          Find the best Courses designed for you!!!
        </h1>
        <p className='text-blue-100 dark:text-gray-300 text-lg mb-8 max-w-xl mx-auto'>
          Discover, learn, and upskill with our wide range of courses.
        </p>

        {/* Search & Action Container */}
        <div className='flex flex-col sm:flex-col items-center justify-center gap-4 max-w-2xl mx-auto'>
          
          {/* Unified Search Bar */}
          <form onSubmit={(e) => e.preventDefault()} className='flex w-full items-center bg-white dark:bg-gray-700 rounded-full shadow-lg overflow-hidden border border-transparent focus-within:border-blue-300 dark:focus-within:border-gray-500 mb-4'>
            <input 
              type="text" 
              placeholder="Search for courses..."
              className='w-full border-none bg-transparent px-6 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-0'
            />
            <button 
              type="submit"
              className='bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 font-medium transition-colors hover:bg-blue-700 dark:hover:bg-blue-500 shrink-0'
            >
              Search
            </button>
          </form>

          {/* Secondary Action Button */}
          <button className="w-full sm:w-auto bg-white dark:bg-gray-800 text-blue-600 dark:text-white hover:cursor-pointer font-medium px-8 py-3 rounded-full shadow-md transition-all hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shrink-0">
            Explore Courses
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default HeroSection
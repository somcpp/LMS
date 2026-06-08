import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './HeroSection'
import CoursesSection from './CoursesSection'

const Home = () => {
  return (
    <div>
      <div className="pt-16">
        {/* Main content goes here */}
        <HeroSection/>
        <CoursesSection/>
      </div>
    </div>
  )
}

export default Home
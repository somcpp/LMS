import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl mt-2'>Add detailed information regarding course</h1>
        <Link to='lecture'>
          <Button variant='link' className={"hover:text-blue-600 cursor-pointer text-blue-400"}>
            Go to lectures page
          </Button>
        </Link>
      </div>
      
      <CourseTab/>
    </div>
  )
}

export default EditCourse
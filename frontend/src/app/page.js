import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import React from 'react'
import CourseGrid from '@/components/CourseGrid'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CourseGrid/>
    </div>
  )
}

export default page

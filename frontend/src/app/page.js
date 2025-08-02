import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import React from 'react'
import CourseSwitcher from '@/components/CourseSwitcher'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CourseSwitcher/>
    </div>
  )
}

export default page

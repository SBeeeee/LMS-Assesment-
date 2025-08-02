import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import React from 'react'
import Heading from '@/components/Heading'
import CourseSwitcher from '@/components/CourseSwitcher'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Heading/>
      <CourseSwitcher/>
    </div>
  )
}

export default page

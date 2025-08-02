import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import React from 'react'
import Heading from '@/components/Heading'
import CourseSwitcher from '@/components/CourseSwitcher'
import Footer from '@/components/Footer'

function page() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Heading/>
      <CourseSwitcher/>
      <Footer/>
    </div>
  )
}

export default page

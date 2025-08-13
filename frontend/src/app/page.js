"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import React from 'react'
import Heading from '@/components/Heading'
import CourseSwitcher from '@/components/CourseSwitcher'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { checkAuth } from '@/utils/checkAuth'
import { useDispatch } from "react-redux";

function page() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      const result = await checkAuth(dispatch);
      console.log(result);
    }
    fetchAuth();
  }, [])

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

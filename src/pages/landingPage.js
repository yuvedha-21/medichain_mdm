import React from 'react'
// import Scrollbar from '../components/Header_footer/navbar/scrollbar'
import Footer from '../components/Header_footer/footer/footer'
import HomeComponent from '../components/homepage/homeComponent'
import DoctorHome from '../components/doctor/doctorHome'
import Patientcomponent from '../components/patient/patientcomponent'
import Headerbar from '../components/Header_footer/navbar/headerbar'

export default function LandingPage() {
  return (
   <>
   {/* <Scrollbar/> */}
   <Headerbar/>
   <HomeComponent/>
   <DoctorHome/>
   <Patientcomponent/>
   <Footer/>
   </>
  )
}

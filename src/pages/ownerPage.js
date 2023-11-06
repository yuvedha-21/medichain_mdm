import React from 'react'
import Footer from '../components/Header_footer/footer/footer'
import HomeComponent from '../components/homepage/homeComponent'
import DoctorComponent from '../components/doctor/doctorComponent'
import Patientcomponent from '../components/patient/patientcomponent'
import Headerbar from '../components/Header_footer/navbar/headerbar'
import SuperOwnerComponent from "../components/owner/superOwnerComponent"

export default function OwnerPage() {
  return (
    <>

    <Headerbar/>
    <SuperOwnerComponent/>
    <Footer/>
    </>
  )
}


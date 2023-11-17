import React from 'react'
import PatientHome from '../components/patient/patientHome'
import Footer from '../components/Header_footer/footer/footer'
import Headerbar from '../components/Header_footer/navbar/headerbar'
import PatientDAshboard from '../components/patient/patientDAshboard'

export default function PatientPage() {
  return (
    <>
      <Headerbar/>
    <PatientHome/>
    {/* <PatientDAshboard/> */}
    <Footer/>
    </>
  )
}

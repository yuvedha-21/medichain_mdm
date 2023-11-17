import React from 'react'
import PatientHome from '../components/patient/patientHome'
import Footer from '../components/Header_footer/footer/footer'
import Headerbar from '../components/Header_footer/navbar/headerbar'

export default function PatientPage() {
  return (
    <>
      <Headerbar/>
    <PatientHome/>
    <Footer/>
    </>
  )
}

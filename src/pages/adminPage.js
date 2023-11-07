import React from 'react'
import Headerbar from '../components/Header_footer/navbar/headerbar'
import AdminHome from '../components/admin/adminHome'
import AdminPrivilages from '../components/admin/adminPrivilages'
import Footer from '../components/Header_footer/footer/footer'

export default function AdminPage() {
  return (
    <>
    <Headerbar/>
    <AdminHome/>
    <AdminPrivilages/>
    <Footer/>
    
    </>
  )
}

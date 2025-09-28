import React from 'react'
import Header from './components/common/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/common/Footer.jsx'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout

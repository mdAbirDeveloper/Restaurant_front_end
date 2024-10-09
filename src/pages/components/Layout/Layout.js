import React from 'react'
import Navber from '../Shared/Navber'
import Footer from '../Shared/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navber />
        {children}
        <Footer />
    </div>
  )
}

export default Layout
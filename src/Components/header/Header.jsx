import React from 'react'
import "./header.css"
import CTA from "./CVA"
import HeaderSocials from './HeaderSocials'
import ME from "../../assects/rahulFace.jpg"
const Header = () => {
  return (
    <header>
      <div className="container header_container">
        <h5>Hello I'm</h5>
        <h1>Rahul kumar</h1>
        <h5 className="text-light">Full Stack Web Developer</h5>
        <CTA/>
        <HeaderSocials/>

        <div className="me">
          <img src={ME} alt="profile image" />
        </div>

        <a href="#contact" className='scroll_down'>Scroll down</a>
      </div>
    </header>
  )
}

export default Header
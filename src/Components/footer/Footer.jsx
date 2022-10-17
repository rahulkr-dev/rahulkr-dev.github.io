import React from 'react'
import "./footer.css"
import {RiFacebookFill} from "react-icons/ri"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterFill} from "react-icons/ri"
const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer'>RaHUL</a>
      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Expericence</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#testimonials">testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer_socials">
        <a href="htpps://fackbook.com"><RiFacebookFill/></a>
        <a href="htpps://instagram.com"><IoLogoInstagram/></a>
        <a href="htpps://twitter.com"><RiTwitterFill/></a>
      </div>
      <div className="footer_copyright">
        <small>&copy; Rahul kumar . All right reserved</small>
      </div>
    </footer>
  )
}

export default Footer
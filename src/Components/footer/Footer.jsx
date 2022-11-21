import React from 'react'
import "./footer.css"
import {RiFacebookFill} from "react-icons/ri"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterFill} from "react-icons/ri"
import {AiOutlineArrowUp} from "react-icons/ai"
import {BsLinkedin} from "react-icons/bs"
const Footer = () => {
  return (
    <footer>
      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#project">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer_socials">
        <a href="htpps://fackbook.com"><BsLinkedin/></a>
        <a href="htpps://fackbook.com"><RiFacebookFill/></a>
        <a href="htpps://instagram.com"><IoLogoInstagram/></a>
        <a href="htpps://twitter.com"><RiTwitterFill/></a>
      </div>
      <div className="footer_copyright">
        <small>&copy; Rahul kumar . All right reserved</small>
      </div>
      <div className="arro">
        <a href="#"><AiOutlineArrowUp/></a>
      </div>
    </footer>
  )
}

export default Footer
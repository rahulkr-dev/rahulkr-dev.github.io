import React from 'react'
import "./footer.css"
import {RiFacebookFill} from "react-icons/ri"
import {IoLogoInstagram} from "react-icons/io"
import {AiOutlineArrowUp} from "react-icons/ai"
import {RiTwitterFill} from "react-icons/ri"
import {BsLinkedin} from "react-icons/bs"
import {FaGithub} from "react-icons/fa"
import { Box } from '@chakra-ui/react'


const Footer = () => {
  return (
    <footer id="footer">
      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#project">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer_socials">
        <a id="contact-linkedin" href="https://www.linkedin.com/in/rahul-kumar-850b39232/" target="_blank"><BsLinkedin/></a>
        <a id="contact-github" href="https://github.com/rahulkr-dev" target="_blank"><FaGithub/></a>
        <a href="htpps://twitter.com" target="_blank"><RiTwitterFill/></a>
      </div>
      <Box color={"#fff"} className="footer_copyright" >
        <small style={{color:"white"}}>&copy; Rahul kumar . All right reserved</small>
      </Box>
      <div className="arro btn-primary">
        <a href="#"><AiOutlineArrowUp size="1.5rem"/></a>
      </div>
    </footer>
  )
}

export default Footer
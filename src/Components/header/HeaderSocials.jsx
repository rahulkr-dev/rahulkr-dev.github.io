import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {FaGithub} from "react-icons/fa"
import {FaInstagramSquare} from "react-icons/fa"
const HeaderSocials = () => {
  return (
    <div className='header_socials'>
        <a href="https://www.linkedin.com/in/rahul-kumar-850b39232/" target="__blank"><BsLinkedin color="#4db5ff" /></a>
        <a href="https://github.com/fw190480" target="__blank"><FaGithub color="#4db5ff" /></a>
        <a href="#" target="__blank"><FaInstagramSquare color="#4db5ff" /></a>
    </div>
  )
}

export default HeaderSocials
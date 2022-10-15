import React from 'react'
import {BsLinkedin} from "react-icons/bs"
import {FaGithub} from "react-icons/fa"
import {FaInstagramSquare} from "react-icons/fa"
const HeaderSocials = () => {
  return (
    <div className='header_socials'>
        <a href="#" target="__blank"><BsLinkedin/></a>
        <a href="#" target="__blank"><FaGithub/></a>
        <a href="#" target="__blank"><FaInstagramSquare/></a>
    </div>
  )
}

export default HeaderSocials
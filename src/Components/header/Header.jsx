import React from 'react'
import "./header.css"
import CTA from "./CVA"
import HeaderSocials from './HeaderSocials'
import ME from "../../assects/rahulFaceF.png"
import { Box, Heading } from '@chakra-ui/react'
const Header = () => {
  return (
    <header>
      <Box className="container header_container">
        <h5>Hello I'm</h5>
        <Heading fontSize="2.5rem" m=".7rem 0" color="white">Rahul kumar</Heading>
        <h5 className="text-light">Full Stack Web Developer</h5>
        <CTA/>
        <HeaderSocials/>

        <div className="me">
          <img src={ME} alt="profile image" />
        </div>

        <a href="#contact" style={{color:"#4db5ff"}} className='scroll_down'>Scroll down</a>
      </Box>
    </header>
  )
}

export default Header
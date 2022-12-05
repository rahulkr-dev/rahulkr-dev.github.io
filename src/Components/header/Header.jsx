import React from 'react'
import "./header.css"
import CTA from "./CVA"
import HeaderSocials from './HeaderSocials'
import ME from "../../assects/rahulFace3.jpg"
import { Box, Center, Heading, Image } from '@chakra-ui/react'
const Header = () => {
  return (
    <header>
      <Box className="container header_container">
        <h5>Hello I'm</h5>
        <Heading fontSize="2.5rem" m=".7rem 0" color="white">Rahul kumar</Heading>
        <h5 className="text-light">Full Stack Web Developer</h5>
        <CTA />
        <HeaderSocials />

        <Center mt="3rem" >
          <Image
            borderRadius='80px'
            p="1rem"
            w="200px"
            h="250px"
            // boxSize='250px'
            src={ME} alt="profile image" />
        </Center>

        <a href="#contact" style={{ color: "#4db5ff" }} className='scroll_down'>Scroll down</a>
      </Box>
    </header>
  )
}

export default Header
import React from 'react'
import "./header.css"
import CTA from "./CVA"
import HeaderSocials from './HeaderSocials'
import ME from "../../assects/rahulFace3.png"
import { Box, Center, Flex, Grid, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import Hamburger from "../desktop/DrawerForSmallerScreen"
const Header = () => {
  return (
    <Box h={{ lg: "105vh" }}
      //  bg="#2596be"
      p={['1rem', '2rem', '3rem']} >
      <Hamburger />
      <Box >
        <Box mt="4rem" textAlign="center" >
          <Text fontSize="1.2rem" fontWeight="bold" >Hi, I'm</Text>
          <Heading fontSize="2.5rem" color="white">Rahul kumar</Heading>
          <Text color="rgba(255,255,255,0.6)" className="text-light">Full Stack Web Developer</Text>

        </Box>
        <Grid mt="1rem" templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)"]} >
          <Box>
            <Center >
              <Image
                h="350px"
                w="250px"
                borderBottomRadius={"full"}
                src={ME} alt="profile image" />
            </Center>
            <CTA />
          </Box>

          <Grid m={["3rem 0 2rem 0"]} justifyContent="center" alignItems="center" color="#fff" >
            <Heading pb="10px" color="white">About me</Heading>
            <Text>Full Stack Developer with a commitment to efficiency and a natural aptitude for addressing issues. capable of producing production-ready code using front-end and back-end technologies such as HTML, CSS, JavaScript, Redux, Node.js, Express, and MongoDB to create a single page application.</Text>
            <a style={{ border: "1px solid yellow", color: "black", margin: "1rem 0" }} href="#contact" className='btn btn-primary ancherTag'>Let's Talk</a>
          </Grid>


        </Grid>
        {/* <HeaderSocials /> */}



        {/* <a href="#contact" style={{ color: "#4db5ff" }} className='scroll_down'>Scroll down</a> */}
      </Box>
    </Box>
  )
}

export default Header
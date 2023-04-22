import React,{useState,useEffect} from 'react'
import Typed from "react-typed"
import ME from "../../assects/square_img.png"

// Chakra Components
import { Box, Center, Flex, Grid, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
// Icons
import { RiTwitterFill } from "react-icons/ri"
import { BsLinkedin } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"

import Hamburger from "../desktop/DrawerForSmallerScreen"
import { style } from '../../utils/styles'
const Header = () => {

  const boxShadow = "rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px"

  
  return (
    <Box id="home" h={{ lg: "105vh" }}
      //  bg="#2596be"
      p={['1rem', '2rem', '3rem', "3rem"]} >
      <Hamburger />
      <Box >

        <Grid mt={["2rem", "2rem", "4rem", "5rem"]} templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} >
          <Box m="auto" mt={{ lg: "3rem" }}>
            <Center
              borderRadius={"full"}
              w="max-content"
              border={"1px solid black"}
            >
              <Center
                borderRadius="full"
                w="max-content"
                border={"1.5rem solid #2c2c6c"}
                _hover={{ boxShadow: boxShadow, transition: "all .5s ease" }}


              >
                <Image
                className="home-img"
                  boxSize={"300px"}
                  borderRadius={"full"}
                  border={'2px solid black'}

                  // borderBottomRadius={"full"}
                  src={ME} alt="profile image" />
              </Center>
            </Center>
            {/* <CTA /> */}
          </Box>

          <Grid m={["3rem 0 2rem 0"]} justifyContent="center" alignItems="center" color="#fff" boxShadow={{lg:style.boxShadowRight}} w={{ lg: "80%" }} p={["15px","1rem","1rem","10px 2rem 2rem 0" ]} >
            <Box mt={["1rem", "1rem", "1rem"]} textAlign="left" >
              <Text id="user-detail-name" textAlign={["center", "center", "left", "left"]} fontSize="1.2rem" fontWeight="bold" >Hi,😎 I'm Rahul kumar</Text>
              <Heading className="typed-content" textAlign={["center", "center", "left", "left"]} color="orange">
                <Typed strings={["Full-Stack Web-Developer", "Fast Learner","Problem Solver","React Enthusiastic"]} typeSpeed={100} backSpeed={50} loop></Typed>
              </Heading>
            </Box>
            <Text id="user-detail-intro" textAlign={"justify"} fontFamily={"body"} fontSize={"1.1rem"} pr={{ lg: "4rem" }} pb="10px">
              Highly motivated and results-driven full stack developer with a proven track record of success in building web-applications using the MERN stack with JavaScript, React, Node.js, and MongoDB.
            </Text>
            {/* <a href="#contact" className='btn btn-primary'>Let's Talk</a> */}
            <Flex gap="12px" mt="10px">
              <Center className='btn-primary'>
                <a href="https://www.linkedin.com/in/rahul-kumar-850b39232/" target="_blank"><BsLinkedin /></a>
              </Center>
              <Center className='btn-primary'>
                <a href="https://github.com/rahulkr-dev" target="_blank"><FaGithub /></a>
              </Center>
              <Center className='btn-primary'>
                <a href="htpps://twitter.com" target="_blank"><RiTwitterFill /></a>
              </Center>
            </Flex>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Header
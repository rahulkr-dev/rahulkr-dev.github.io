import React from 'react'
import CTA from "./CVA"
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

        <Grid mt="2rem" templateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)"]} >
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

          <Grid m={["3rem 0 2rem 0"]}  justifyContent="center" alignItems="center" color="#fff" >
            <Box mt={["1rem","1rem","4rem"]} textAlign="left" >
              <Text textAlign={["center","center","left"]} fontSize="1.2rem" fontWeight="bold" >Hi, I'm</Text>
              <Heading textAlign={["center","center","left"]} fontSize="2.5rem" color="white">Rahul kumar</Heading>
            </Box>
            <Text textAlign={"justify"} fontFamily={"body"} fontSize={"1.1rem"} pr={{lg:"4rem"}} pb="10px" >
              Highly motivated and results-driven full stack developer with a proven track record of success in building web-applications using the MERN stack (JavaScript, React, Node.js, and MongoDB).
            </Text>
            <a href="#contact" className='btn btn-primary'>Let's Talk</a>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Header
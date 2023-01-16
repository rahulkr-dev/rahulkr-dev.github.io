import React from 'react'
import ME from "../../assects/template.jpg";
import { FaAward } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { VscFolderLibrary } from "react-icons/vsc"
import { Box, Heading,VStack,Text } from '@chakra-ui/react';
import {about_content_heading,about_content_middle,about_content_bottom} from "./aboutContent"
const About = () => {
  return (
    <Box m="auto" mb="3rem" w={["90%","90%","75%"]} id='about' color={'#fff'} >
      <Heading color={"rgba(255,255,255,0.6)"} pb="1rem">About Me</Heading>
      <VStack  textAlign={"justify"} >
        <Text fontSize={"1.1rem"} fontFamily={"body"} >{about_content_heading}</Text>
        <Text fontSize={"1.1rem"} fontFamily={"body"} >{about_content_middle}</Text>
        <Text fontSize={"1.1rem"} fontFamily={"body"}>{about_content_bottom}</Text>
        {/* <Text textAlign={"left"} >Thank you for visiting my portfolio, I hope you enjoy exploring my work.</Text> */}
      </VStack>
    </Box>
  )
}

export default About
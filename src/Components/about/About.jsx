import React from 'react';
import { Box, Heading,VStack,Text } from '@chakra-ui/react';
import {about_content_heading,about_content_middle,about_content_bottom} from "./aboutContent";
import { style } from '../../utils/styles';
const About = () => {
  return (
    <Box m="auto" mb="3.3rem" w={["90%","90%","75%"]} id='about' color={'#fff'} boxShadow={style.boxShadowLeft} p={["10px","1rem","1rem","2rem"]} >
      <Heading color={style.orange_color} pb="1rem">About Me</Heading>
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
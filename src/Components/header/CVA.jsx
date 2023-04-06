import React from 'react'
import CV from "../../assects/rahul-kumar_resume.pdf"
import {FiDownload} from "react-icons/fi"
import { Box, Flex } from '@chakra-ui/react'

export default function CVA() {
  return (
    <Flex justifyContent={"center"} gap="8px" mt="1rem" >
        <a  className='btn btn-primary' href="https://drive.google.com/file/d/1Flsb1Bkkpvqjc5gozAlxrSqSbUzoxAml/view?usp=sharing"  target="_blank" >Resume</a>
        <a  className='btn btn-primary' href={CV} download>
          <FiDownload size="1.5rem" />
        </a>
    </Flex>
  )
}

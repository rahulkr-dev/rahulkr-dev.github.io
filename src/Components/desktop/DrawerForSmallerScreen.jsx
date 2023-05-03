import React, { useState } from 'react'
import "./desktop.css"
import { AiOutlineHome } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { BiBook } from "react-icons/bi"
import { GrServicePlay } from "react-icons/gr"
import { BiMessageSquareError } from "react-icons/bi"
import { VscProject } from "react-icons/vsc"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Grid,
  GridItem,
  Box,
  Flex
} from '@chakra-ui/react'


import { GiHamburgerMenu } from "react-icons/gi"
export default function DrawerExample() {
  let [navActice, setNavActive] = useState('#')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const style = {
    display: 'flex',
    gap: "10px",
    alignItem: 'center'
  }

  return (
    <Box className="hamburger" >
      <Flex p="1rem" alignItems={"center"} pl="1rem" w="full" onClick={onOpen} borderBottomWidth="2px" boxShadow={"dark-lg"}>
        <GiHamburgerMenu color={"white"} size="1.5rem" />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader color={"white"} bg={"radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)"}>Rahul kumar</DrawerHeader>

          <DrawerBody color={"white"} bg={"radial-gradient(circle at 1.8% 4.8%, rgb(17, 23, 58) 0%, rgb(58, 85, 148) 90%)"} >
            <Grid gap="1rem">
              <a style={style} href="#" onClick={onClose} ><AiOutlineHome /><span>Home</span></a>
              <a style={style} href="#about" onClick={onClose} ><AiOutlineUser /><span>About</span></a>
              <a style={style} href="#skills" onClick={onClose}><BiBook /><span>Skills</span></a>
              <a style={style} href="#projects" onClick={onClose}><VscProject /><span>Project</span></a>
              <a style={style} href="#contact" onClick={onClose}><BiMessageSquareError /><span>Contact</span></a>
              <a style={style} href="https://drive.google.com/drive/folders/15OJ-hD2D2zGTPuPBEwB84OWx9k7-fg0R?usp=sharing" target="_blank" >Resume</a>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
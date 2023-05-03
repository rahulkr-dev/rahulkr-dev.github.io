import React, { useState } from 'react'
import "./desktop.css"

import Typed from "react-typed";

import RESUME from "../../assects/rahul-kumar_resume.pdf"
import { Button, Flex, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { BiBook } from "react-icons/bi"
import { GrServicePlay } from "react-icons/gr"
import { BiMessageSquareError } from "react-icons/bi"
import { VscProject } from "react-icons/vsc"
import { FiDownload } from "react-icons/fi"

const driveLink = "https://drive.google.com/file/d/1Flsb1Bkkpvqjc5gozAlxrSqSbUzoxAml/view?usp=sharing"
const Desktop = () => {
  let [navActive, setNavActive] = useState('#');
  const downloadResume = ()=>{
    window.open(driveLink,"_blank");
  }


  return (
    <>

      <div id="nav-menu" className='desktop'>
        <Text flexGrow={"1"}  pl="4rem" fontSize={"1.6rem"} className='logo' fontWeight={"bold"} color={"white"} alignSelf={"left"}>
        <Typed strings={["—(••÷[ Řαｈ𝐔𝐋 ]÷••)—"]} typeSpeed={50} backSpeed={50} loop></Typed>

        </Text>
        <a href="#" onClick={() => setNavActive("#")} className={navActive == '# nav-link home' ? "active" : "nav-link home"} ><AiOutlineHome /><span>Home</span></a>
        <a href="#about" onClick={() => setNavActive("#about")} className={navActive == '#about' ? "active nav-link about" : "nav-link about"}><AiOutlineUser /><span>About</span></a>
        <a href="#skills" onClick={() => setNavActive("#experience")} className={navActive == '#experience' ? "active nav-link skills" : "nav-link skills"}><BiBook /><span>Skills</span></a>
        <a href="#projects" onClick={() => setNavActive("#services")} className={navActive == '#services' ? "active nav-link projects" : "nav-link projects"}><VscProject /><span>Project</span></a>
        <a href="#contact" onClick={() => setNavActive("#contact")} className={navActive == '#contact' ? "active nav-link contact" : "nav-link contact"}><BiMessageSquareError /><span>Contact</span></a>
        <Flex>
          <a id="resume-button-1" href={RESUME} download onClick={downloadResume} className='nav-link resume' >Resume</a>
          {/* <a className='resume-button-2' href={RESUME} download>
            <FiDownload size="1.5rem" />
          </a> */}
        </Flex>
      </div>


    </>
  )
}

export default Desktop
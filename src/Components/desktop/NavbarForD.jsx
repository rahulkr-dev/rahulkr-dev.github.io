import React, { useState } from 'react'
import "./desktop.css"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineUser} from "react-icons/ai"
import {BiBook} from "react-icons/bi"
import {GrServicePlay} from "react-icons/gr"
import {BiMessageSquareError} from "react-icons/bi"
import {VscProject} from "react-icons/vsc"
// import Theme from '../other/ColorMode'
const style = {
  border:"none"
}
const Desktop = () => {
  let [navActice,setNavActive] = useState('#')
  // console.log(navActice)
  return (
    <>
    <div className='desktop'>
      <a href="#" onClick={()=>setNavActive("#")} className={navActice=='#'?"active":""} ><AiOutlineHome/><span>Home</span></a>
      <a href="#" onClick={()=>setNavActive("#about")} className={navActice=='#about'?"active":""}><AiOutlineUser/><span>About</span></a>
      <a href="#skills" onClick={()=>setNavActive("#experience")} className={navActice=='#experience'?"active":""}><BiBook/><span>Skills</span></a>
      <a href="#project" onClick={()=>setNavActive("#services")} className={navActice=='#services'?"active":""}><VscProject/><span>Project</span></a>
      <a href="#contact" onClick={()=>setNavActive("#contact")} className={navActice=='#contact'?"active":""}><BiMessageSquareError/><span>Contact</span></a>
      <a href="https://drive.google.com/file/d/1Flsb1Bkkpvqjc5gozAlxrSqSbUzoxAml/view?usp=sharing"  target="_blank" >Resume</a>

      {/* <Theme/> */}
    </div>
      
    </>
  )
}

export default Desktop
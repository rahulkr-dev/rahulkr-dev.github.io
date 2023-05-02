import React, { useState } from 'react'
import "./nav.css"
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineUser} from "react-icons/ai"
import {BiBook} from "react-icons/bi"
import {GrServicePlay} from "react-icons/gr"
import {BiMessageSquareError} from "react-icons/bi"
import {VscProject} from "react-icons/vsc"
const Nav = () => {
  let [navActice,setNavActive] = useState('#')
  // console.log(navActice)
  return (
    <nav>
      <a  href="#" onClick={()=>setNavActive("#")} className={navActice=='#'?"active nav-link home":"nav-link home"} ><AiOutlineHome/></a>
      <a  href="#about" onClick={()=>setNavActive("#about")} className={navActice=='#about'?"active nav-link about":"nav-link about"}><AiOutlineUser/></a>
      <a  href="#skills" onClick={()=>setNavActive("#experience")} className={navActice=='#experience'?"active nav-link skills":"nav-link skills"}><BiBook/></a>
      <a  href="#projects" onClick={()=>setNavActive("#services")} className={navActice=='#services'?"active nav-link projects":"nav-link projects"}><VscProject/></a>
      <a  href="#contact" onClick={()=>setNavActive("#contact")} className={navActice=='#contact'?"active nav-link contact":"nav-link contact"}><BiMessageSquareError/></a>
    </nav>
  )
}

export default Nav
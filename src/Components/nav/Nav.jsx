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
    <nav id="nav-menu">
      <a href="#" onClick={()=>setNavActive("#")} className={navActice=='#'?"active":""} ><AiOutlineHome/></a>
      <a href="#about" onClick={()=>setNavActive("#about")} className={navActice=='#about'?"active":""}><AiOutlineUser/></a>
      <a href="#skills" onClick={()=>setNavActive("#experience")} className={navActice=='#experience'?"active":""}><BiBook/></a>
      <a href="#projects" onClick={()=>setNavActive("#services")} className={navActice=='#services'?"active":""}><VscProject/></a>
      <a href="#contact" onClick={()=>setNavActive("#contact")} className={navActice=='#contact'?"active":""}><BiMessageSquareError/></a>
    </nav>
  )
}

export default Nav
import React from 'react'
import { AiFillHtml5 } from "react-icons/ai"
import { TbBrandCss3 } from "react-icons/tb"
import { TbBrandJavascript } from "react-icons/tb"
import { FaReact } from "react-icons/fa"
import { SiChakraui } from "react-icons/si"
import { DiNodejs } from "react-icons/di"
import { SiExpress } from "react-icons/si"
import { SiRedux } from "react-icons/si"
import { DiMongodb } from "react-icons/di"
import { SiRedis } from "react-icons/si"
import "./skills.css"

  const skillsArr = [AiFillHtml5, TbBrandCss3, TbBrandJavascript, FaReact, SiChakraui, DiNodejs, SiExpress, SiRedux, DiMongodb, SiRedis];

  const containerArr = skillsArr.map(item=>(
    <div className="skill_card">
      {<item/>}
    </div>
  ))
const Skills = () => {
  return (
    <div id="skills">
      <h1>Skills</h1>
      <div className="skill_container">
        <div className="skill-card">
          <AiFillHtml5 className='skill-icon'/>
          <h5>HTML5</h5>
        </div>
        <div className="skill-card">
          <TbBrandCss3 className='skill-icon'/>
          <h5>CSS3</h5>
        </div>
        <div className="skill-card">
          <TbBrandJavascript className='skill-icon'/>
          <h5>JAVASCRIPT</h5>
        </div>
        <div className="skill-card">
          <FaReact className='skill-icon'/>
          <h5>REACTJS</h5>
        </div>
        <div className="skill-card">
          <SiChakraui className='skill-icon'/>
          <h5>CHAKRAUI</h5>
        </div>
        <div className="skill-card">
          <SiRedux className='skill-icon'/>
          <h5>REDUX</h5>
        </div>
        <div className="skill-card">
          <DiNodejs className='skill-icon'/>
          <h5>NODEJS</h5>
        </div>
        <div className="skill-card">
          <SiExpress className='skill-icon'/>
          <h5>EXPRESSJS</h5>
        </div>
        <div className="skill-card">
          <DiMongodb className='skill-icon'/>
          <h5>MONGODB</h5>
        </div>
        <div className="skill-card">
          <SiRedis className='skill-icon'/>
          <h5>REDIS</h5>
        </div>
      </div>
    </div>
  )
}

export default Skills
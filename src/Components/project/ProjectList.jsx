import "./projectList.css"
import booking from "../../assects/project/bookingWeb.gif"
import ls from "../../assects/project/lifeStyleStore.gif"
import vidfy from "../../assects/project/vidfy.gif"

// importing tech-stack components form react-icons
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

import React from 'react'
import { Text, Heading, UnorderedList, ListItem } from "@chakra-ui/react"


export const LifeStyleStore2 = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={ls} alt="" />
        <Heading mb="7px" fontSize="1.4rem" color="black" className="tech-stack-heading">TECH STACK</Heading>
        <div className='project-tech-stack'>
          <div className="individual-tech-stack">
            <AiFillHtml5 className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >HTML</Text>
          </div>
          <div className="individual-tech-stack">
            <TbBrandCss3 className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >CSS</Text>
          </div> <div className="individual-tech-stack">
            <TbBrandJavascript className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >javaScript</Text>
          </div> <div className="individual-tech-stack">
            <FaReact className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >reactJs</Text>
          </div> <div className="individual-tech-stack">
            <SiChakraui className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >ChakraUI</Text>
          </div>
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <h1>LifeStyleStore.com</h1>
          <Text fontSize="13px" fontWeight="bold"  >Lifestyle is a online store lifestylestores.com where customers can shop from the convenience of their home. 15k+Customers.</Text>
          <p>you can add product to basket and wishlist </p>
          <p>apply promocode and payment</p>
          <h5>it is a collaborative project</h5>
        </div>
        <div className="project-desc-btn">
          <button className='btn' ><a href="https://luxury-fenglisu-f82f7e.netlify.app/" target="_blank">Live</a></button>
          <button className='btn' ><a href="https://github.com/Sandeeprawat313/UNIT--2-group-project-" target="_blank">Github</a></button>
        </div>
      </div>
    </div>
  )
}
export const Zee5 = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={vidfy} alt="" />
        <Heading mb="7px" fontSize="1.4rem" color="black" className="tech-stack-heading">TECH STACK</Heading>
        <div className='project-tech-stack'>
          <div className="individual-tech-stack">
            <TbBrandJavascript className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >javaScript</Text>
          </div>
          <div className="individual-tech-stack">
            <FaReact className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >reactJs</Text>
          </div>
          <div className="individual-tech-stack">
            <SiRedux className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >Redux</Text>
          </div>
          <div className="individual-tech-stack">
            <SiChakraui className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >ChakraUI</Text>
          </div>
          <div className="individual-tech-stack">
            <DiNodejs className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >NodeJs</Text>
          </div>
          <div className="individual-tech-stack">
            <SiExpress className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >ExpressJs</Text>
          </div>
          <div className="individual-tech-stack">
            <DiMongodb className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >MongoDB</Text>
          </div>
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <h1>Vidfy</h1>
          <Text fontSize="13px" fontWeight="bold"  >Vidfy is an online video streaming platform where you can watch latest movie,Tv-shows and web-series.</Text>
          <p>watch anything as you want</p>
          <p>you can also buy premium subscription</p>
          <h5>it is a collaborative project</h5>
        </div>
        <div className="project-desc-btn">
          <button className='btn' ><a href="https://luxury-fenglisu-f82f7e.netlify.app/" target="_blank">Live</a></button>
          <button className='btn' ><a href="https://github.com/Pradyumancoder/elastic-punishment-3534/tree/master/clientside/zee5" target="_blank">Github</a></button>
        </div>
      </div>
    </div>
  )
}
export const Booking = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={booking} alt="" />
        <Heading mb="7px" fontSize="1.4rem" color="black" className="tech-stack-heading">TECH STACK</Heading>        <div className='project-tech-stack'>
          <div className="individual-tech-stack">
            <AiFillHtml5 className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >HTML</Text>
          </div>
          <div className="individual-tech-stack">
            <TbBrandCss3 className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >CSS</Text>
          </div> <div className="individual-tech-stack">
            <TbBrandJavascript className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >javaScript</Text>
          </div> <div className="individual-tech-stack">
            <FaReact className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >reactJs</Text>
          </div> <div className="individual-tech-stack">
            <SiChakraui className="project-icon" />
            <Text fontSize="13px" fontWeight="bold"  >chakraUI</Text>
          </div>
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <h1>Booking.com</h1>
          <Text fontSize="13px" fontWeight="bold"  >It is an online plateform where you can book you hotels , flight ticket , taxi and more</Text>
          <p>I worked on sign-up and login functionalites and landing page </p>
          <p>you can also able to see you flight</p>
          <h5>it is a Individual project project</h5>
        </div>
        <div className="project-desc-btn">
          <button className='btn' ><a href="https://stupendous-pastelito-f25570.netlify.app/register" target="__blank">Live</a></button>
          <button className='btn' ><a href="https://github.com/fw190480/dynamic_fork_8477" target="__blank">Github</a></button>
        </div>
      </div>
    </div>
  )
}




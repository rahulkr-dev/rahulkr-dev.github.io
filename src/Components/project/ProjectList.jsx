import "./projectList.css"
import img1 from "../../assects/project/bookingHomePage.png"
import img2 from "../../assects/project/bookingLandingPage.png"
import img3 from "../../assects/project/lifeStyleBucket.png"
import img4 from "../../assects/project/lifeStyleHomePage.png"

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

export const LifeStyleStore = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={img1} alt="" />
        <div className='project-tech-stack'>
          <AiFillHtml5 className="project-icon" />
          <TbBrandCss3 className="project-icon" />
          <TbBrandJavascript className="project-icon" />
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
        <h1>Booking.com</h1>
          <h4>It is an online plateform where you can book you hotels , flight ticket , taxi and more</h4>
          <p>I worked on sign-up and login functionalites and landing page </p>
          <p>you can also able to see you flight</p>
          <h5>it is a Individual project project</h5>
        </div>
        <div className="project-desc-btn">
          <button className='btn' >Live</button>
          <button className='btn' >Github</button>
        </div>
      </div>
    </div>
  )
}
export const LifeStyleStore2 = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={img2} alt="" />
        <div className='project-tech-stack'>
          <AiFillHtml5 className="project-icon" />
          <TbBrandCss3 className="project-icon" />
          <TbBrandJavascript className="project-icon" />
          <FaReact className="project-icon" />
          <SiChakraui className="project-icon" />
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <h1>LifeStyleStore.com</h1>
          <h4>Lifestyle is a online store lifestylestores.com where customers can shop from the convenience of their home. 15k+Customers.</h4>
          <p>you can add product to basket and wishlist </p>
          <p>apply promocode and payment</p>
          <h5>it is a collaborative project</h5>
        </div>
        <div className="project-desc-btn">
          <button className='btn' >Live</button>
          <button className='btn' >Github</button>
        </div>
      </div>
    </div>
  )
}
export const Booking = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={img3} alt="" />
        <div className='project-tech-stack'>
          <AiFillHtml5 className="project-icon" />
          <TbBrandCss3 className="project-icon" />
          <TbBrandJavascript className="project-icon" />
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi fuga, ipsam accusantium quos dolores debitis eum obcaecati eaque culpa excepturi id placeat praesentium molestiae! Maxime, nostrum. Vero animi quo placeat minima tempore natus. Architecto natus quod hic doloremque incidunt a!</p>
        </div>
        <div className="project-desc-btn">
          <button className='btn' >Live</button>
          <button className='btn' >Github</button>
        </div>
      </div>
    </div>
  )
}
export const Booking2 = () => {
  return (
    <div className='project-card'>
      <div className="project-img">
        <img src={img4} alt="" />
        <div className='project-tech-stack'>
          <AiFillHtml5 className="project-icon" />
          <TbBrandCss3 className="project-icon" />
          <TbBrandJavascript className="project-icon" />
          <FaReact className="project-icon" />
          <SiChakraui className="project-icon" />
        </div>
      </div>
      <div className="project-desc">
        <div className='project-desc-content' >
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, quo!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi fuga, ipsam accusantium quos dolores debitis eum obcaecati eaque culpa excepturi id placeat praesentium molestiae! Maxime, nostrum. Vero animi quo placeat minima tempore natus. Architecto natus quod hic doloremque incidunt a!</p>
        </div>
        <div className="project-desc-btn">
          <button className='btn' >Live</button>
          <button className='btn' >Github</button>
        </div>
      </div>
    </div>
  )
}



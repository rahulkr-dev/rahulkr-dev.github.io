
import React from 'react'
import "./experience.css"
import { BsPatchCheckFill } from "react-icons/bs"

const Experience = () => {
  return (
    <section id='experience'>
      <h5>What skills I have</h5>
      <h1>My Experience</h1>
      <div className="container experience_container">
        <div className="experience_fontend">
          <h5>Frontend Development</h5>
          <div className="experience_content">
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>HTML</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>Css</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>ChakraUi</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>javaScript</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>ReactJs</h4>
              <small >Experienced</small>
            </article>
          </div>
        </div>
        <div className="backend">
        <h5>Backend Development</h5>
          <div className="experience_content">
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>HTML</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>Css</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>ChakraUi</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>javaScript</h4>
              <small >Experienced</small>
            </article>
            <article className='experience_details'>
              <BsPatchCheckFill />
              <h4>ReactJs</h4>
              <small >Experienced</small>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
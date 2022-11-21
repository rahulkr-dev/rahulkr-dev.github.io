import React from 'react'
import "./about.css"
import ME from "../../assects/template.jpg";
import { FaAward } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { VscFolderLibrary } from "react-icons/vsc"
import { Heading } from '@chakra-ui/react';
const About = () => {
  return (
    <div id='about'>
      <h5>Get To Know</h5>
      <Heading color="white">About me</Heading>
      <div className="container about_container">
        <div className="about_me">
          <div className="about_me-image">
            <img src={ME} alt="another image" />
          </div>
        </div>
        <div className="about_content">
          {/* <div className="about_cards">
            <article className='about_card'>
              <FaAward className='about_icon' />
              <h5>Expereince</h5>
              <small>3+ Years Experience</small>
            </article>
            <article className='about_card'>
              <FiUsers className='about_icon' />
              <h5>Clients</h5>
              <small>200 world wide</small>
            </article>
            <article className='about_card'>
              <VscFolderLibrary className='about_icon' />
              <h5>Project</h5>
              <small>88+ project completed</small>
            </article>
          </div> */}
          <p>Full Stack Developer with a commitment to efficiency and a natural aptitude for addressing issues. capable of producing production-ready code using front-end and back-end technologies such as HTML, CSS, JavaScript, Redux, Node.js, Express, and MongoDB to create a single page application. I'm looking forward to working with Red Technologies to expand my skill set while making a delicate contribution to an organisation.</p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </div>
  )
}

export default About
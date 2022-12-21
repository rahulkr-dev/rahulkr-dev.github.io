import React from 'react'
import "./about.css"
import ME from "../../assects/template.jpg";
import { FaAward } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { VscFolderLibrary } from "react-icons/vsc"
import { Box, Heading } from '@chakra-ui/react';
const About = () => {
  return (
    <Box id='about'>
      <h5>Get To Know</h5>
     
      <div className="container about_container">
        {/* <div className="about_me">
          <div className="about_me-image">
            <img src={ME} alt="another image" />
          </div>
        </div> */}
        <div className="about_content">
          <p>Full Stack Developer with a commitment to efficiency and a natural aptitude for addressing issues. capable of producing production-ready code using front-end and back-end technologies such as HTML, CSS, JavaScript, Redux, Node.js, Express, and MongoDB to create a single page application.</p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </Box>
  )
}

export default About
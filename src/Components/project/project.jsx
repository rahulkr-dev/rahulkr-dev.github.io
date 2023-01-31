import { Heading, Box } from '@chakra-ui/react';
import React from 'react'
import "./project.css";
import { zee5, lifeStyle, tripvilla, bookingWeb, gearHub } from './projectContent';
import {ProjectCardItem } from './ProjectList';



// import 'swiper/css/scrollbar';
const Project = () => {
  return (
    <Box p="1rem" id="project">
      <Heading color={"rgba(255,255,255,0.6)"} p={['1rem', '1rem', '1rem 3rem']}>Projects</Heading>
      <Box p={['10px', '10px',"1rem", '0 4rem']} className='project-container'>

        <ProjectCardItem project={zee5} />
        <ProjectCardItem project={tripvilla} />
        <ProjectCardItem project={bookingWeb} />
        <ProjectCardItem project={gearHub} />
        <ProjectCardItem project={lifeStyle} />
    
      </Box>

    </Box>
  )
}

export default Project
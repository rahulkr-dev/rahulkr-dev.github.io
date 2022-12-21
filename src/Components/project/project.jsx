import { Heading, Box } from '@chakra-ui/react';
import React from 'react'
import "./project.css";
import { Booking, LifeStyleStore2, Zee5,Porfolio,TripVilla } from './ProjectList';



// import 'swiper/css/scrollbar';
const Project = () => {
  return (
    <Box p="1rem" id="project">
      <Heading p={['1rem', '1rem', '1rem 3rem']} color="black">Projects</Heading>
      <Box p={['10px', '10px', '0 4rem']} className='project-container'>
        <Zee5 />
        <LifeStyleStore2 />
        <Booking />
        <TripVilla />
        {/* <Porfolio /> */}
    
      </Box>

    </Box>
  )
}

export default Project
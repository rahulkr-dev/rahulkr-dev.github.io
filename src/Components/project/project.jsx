import React,{useState,useEffect} from 'react'
import { Heading, Box, Flex,Text } from '@chakra-ui/react';
import "./project.css";
import { zee5, lifeStyle, tripvilla, bookingWeb, gearHub } from './projectContent';
import {ProjectCardItem } from './ProjectList';
import { style } from '../../utils/styles';
import projectData from './projectContent';



const Project = () => {
  const [active,setActive] = useState("all");
  const [data,setData] = useState([]);

  useEffect(()=>{
    updateData(active)
  },[active]);

  const updateData = (active='all')=>{
    if(active=="all"){
      setData([...projectData]);
      return;
    }
    let filterData = projectData.filter((proj)=>{
      return proj.type==active
    });
    setData(filterData)
  }


  return (
    <Box mb="4rem" p="1rem" id="projects">
      <Heading color={style.orange_color} p={['1rem', '1rem', '1rem 3rem',"1rem 6rem"]}>My PROJECTS</Heading>
      <Flex mb={["2em","3rem","3rem","4rem"]} fontFamily={"cursive"} justifyContent={"center"} alignItems={"center"} gap="1rem" flexWrap={"wrap"}>
        <Text onClick={()=>setActive("all")} className={`btn ${active=="all"?"btn-active-project":""}`}>ALL</Text>
        <Text onClick={()=>setActive("react")} className={`btn ${active=="react"?"btn-active-project":""}`}>REACT</Text>
        <Text onClick={()=>setActive("mern")} className={`btn ${active=="mern"?"btn-active-project":""}`}>MERN</Text>
        <Text onClick={()=>setActive("javascript")} className={`btn ${active=="javascript"?"btn-active-project":""}`}>JAVASCRIPT</Text>
      </Flex>
      <Box p={['10px', '10px',"1rem", '0 4rem']} className='project-container'>
        {
          data.map((project,index)=>(
            <ProjectCardItem key={index} project={project} />

          ))
        }
    
      </Box>

    </Box>
  )
}

export default Project
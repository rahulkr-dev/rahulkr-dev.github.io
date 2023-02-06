import "./projectList.css"
import booking from "../../assects/project/bookingWeb.gif"
import ls from "../../assects/project/lifeStyleStore.gif"
import vidfy from "../../assects/project/vidfy.gif"
import cozytrip from "../../assects/project/tripVilla/homePage.png"
import portfolio from "../../assects/project/portfolio/portfolio.png"

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
import { Text, Heading, UnorderedList, ListItem, Box, Flex, Badge, Grid, Button, Image } from "@chakra-ui/react"



export const ProjectCardItem = ({project}) => {
  const {github,live,techStackName,name,desc,techStack,image} = project
  return (
    <Box w="350px" className='project-card' m="auto">
      <Box className="project-img">
        <Image src={image} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href={live} target="_blank">Live</a></Button>
        <Button className='btn' ><a href={github} target="_blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color={"rgba(255,255,255,0.6)"}>TECH STACK</Text>
        <Flex gap="4px" pb="6px" wrap="wrap">
        {techStackName.map((item,i)=>(
          <Badge key={i} colorScheme={item.color}>{item.name}</Badge>
        ))}
        </Flex>
      </Grid>

      <Box fontFamily={"heading"} className="project-desc">
        <Box mt="6px" className='project-desc-content' >
          <Text color="gray.400" fontSize="17px" fontWeight="bold" >{name}</Text>
          <Text color="gray.200" fontFamily={"heading"} fontSize="14px"  >{desc}</Text>
        </Box>
      </Box>
      <Flex color="#4db5ff" m="10px 0 10px 0" wrap="wrap" gap="5px" >
        {techStack.map((Item,i)=>(
          <Item key={i} size="1.6rem" />
        ))}
      </Flex>
    </Box>
  )
}



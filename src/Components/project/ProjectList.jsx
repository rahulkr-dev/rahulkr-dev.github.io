import React from 'react'
import "./projectList.css"
import { Text,Box, Flex, Badge, Grid, Button, Image } from "@chakra-ui/react";
import { style } from '../../utils/styles';



export const ProjectCardItem = ({project}) => {
  const {github,live,techStackName,name,desc,techStack,image} = project
  return (
    <Box w="350px" className='project-card' m="auto" p={{base:"10px",md:"auto"}}>
      <Box className="project-img">
        <Image src={image} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn project-github-link' ><a href={live} target="_blank">Live</a></Button>
        <Button className='btn project-deployed-link' ><a href={github} target="_blank">Github</a></Button>
      </Box>
      <Grid className='project-tech-stack'>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color={"rgba(255,255,255,0.6)"}>TECH STACK</Text>
        <Flex gap="4px" pb="6px" wrap="wrap">
        {techStackName.map((item,i)=>(
          <Badge key={i} colorScheme={item.color}>{item.name}</Badge>
        ))}
        </Flex>
      </Grid>

      <Box fontFamily={"heading"} className="project-desc">
        <Box mt="6px" className='project-desc-content' >
          <Text className='project-title' textTransform={"uppercase"} color="gray.400" fontSize="17px" fontWeight="bold" >{name}</Text>
          <Text className='project-description' color="gray.200" fontFamily={"heading"} fontSize="14px"  >{desc}</Text>
        </Box>
      </Box>
      <Flex  color={style.orange_color} m="10px 0 10px 0" wrap="wrap" gap="2px" >
        {techStack.map((Item,i)=>(
          <Item key={i} size="1.6rem" />
        ))}
      </Flex>
    </Box>
  )
}



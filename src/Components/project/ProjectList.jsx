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


export const LifeStyleStore2 = () => {
  return (
    <Box className='project-card'>
      <Box className="project-img">
        <Image src={ls} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href="https://luxury-fenglisu-f82f7e.netlify.app/" target="_blank">Live</a></Button>
        <Button className='btn' ><a href="https://github.com/Sandeeprawat313/UNIT--2-group-project-" target="_blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color="black">TECH STACK</Text>
        <Flex pb="6px" wrap="wrap">
          <Badge colorScheme='green'>HTML</Badge>
          <Badge colorScheme='red'>CSS</Badge>
          <Badge colorScheme='purple'>JavaScript</Badge>
          <Badge>ReactJs</Badge>
          <Badge colorScheme='green'>nodeJs</Badge>
          <Badge colorScheme='blue'>expressJs</Badge>
          <Badge colorScheme='red'>mongoDB</Badge>
          <Badge colorScheme='purple'>redis</Badge>

        </Flex>
      </Grid>

      <Box className="project-desc">
        <Box mt="6px" className='project-desc-content' >
          <Text fontSize="15px" fontWeight="bold" >LifeStyleStore</Text>
          <Text fontSize="14px" fontWeight="bold"  >Lifestyle is a online store lifestylestores.com where customers can shop from the convenience of their home.</Text>

        </Box>

      </Box>
      <Flex m="10px 0 10px 0" wrap="wrap" gap="3px" >
        <AiFillHtml5 size="1.6rem" />
        <TbBrandCss3 size="1.6rem" />
        <TbBrandJavascript size="1.6rem" />
        <FaReact size="1.6rem" />
        <SiChakraui size="1.6rem" />
        <DiNodejs size="1.6rem" />
        <SiExpress size="1.6rem" />
        <DiMongodb size="1.6rem" />
      </Flex>
    </Box>
  )
}
export const Zee5 = () => {
  return (
    <Box className='project-card'>
      <Box className="project-img">
        <img src={vidfy} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href="https://luxury-fenglisu-f82f7e.netlify.app/" target="_blank">Live</a></Button>
        <Button className='btn' ><a href="https://github.com/Pradyumancoder/elastic-punishment-3534/tree/master/clientside/zee5" target="_blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color="black">TECH STACK</Text>
        <Flex pb="6px" wrap="wrap">
          <Badge colorScheme='green'>HTML</Badge>
          <Badge colorScheme='red'>CSS</Badge>
          <Badge colorScheme='purple'>JavaScript</Badge>
          <Badge>ReactJs</Badge>
          <Badge colorScheme='green'>nodeJs</Badge>
          <Badge colorScheme='blue'>expressJs</Badge>
          <Badge colorScheme='red'>mongoDB</Badge>
          <Badge colorScheme='purple'>redis</Badge>

        </Flex>
      </Grid>

      <Box className="project-desc">
        <Box className='project-desc-content'>
          <Text fontSize="15px" fontWeight="bold" >Vidfy</Text>
          <Text fontSize="13px" fontWeight="bold"  >Vidfy is an online video streaming platform where you can watch latest movie,Tv-shows and web-series.</Text>
        </Box>
      </Box>
      <Flex m="10px 0 10px 0" wrap="wrap" gap="3px" >
        <AiFillHtml5 size="1.6rem" />
        <TbBrandCss3 size="1.6rem" />
        <TbBrandJavascript size="1.6rem" />
        <FaReact size="1.6rem" />
        <SiChakraui size="1.6rem" />
        <DiNodejs size="1.6rem" />
        <SiExpress size="1.6rem" />
        <DiMongodb size="1.6rem" />
      </Flex>
    </Box>
  )
}
export const Booking = () => {
  return (
    <Box className='project-card'>
      <Box className="project-img">
        <Image src={booking} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href="https://stupendous-pastelito-f25570.netlify.app/register" target="__blank">Live</a></Button>
        <Button className='btn' ><a href="https://github.com/rahulkr-dev/dynamic_fork_8477" target="__blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color="black">TECH STACK</Text>
        <Flex pb="6px" wrap="wrap">
          <Badge colorScheme='green'>HTML</Badge>
          <Badge colorScheme='red'>CSS</Badge>
          <Badge colorScheme='purple'>JavaScript</Badge>
          <Badge>ReactJs</Badge>


        </Flex>
      </Grid>
      <Box className="project-desc">
        <Box className='project-desc-content' >
          <Text fontSize="15px" fontWeight="bold" >Booking</Text>
          <Text fontSize="13px" fontWeight="bold"  >It is an online plateform where you can book you hotels , flight ticket , taxi and more</Text>
        </Box>

      </Box>
      <Flex m="10px 0 10px 0" wrap="wrap" gap="3px" >
        <AiFillHtml5 size="1.6rem" />
        <TbBrandCss3 size="1.6rem" />
        <TbBrandJavascript size="1.6rem" />
        <FaReact size="1.6rem" />
        <SiChakraui size="1.6rem" />
      </Flex>
    </Box>
  )
}

export const TripVilla = () => {
  return (
    <Box w="350px" className='project-card'>
      <Box className="project-img">
        <Image src={cozytrip} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href="https://cozytrip.vercel.app/" target="_blank">Live</a></Button>
        <Button className='btn' ><a href="https://github.com/rahulke-dev/scenic-shock-7677" target="_blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color="black">TECH STACK</Text>
        <Flex pb="6px" wrap="wrap">
          <Badge colorScheme='green'>HTML</Badge>
          <Badge colorScheme='red'>CSS</Badge>
          <Badge colorScheme='purple'>JavaScript</Badge>
          <Badge>ReactJs</Badge>
          <Badge colorScheme='green'>nodeJs</Badge>
          <Badge colorScheme='blue'>expressJs</Badge>
          <Badge colorScheme='red'>mongoDB</Badge>
          <Badge colorScheme='purple'>redis</Badge>

        </Flex>
      </Grid>

      <Box className="project-desc">
        <Box mt="6px" className='project-desc-content' >
          <Text fontSize="15px" fontWeight="bold" >Cozytrip</Text>
          <Text fontSize="14px"  >Cozytrip is online Holiday Home Rental Companies from there you can book hotels , make your trip plan.</Text>

        </Box>

      </Box>
      <Flex m="10px 0 10px 0" wrap="wrap" gap="3px" >
        <AiFillHtml5 size="1.6rem" />
        <TbBrandCss3 size="1.6rem" />
        <TbBrandJavascript size="1.6rem" />
        <FaReact size="1.6rem" />
        <SiChakraui size="1.6rem" />
        <DiNodejs size="1.6rem" />
        <SiExpress size="1.6rem" />
        <DiMongodb size="1.6rem" />
      </Flex>
    </Box>
  )
}


export const Porfolio = () => {
  return (
    <Box w="350px" className='project-card'>
      <Box className="project-img">
        <Image src={portfolio} alt="" />
      </Box>
      <Box className="project-desc-btn">
        <Button className='btn' ><a href="https://fw190480.github.io/" target="_blank">Live</a></Button>
        <Button className='btn' ><a href="https://github.com/fw190480/fw190480.github.io" target="_blank">Github</a></Button>
      </Box>
      <Grid>
        <Text fontWeight="bold" m="1rem 7px 0 0 " fontSize="1rem" color="black">TECH STACK</Text>
        <Flex pb="6px" wrap="wrap">
          <Badge colorScheme='green'>HTML</Badge>
          <Badge colorScheme='red'>CSS</Badge>
          <Badge colorScheme='purple'>JavaScript</Badge>
          <Badge>ReactJs</Badge>


        </Flex>
      </Grid>

      <Box className="project-desc">
        <Box mt="6px" className='project-desc-content' >
          <Text fontSize="15px" fontWeight="bold" >Portfolio</Text>
          <Text fontSize="14px"  >Hear you can find my portfolio details which language i used and all the details and code.</Text>

        </Box>

      </Box>
      <Flex m="10px 0 10px 0" wrap="wrap" gap="3px" >
        <AiFillHtml5 size="1.6rem" />
        <TbBrandCss3 size="1.6rem" />
        <TbBrandJavascript size="1.6rem" />
        <FaReact size="1.6rem" />
        <SiChakraui size="1.6rem" />

      </Flex>
    </Box>
  )
}



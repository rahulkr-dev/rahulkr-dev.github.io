import React from 'react'
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
import { SiTypescript } from "react-icons/si"
import { AiFillGithub } from "react-icons/ai"
import { SiPostman } from "react-icons/si"
import "./skills.css"
import { Box, Heading, Progress, Text } from '@chakra-ui/react'
import GitHubCalendar from '../github_calendar/GithubCalendar'

const skillsArr = [AiFillHtml5, TbBrandCss3, TbBrandJavascript, FaReact, SiChakraui, DiNodejs, SiExpress, SiRedux, DiMongodb, SiRedis];

const containerArr = skillsArr.map(item => (
  <div className="skill_card">
    {<item />}
  </div>
))
const Skills = () => {
  return (
    <div id="skills">
      <Heading pl="1rem" >Technical Skills</Heading>
      <Heading pt="2rem" textAlign="center" pl="1rem" >FrontEnd</Heading>
      <div className="skill_container">
        <div className="skill-card">
          <AiFillHtml5 className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={60} />
          <Text color="white"  mt="4px">HTML5</Text>
        </div>
        <div className="skill-card">
          <TbBrandCss3 className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={60} />

          <Text color="white" mt="4px">CSS3</Text>
        </div>
        <div className="skill-card">
          <TbBrandJavascript className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={95} />

          <Text color="white" mt="4px">JAVASCRIPT</Text>
        </div>
        <div className="skill-card">
          <FaReact className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={80} />

          <Text color="white" mt="4px">REACTJS</Text>
        </div>
        <div className="skill-card">
          <SiChakraui className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={70} />

          <Text color="white" mt="4px">CHAKRAUI</Text>
        </div>
        <div className="skill-card">
          <SiRedux className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={80} />

          <Text color="white" mt="4px">REDUX</Text>
        </div>
        <div className="skill-card">
          <SiTypescript className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={50} />

          <Text color="white" mt="4px">TYPESCRIPT</Text>
        </div>
      </div>

      {/* backend technology */}
      <Heading mt="3rem" textAlign="center" pl="1rem" >BackEnd</Heading>
      <div className="skill_container">
        <div className="skill-card">
          <SiTypescript className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={50} />

          <Text color="white" mt="4px">TYPESCRIPT</Text>
        </div>
        <div className="skill-card">
          <DiNodejs className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={70} />

          <Text color="white" mt="4px">NODEJS</Text>
        </div>
        <div className="skill-card">
          <SiExpress className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={65} />

          <Text color="white" mt="4px">EXPRESSJS</Text>
        </div>
        <div className="skill-card">
          <DiMongodb className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={75} />

          <Text color="white" mt="4px">MONGODB</Text>
        </div>
        <div className="skill-card">
          <SiRedis className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={60} />

          <Text color="white" mt="4px">REDIS</Text>
        </div>

      </div>
      {/* tools i used  */}

      <Heading mt="3rem" textAlign="center" pl="1rem" >Tools</Heading>
      <div className="skill_container">
        <div className="skill-card">
          <SiPostman className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={80} />

          <Text color="white" mt="4px">POSTMAN</Text>
        </div>
        <div className="skill-card">
          <AiFillGithub className='skill-icon' />
          <Progress colorScheme='green' size='xs' value={80} />

          <Text color="white" mt="4px">GITHUB</Text>
        </div>
      </div>
    </div>
  )
}

export default Skills
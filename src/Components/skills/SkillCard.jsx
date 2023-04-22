import React from 'react'
import "./skills.css"
import { Progress, Text } from '@chakra-ui/react'


const SkillCard = ({ReactIcon,value,text}) => {
    return (
        <div className="skill-card skills-card">
            <ReactIcon className='skill-icon skills-card-img' />
            <Progress colorScheme='orange' size='xs' value={value} />
            <Text className='skills-card-name' color="white" mt="4px">{text}</Text>
        </div>
    )
}

export default SkillCard
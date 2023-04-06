import React from 'react'
import "./skills.css"
import { Progress, Text } from '@chakra-ui/react'


const SkillCard = ({ReactIcon,value,text}) => {
    return (
        <div className="skill-card">
            <ReactIcon className='skill-icon' />
            <Progress colorScheme='orange' size='xs' value={value} />
            <Text color="white" mt="4px">{text}</Text>
        </div>
    )
}

export default SkillCard
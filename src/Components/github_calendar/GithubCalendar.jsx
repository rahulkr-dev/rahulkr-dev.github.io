import React,{useState,useEffect} from "react";
import { Box, Heading,Flex } from "@chakra-ui/react";
import GitHubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";
import { style } from "../../utils/styles";
const Calender = () => {
  const [smallerScreen,setSmallerScreen] = useState(false)

useEffect(()=>{
  window.addEventListener('resize',()=>{
    // console.log(window.innerWidth)
    if(window.innerWidth<1000) setSmallerScreen(true);
    else setSmallerScreen(false)
  })
},[])
console.log(smallerScreen)
  const selectLastHalfYear = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 10;

    return contributions.filter((day) => {
      const date = new Date(day.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  return (
    <Box 
    
    // clipPath={"polygon(0 0, 100% 0, 100% 68%, 0 68%)"}
    
    w="max-content" m="auto" color={"white"} maxW="100vw" overflow={"scroll"} 
    // border={"2px solid orange"} 
    p={{base:"10px",lg:"1rem 2rem 3rem 3rem"}}
    boxShadow={{md:style.boxShadowLeft}}
    >
      <Heading mb="3rem" textAlign="center" color={style.orange_color} >GITHUB CONTRIBUTION CALENDER</Heading>
      <Flex justifyContent="center" fontSize={[".5rem",".8rem","1rem","1rem"]} >
      <GitHubCalendar
        username="rahulkr-dev"
        blockSize={18}
        fontSize={18}
        className="githubCal"
        transformData={smallerScreen?selectLastHalfYear:""}
        
      >
        <ReactTooltip delayShow={18} html />
      </GitHubCalendar >
      </Flex>

    </Box>



  );
};

export default Calender;
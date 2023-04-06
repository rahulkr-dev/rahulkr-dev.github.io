import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";
import { style } from "../../utils/styles";
const Calender = () => {
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
    p={{lg:"1rem 2rem 3rem 2rem"}}
    boxShadow={style.boxShadowLeft}
    >
      <Heading mb="2rem" textAlign="center" color="white" >GITHUB CONTRIBUTION CALENDER</Heading>
      <GitHubCalendar
        username="rahulkr-dev"
        blockSize={18}
        fontSize={18}
        className="githubCal"
        // transformData={selectLastHalfYear}
        
      >
        <ReactTooltip delayShow={18} html />
      </GitHubCalendar >

    </Box>



  );
};

export default Calender;
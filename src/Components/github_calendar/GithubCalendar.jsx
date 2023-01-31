import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";
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
    <Box w="max-content" m="auto" color={"white"} maxW="100vw" overflow={"scroll"}>
      <Heading mb="2rem" textAlign="center" color="white" >Days I Code</Heading>
      <GitHubCalendar
        username="rahulkr-dev"
        blockSize={18}
        fontSize={18}
        // transformData={selectLastHalfYear}
        
      >
        <ReactTooltip delayShow={18} html />
      </GitHubCalendar >

    </Box>



  );
};

export default Calender;
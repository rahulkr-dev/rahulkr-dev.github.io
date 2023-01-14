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
    <Box border={"1px solid black"} boxSizing="border-box" maxW={"100vw"} bg="#4DB5FF" p="1rem">
      <Heading mb="2rem" textAlign="center" color="white" >Days I Code</Heading>
      <GitHubCalendar
        // style={{width:"100%", margin: "auto" ,marginBottom:"5%" }}
        username="rahulkr-dev"
        transformData={selectLastHalfYear}
        blockSize={20}
        fontSize={16}
      >
         <ReactTooltip delayShow={18} html /> 
      </GitHubCalendar>
    </Box>
  );
};

export default Calender;
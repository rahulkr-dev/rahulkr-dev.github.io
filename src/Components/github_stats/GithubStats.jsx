import { Box, Heading,Grid } from "@chakra-ui/react";
import React from "react";
// import "../App.css";
const GithubStats = () => {
  return (
    // streak 
    <Grid m="auto" pt="1rem" placeItems="center" templateColumns={{lg:'repeat(3, 1fr)'}} gap={6} mb="6rem" w={{lg:"80%"}}>
      
      <Box
     h={{lg:"full"}}
      >
        <a href="https://github.com/rahulkr-dev">
          <img
            align="left"
            src="https://github-readme-streak-stats.herokuapp.com/?user=rahulkr-dev"
          />
        </a>
      </Box>
 
      <Box
      >
        <a href="https://github.com/rahulkr-dev">  
          <img
            align="center"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=rahulkr-dev"  //launguages
          />
        </a>
     
      </Box>
      <Box
      h={{lg:"full"}}>
      <a href="https://github.com/rahulkr-dev">
          <img
            align="left"
            src="https://github-readme-stats.vercel.app/api?username=rahulkr-dev&count_private=true&show_icons=true" //stats
          />
        </a>
      </Box>
  
    </Grid>
  );
};

export default GithubStats;
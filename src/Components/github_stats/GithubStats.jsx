import { Box, Heading, Grid, Image } from "@chakra-ui/react";
import React from "react";
// import "../App.css";
const GithubStats = () => {
  return (
    // streak 
    <Grid m="auto" pt="1rem" justifyContent={"center"} alignItems={"flex-start"} templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(3, 1fr)']} gap={6} mb="6rem" w={{ lg: "80%" }}>

      <Box
        h={{ lg: "full" }}
      >
        <a href="https://github.com/rahulkr-dev" target="_blank">
          {/* <img
            align="left"
            src="https://github-readme-streak-stats.herokuapp.com/?user=rahulkr-dev"
          /> */}
          <Image src="https://github-readme-stats.vercel.app/api/top-langs?username=rahulkr-dev&show_icons=truecount_private=true&locale=en&layout=compact" alt="rahulkr-dev" />

        </a>
      </Box>

      <Box
      objectFit={"cover"}
      >
        <a href="https://github.com/rahulkr-dev" target="_blank">
          {/* <img
            align="center"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=rahulkr-dev" 
          /> */}
          <Image  src="https://github-readme-streak-stats.herokuapp.com/?user=rahulkr-dev&" alt="rahulkr-dev" />

        </a>

      </Box>
      <Box
        h={{ lg: "full" }}>
        <a href="https://github.com/rahulkr-dev" target="_blank">
          {/* <img
            align="left"
            src="https://github-readme-stats.vercel.app/api?username=rahulkr-dev&count_private=true&show_icons=true" //stats
          /> */}
          <Image src="https://github-readme-stats.vercel.app/api?username=rahulkr-dev&show_icons=true&count_private=true&hide_border=true"  />

        </a>
      </Box>

    </Grid>
  );
};





export default GithubStats;
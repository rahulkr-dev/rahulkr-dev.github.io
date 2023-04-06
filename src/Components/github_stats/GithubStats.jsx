import { Box, Heading, Grid, Image } from "@chakra-ui/react";
import React from "react";
import { style } from "../../utils/styles";
// import "../App.css";
const GithubStats = () => {
  return (
    // streak 
    <Grid m="auto" mt="4rem" pt="1rem" justifyContent={"center"} alignItems={"flex-start"}
      // templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)']} 
      gap={"5rem"} mb="6rem"
      w={{ lg: "80%" }}>
      <Heading color={style.heading_1}>My Github Stats</Heading>

      <Box
        border={"3px solid orange"}
        p={"1rem"}
        boxShadow={style.boxShadowDiffCol}
        transition={"all 1s ease-in-out"}
        _hover={{transform:"scale(1.2)"}}
      >
        <a href="https://github.com/rahulkr-dev" target="_blank">
          <Image src="https://github-readme-stats.vercel.app/api/top-langs?username=rahulkr-dev&show_icons=truecount_private=true&locale=en&layout=compact" alt="rahulkr-dev" />

        </a>
      </Box>

      <Box
           border={"3px solid orange"}
           p={"1rem"}
           boxShadow={style.boxShadowDiffCol}
           transition={"all 1s ease-in-out"}
           _hover={{transform:"scale(1.2)"}}
      >
        <a href="https://github.com/rahulkr-dev" target="_blank">
          <Image src="https://github-readme-streak-stats.herokuapp.com/?user=rahulkr-dev&" alt="rahulkr-dev" />
        </a>

      </Box>
      <Box
      border={"3px solid orange"}
      p={"1rem"}
      boxShadow={style.boxShadowDiffCol}
      transition={"all 1s ease-in-out"}
      _hover={{transform:"scale(1.2)"}}
      >
        <a href="https://github.com/rahulkr-dev" target="_blank">
          <Image src="https://github-readme-stats.vercel.app/api?username=rahulkr-dev&show_icons=true&count_private=true&hide_border=true" />
        </a>
      </Box>

    </Grid>
  );
};





export default GithubStats;
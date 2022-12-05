import { Box, Heading } from "@chakra-ui/react";
import React from "react";
// import "../App.css";
const GithubStats = () => {
  return (
    // streak 
    <Box mb="6rem">
      
      <div style={{ 
        width: "60%", 
        margin: "auto",

         }}>
        <a href="https://github.com/fw190480">
          <img
            align="left"
            src="https://github-readme-streak-stats.herokuapp.com/?user=fw190480"
          />
        </a>
      </div>
 
      <div
        style={{
          width: "60%",
          height: "200px",
          display: "flex",
          margin: "auto",
          // border:"1px solid green"
        }}
      >
        <a href="https://github.com/fw190480">  
          <img
            align="center"
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=fw190480"  //launguages
          />
        </a>
        <a href="https://github.com/fw190480">
          <img
            align="left"
            src="https://github-readme-stats.vercel.app/api?username=fw190480&count_private=true&show_icons=true" //stats
          />
        </a>
      </div>
    </Box>
  );
};

export default GithubStats;
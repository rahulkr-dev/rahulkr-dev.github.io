import React from 'react'
import Header from './Components/header/Header'
import Nav from "./Components/nav/Nav"
import About from "./Components/about/About"

import Contact from "./Components/Contact/Contact"
import Footer from "./Components/footer/Footer"
import Skills from "./Components/skills/Skills"
import Project from "./Components/project/project"
import Desktop from './Components/desktop/NavbarForD'
import GitHubCalendar from './Components/github_calendar/GithubCalendar'
import GithubStats from './Components/github_stats/GithubStats'
import { Box } from '@chakra-ui/react'
const App = () => {
  return (
    <Box bg="gray.800">

      <Desktop />
      <Header />
      <Nav />
      <Skills />
      <GitHubCalendar/>
      <GithubStats/>
      <Project />
      <Contact />
      <Footer />


    </Box>
  )
}

export default App
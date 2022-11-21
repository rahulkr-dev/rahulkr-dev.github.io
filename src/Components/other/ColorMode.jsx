import {Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import {BsFillMoonFill} from "react-icons/bs"
import {GiSun} from "react-icons/gi"

function Theme() {
    const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('red.500', 'red.200')
  const color = useColorModeValue('white', 'gray.800')

  return (
    <>
      {/* <Box mb={4} bg={bg} color={color}>
        This box's style will change based on the color mode.
      </Box> */}
      <Button size='sm' onClick={toggleColorMode}>
      {colorMode === 'light' ? <BsFillMoonFill size="1rem"/> : <GiSun size="1.3rem" />}
      </Button>
    </>
  )
  }
  export default Theme;
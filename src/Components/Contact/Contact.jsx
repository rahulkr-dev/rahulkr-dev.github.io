import React from 'react'
// import "./contact.css"
import { MdOutlineMail } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { Text, Heading, Box, Textarea, FormControl, Input, Button, Grid, Flex } from '@chakra-ui/react'
const Contact = () => {
  return (
    <Box id='contact' m="auto">
      <Text textAlign={"center"} >Get in Touch</Text>
      <Heading color={"rgba(255,255,255,0.6)"} fontSize="1.7rem" mb="1rem" textAlign="center">Contact Me</Heading>
      <Grid justifyContent={"center"} templateColumns={["80%", "70%", "25% 50%", "25% 50%"]} gap="1rem" >
        {/* contact details */}
        <Grid gap={"1rem"} justifyContent="center" >
          <Box w="14rem" p="1rem" className='btn-primary' color="white" borderRadius={"md"}>
            <MdOutlineMail />
            <Text>Email</Text>
            <Text>rkrahul8181@gmail.com</Text>
            <a href="mailto:rkrahul8181@gmail.com" target="_blank">Send a message</a>
          </Box>
          <Box borderRadius={"md"} w="14rem" p="1rem" className='btn-primary' color="white" >
            <AiOutlineWhatsApp />
            <Text>WhatsApp</Text>
            <Text>+91 8745983389</Text>
            <a href="https://api.whatsapp.com/send?phone=+918745983389" target="_blank">Send a message</a>
          </Box>
          {/* END of  contact options */}
          {/* contact form */}
        </Grid>
        <Box pl={{md:"2rem"}}>
          <FormControl id="inputName" color="white" action="" display={"grid"} gap="1rem">

            <Input type="text" name='name' placeholderColor="white" placeholder='Your Full Name' required />
            <Input type="email" name='email' placeholder='Your Email' placeholderColor="white" required />
            <Textarea className='textarea' name="message" rows="7" placeholder='Your Message' required></Textarea>
            <Box className='btn btn-primary'>Send Message</Box>
          </FormControl>
        </Box>
      </Grid>
    </Box>
  )
}

export default Contact
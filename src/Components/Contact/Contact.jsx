import React, { useRef,useState } from 'react'
import emailjs from '@emailjs/browser';
import { MdOutlineMail } from "react-icons/md"
import { RiMessengerLine } from "react-icons/ri"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { Text, Heading, Box, Textarea, FormControl, Input, Button, Grid, Flex, useToast } from '@chakra-ui/react';
const init = {
  from_name:"",
  from_email:"",
  message:""
}
const Contact = () => {
  const [formData,setFormData] = useState(init)
  const formRef = useRef();
  const toast = useToast();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData({...formData,[name]:value})
  }

  const sendEmail = (e) => {
    e.preventDefault();
    // console.log("hi")

    emailjs.sendForm('service_afwm5ss', 'template_ekzj1w1', formRef.current, 'Zc4J_SIVikxYuJJFt')
      .then((result) => {
        console.log(result.text);
        setFormData(init)
        toast({
          title: `Email Sent`,
          status: "success",
          isClosable: true,
          position: "top-right"
        })
      }, (error) => {
        toast({
          title: `Please Try Again`,
          status: "error",
          isClosable: true,
          position: "top-left"
        })
        console.log(error.text);
      });
  };
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
        <Box pl={{ md: "2rem" }}>
          <form ref={formRef} onSubmit={sendEmail}>
            <FormControl id="inputName" color="white" display={"grid"} gap="1rem"  alignItems="center">

              <Input type="text" name='from_name' value={formData.from_name} onChange={handleChange} placeholder='Your Full Name' required />
              <Input type="email" name='from_email' value={formData.from_email} onChange={handleChange} placeholder='Your Email' required />
              <Textarea className='textarea' name="message" value={formData.message} onChange={handleChange} rows="7" placeholder='Your Message' required></Textarea>
              <Button colorScheme={"telegram"} cursor={"pointer"} type={"submit"} className='btn btn-primary'>Send Email</Button>
            </FormControl>
          </form>

        </Box>
      </Grid>
    </Box>
  )
}

export default Contact
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';

import { AiOutlineWhatsApp } from "react-icons/ai"
import { Text, Heading, Box, Textarea, FormControl, Input, Button, Grid, Flex, useToast, FormLabel, Center } from '@chakra-ui/react';
import { style } from './../../utils/styles';
const init = {
  from_name: "",
  from_email: "",
  message: ""
}
const Contact = () => {
  const [formData, setFormData] = useState(init)
  const formRef = useRef();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
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
    <Box pt="10rem" bg={style.app_bg_gradient} boxShadow={style.box_shadow_blur_form}>
        <Box boxShadow={{lg:style.boxShadowDiffCol}} id='contact' m="auto" pb="4rem"

        w={{lg:"60vw"}}
      >
        <Heading color={style.orange_color}
          fontSize="1.7rem" mt="3rem"
          textAlign="center"
          textTransform={"uppercase"} pt="2rem">Contact Me</Heading>
        <Text color={style.heading_1} textAlign={"center"} >Get in Touch</Text>
        <Flex justifyContent={"center"} wrap="wrap" gap={["1rem", "2rem", "3rem", "4rem"]}>
          {/* contact details */}

          <Box pl={{ md: "2rem" }}>
            <form ref={formRef} onSubmit={sendEmail}>
              <Box
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                transition={"all 1s ease"}
                _hover={{
                  boxShadow: style.boxShadowBottom
                }}
                bg="#fff"

                w={["80vw", "60vw", "50vw", "25vw"]} maxW="lg" mx="auto" mt={8} p={"1rem"} borderWidth={1} borderRadius="md"
                fontSize={".8rem"}
              >
                <FormControl isRequired>
                  <FormLabel fontSize={".8rem"} >Name:</FormLabel>
                  <Input
                    fontSize={".8rem"}
                    size={"sm"}
                    type="text"
                    borderWidth={"2px"}
                    variant={"filled"}
                    focusBorderColor='lime'
                    placeholder="Enter your name"
                    name='from_name'
                    value={formData.from_name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={".8rem"} >Email:</FormLabel>
                  <Input
                    fontSize={".8rem"}
                    size={"sm"}
                    type="text"
                    borderWidth={"2px"}
                    variant={"filled"}
                    focusBorderColor='lime'
                    placeholder="Enter your email"
                    name='from_email'
                    value={formData.from_email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize={".8rem"} >Message:</FormLabel>
                  <Textarea
                  focusBorderColor='orange'
                    className='textarea'
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="7"
                    placeholder='Your Message'>

                  </Textarea>

                </FormControl>
                <Button mt="1rem" w="full" colorScheme={"telegram"} cursor={"pointer"} type={"submit"} className='btn btn-primary'>Send Email</Button>

              </Box>
            </form>

          </Box>
          {/* ----------------------- */}
          <Flex justifyContent={"center"} alignItems={"center"} >

            <Flex flexDir={"column"} justifyContent={"center"} borderRadius={"md"} w={["max-content", "max-content", "14rem", "14rem"]} h="max-content" p="3rem" className='contact-btn' >
              <AiOutlineWhatsApp size={"3rem"} />
              <Text p={"10px 0"} textTransform={"uppercase"} color="orange">WhatsApp</Text>
              <Text>+91 8745983389</Text>
              <a href="https://api.whatsapp.com/send?phone=+918745983389" target="_blank">Send a message</a>
            </Flex>
          </Flex>
          {/* --------------------------- */}
        </Flex>
      </Box>
    
    </Box>
  )
}

export default Contact
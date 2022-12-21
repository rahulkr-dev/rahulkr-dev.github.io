import React from 'react'
import "./contact.css"
import {MdOutlineMail} from "react-icons/md"
import {RiMessengerLine} from "react-icons/ri"
import {AiOutlineWhatsApp} from "react-icons/ai"
import { Text } from '@chakra-ui/react'
const Contact = () => {
  return (
    <section id='contact'>
      <h5>Get in Touch</h5>
      <Text fontSize="1.7rem" mb="1rem" textAlign="center" color="yellow">Contact Me</Text>
      <div className="container contact_container">
        <div className="contact_options">
          <article className="contact_option">
            <MdOutlineMail className='contact_option-icon'/>
            <h4>Email</h4>
            <h5>rkrahul8181@gmail.com</h5>
            <a href="mailto:rkrahul8181@gmail.com" target="_blank">Send a message</a>
          </article>
          <article className="contact_option">
            <AiOutlineWhatsApp className='contact_option-icon'/>
            <h4>WhatsApp</h4>
            <h5>+91 8745983389</h5>
            <a href="https://api.whatsapp.com/send?phone=+918745983389" target="_blank">Send a message</a>
          </article>
          {/* END of  contact options */}
        </div>
          <form action="">
            <input className='input' type="text" name='name' placeholder='Your Full Name' required />
            <input className='input' type="email" name='email' placeholder='Your Email'  required />
            <textarea className='textarea' name="message" rows="7" placeholder='Your Message' required></textarea>
            <button type='submit' className='btn btn-primary send-button'>Send Message</button>
          </form>
      </div>
    </section>
  )
}

export default Contact
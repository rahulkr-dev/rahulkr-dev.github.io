import React from 'react'
import CV from "../../assects/cv.pdf"
import {FiDownload} from "react-icons/fi"

export default function CVA() {
  return (
    <div className="cta">
        <a  className='btn' href="https://drive.google.com/file/d/1Flsb1Bkkpvqjc5gozAlxrSqSbUzoxAml/view?usp=sharing"  target="_blank" >Resume</a>
        <a  className='btn btn-primary' href={CV} download>
          <FiDownload size="1.5rem" />
        </a>
    </div>
  )
}

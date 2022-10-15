import React from 'react'
import CV from "../../assects/cv.pdf"

export default function CVA() {
  return (
    <div className="cta">
        <a className='btn' href={CV} download>Download CV</a>
        <a className='btn btn-primary' href="#contact">Let's talk</a>
    </div>
  )
}

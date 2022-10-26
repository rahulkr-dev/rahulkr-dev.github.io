import React from 'react'
import "./project.css";
import { Booking, Booking2, LifeStyleStore, LifeStyleStore2 } from './ProjectList';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import 'swiper/css/scrollbar';
const Project = () => {
  return (
    <div id="project">
      <h1>Projects</h1>
      <div className="project-container">
        <Swiper
          // install Swiper modules
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        >
      
            <SwiperSlide>
              <LifeStyleStore />
            </SwiperSlide>

            <SwiperSlide>
              <LifeStyleStore2 />
            </SwiperSlide>

            <SwiperSlide>
              <Booking />
            </SwiperSlide>

            <SwiperSlide>
              <Booking2 />
            </SwiperSlide>
     
        </Swiper>
      </div>

    </div>
  )
}

export default Project
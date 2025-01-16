import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode, Pagination} from 'swiper'
import CourseCard from './CourseCard';

const CourseSlider = ({Courses}) => {
return (
  <div className='flex flex-row gap-6'>
    {
      Courses?.length ? (
        <Swiper loop spaceBetween={25} 
        slidesPerView={4}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }} 
        className='w-full'>
          {
            Courses?.map((ele, idx) => (
              <SwiperSlide key={idx}>
                <CourseCard course={ele} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      ) : (
        <div>
          No Courses Found
        </div>
      )
    }
  </div>
)
}

export default CourseSlider
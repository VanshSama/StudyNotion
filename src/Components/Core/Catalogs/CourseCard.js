import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../Utils/avgRating';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const CourseCard = ({course}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    // console.log("Course:-- -> ", course);
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  })

  
  return (
    <div className='flex flex-row gap-5 mb-5'>
      <Link to={`/courses/${course?._id}`}>
        <div className='flex flex-col gap-5'>
          <img 
          src={course?.thumbnail}
          className='w-[200px] h-[120px] lg:w-[384px] lg:h-[201px] object-cover '
          />
          <div className='flex flex-col gap-[9px] '>
            <div className='flex flex-col'>
              <p className='font-inter text-base font-medium text-richblack-5'>
                {course?.courseName.slice(0, 20)}
                <span className='text-richblack-600'>
                  ...more
                </span>
              </p>

              <p className='font-inter text-base text-richblack-300'>
              {course?.instructor?.firstName} {" "} {course?.instructor?.lastName}
              </p>
            </div>

            {/* Rating :---  */}
            <div className='flex flex-row items-center gap-x-1'>
              <span className='text-yellow-50'>{avgReviewCount}</span>
              <ReactStars 
              count={5}
              value={avgReviewCount}
              edit={false}
              />
            </div>

            <p className='text-richblack-5 font-inter text-lg'>
              Rs. {" "} {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard

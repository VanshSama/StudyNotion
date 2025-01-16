import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import {FreeMode, Pagination, Autoplay} from 'swiper'
import ReactStars from 'react-stars';
import { getAllRating } from '../../Services/operations/ratingAndReviewsAPI';
import { FaStar } from 'react-icons/fa';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const response = await getAllRating();

            console.log("Response :- ", response);
            if(response){
                setReviews(response);
            }
        }
        fetchAllReviews();
    }, [])

  return (
    <div className='hidden lg:flex text-richblack-25 w-full lg:mb-10'>
        {
            reviews?.length > 0 ? (
                <Swiper
                slidesPerView={4}
                loop
                freeMode={true}
                autoplay={{
                    delay: 2500,
                }}
                spaceBetween={25}
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide key={index} className='flex flex-col w-full flex-wrap p-4 gap-4 bg-richblack-800'>
                                <div className='flex flex-row items-center gap-x-3 flex-wrap'>
                                    <img src={review?.user?.image} className='h-9 w-9 object-cover rounded-full'/>

                                    <div className='flex flex-col flex-wrap'>
                                        <p className='text-sm  font-semibold text-richblack-5 font-inter'>
                                            {review?.user?.firstName} {" "} {review?.user?.lastName}
                                        </p>

                                        <p className='text-xs font-inter font-medium text-richblack-600'>
                                            {review?.user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center lg:mb-10'>
                                    <div className='text-xs font-inter font-medium text-richblack-25'>
                                    {review?.review}
                                    </div>

                                    <div className='flex flex-row gap-x-2 items-center'>
                                        <div className='text-sm font-semibold font-inter text-yellow-100'>
                                            {review?.rating}
                                        </div>
                                        
                                        <ReactStars 
                                        count={5}
                                        value={review?.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#E7C009"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <div className='text-richblack-25'>
                    No reviews are given yet
                </div>
            )
        }
    </div>
  )
}

export default ReviewSlider

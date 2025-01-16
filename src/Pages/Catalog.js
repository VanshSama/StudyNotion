import React, { useEffect, useState } from 'react'
import Footer from '../Components/Common/Footer'
import CourseSlider from '../Components/Core/Catalogs/CourseSlider'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../Services/apiConnector'
import { categories } from '../Services/apis'
import { getCatalogPageData } from '../Services/operations/pageAndComponentData'
import CourseCard from '../Components/Core/Catalogs/CourseCard'

const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Most Popular");

    // Fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Categories response :- ", res);

            const category_id = res?.data?.allCategories?.filter((ct) => ct.name.replaceAll(" ", "-").toLowerCase() === catalogName)[0]._id;
            // console.log("Category Id :- ", category_id);
            setCategoryId(category_id);
        }
        getCategories();

    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData({categoryId});
                setCatalogPageData(res);
                // console.log("Printing result :- ", res?.differentCategories[0]?.course);
            }
            catch(error){
                console.log(error);
            }
        }

        if(categoryId){
            getCategoryDetails();
            // console.log("Catalog Page data :-=> ", catalogPageData);
        }
    }, [categoryId]);

  return (
    <div className='flex flex-col w-full h-full items-center'>
        <div className='w-full h-full py-8 px-5 lg:px-[120px] flex flex-row gap-x-[24px] bg-richblack-800 '>
            <div className='flex flex-col gap-4'>
                <p className='flex flex-row items-center text-sm gap-x-1 font-inter text-richblack-300'>
                    {'Home / Catalog / '}
                    <span className='text-yellow-50'>
                        {catalogPageData?.selectedCategory?.name}
                    </span>
                </p>
                <p className='font-medium text-3xl text-richblack-5 font-inter'>
                {catalogPageData?.selectedCategory?.name}
                </p>
                <p className='font-inter text-sm text-richblack-200  '>
                {catalogPageData?.selectedCategory?.description}
                </p>
            </div>
        </div>

        <div className='w-10/12 flex flex-col gap-4 mt-10'>
            {/* Section 1 */}
            <div className='w-full flex flex-col gap-11'>
                <div className='w-full flex flex-col gap-2'>
                    <div className='font-inter font-semibold text-2xl text-richblack-5 '>
                        Courses to get you started
                    </div>

                    <div className={`flex gap-3 py-1 text-richblack-600 `}>
                        <p className={`cursor-pointer ${selectedCategory === "Most Popular" ? "text-yellow-50 border-b-[1px] border-yellow-50" : ""}`}
                        onClick={() => setSelectedCategory("Most Popular")}>
                            Most Popular
                        </p>
                        <p className={`cursor-pointer ${selectedCategory === "New" ? "text-yellow-50 border-b-[1px] border-yellow-50" : ""}`}
                        onClick={() => setSelectedCategory("New")}>
                            New
                        </p>
                    </div>
                </div>

                <div className='w-full'>
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.course}/>
                </div>
            </div>

            {/* Section 2 */}
            <div className='w-full flex flex-col gap-2'>
                <p className='font-inter font-semibold text-2xl text-richblack-5 '>
                    Top Courses in {catalogPageData?.differentCategories[0]?.course[0]?.courseName}
                </p>

                <div className='w-full'>
                    <CourseSlider Courses = {catalogPageData?.differentCategories[0]?.course}/>
                </div>
            </div>

            {/* Section 3 */}
            <div>
                <p>Frequently Bought</p>
                <div className='py-8 '>
                    {/* <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                            catalogPageData?.mostSellingCourses?.slice(0, 4)?.map((course, index) => {
                                <CourseCard course={course} key={index}  />
                            })
                        }
                    </div> */}
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Catalog

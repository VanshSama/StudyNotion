import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { apiConnector } from '../../../Services/apiConnector';
import { categories } from '../../../Services/apis';
import { Link } from 'react-router-dom';

const AllCourses = ({setCatalogOpen, setOpen}) => {
    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing sublinks result :- ", result);

            setSubLinks(result.data.allCategories);
        }
        catch(error){
            console.log("Error whether catalog list fetching", error)
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, []);

  return (
    <div className='w-full fixed scroll-m-0 inset-0 z-[1000] flex flex-col overflow-auto gap-5 !mt-0 h-full bg-richblack-5 text-richblack-900 p-2 '>
        <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center gap-1' onClick={() => setCatalogOpen(false)}>
                <MdOutlineKeyboardArrowLeft />
                <p>
                    AllCourses
                </p>
            </div>
            
            <RxCross2 onClick={() => setOpen(false)}/>
        </div>
        <div>
            {
                subLinks.length ? (
                    subLinks
                    // ?.filter(
                    //     (subLink) => subLink?.courses?.length > 0
                    // )
                    ?.map((ele, index) => {
                        return <Link to={`/catalog/${ele.name.replaceAll(" ","-").toLowerCase()}`} key={index}onClick={() => {
                            setCatalogOpen(false);
                            setOpen(false);
                        }}>
                            <p className={`p-3 text-richblack-900 hover:bg-richblack-50 hover:rounded-md font-medium `}>
                                {ele.name}
                            </p>
                        </Link>
                    })
                ) : (
                    <div>No Category</div>
                )
            }
        </div>
    </div>
  )
}

export default AllCourses

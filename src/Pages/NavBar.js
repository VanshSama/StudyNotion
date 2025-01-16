import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import logo from "../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import ProfileDropDown from '../Components/Core/Auth/ProfileDropDown'
import { apiConnector } from '../Services/apiConnector'
import { categories } from '../Services/apis'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineBars3 } from 'react-icons/hi2'
import ChangeOnOutsideTouch from '../Components/Core/Auth/ChangeOnOutsideTouch'
import NavBarSideComponent from '../Components/Common/MediaQueriesComponenets/NavBarSideComponent'
import logo2 from "../assets/Logo/Logo-Small-Light.png"

const NavBar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    ChangeOnOutsideTouch(ref, () => setOpen(false));

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

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='w-full py-1 lg:py-0 h-max md:h-14 flex items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-800 '>
        <div className='w-full lg:w-11/12 px-1 lg:px-0 flex max-w-maxContent items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
                <div ref={ref} className='z-10 visible cursor-pointer md:hidden text-richblack-25'>
                    <div onClick={() => setOpen(true)}>
                        <HiOutlineBars3 width={75} height={75}/>
                    </div>

                    {
                        open && (
                            <div onClick={(e) => e.stopPropagation()}
                            >
                                <NavBarSideComponent setOpen={setOpen}/>
                            </div>
                        )
                    }
                </div>
                
                <Link to={"/"} className='hidden md:flex'>
                    <img src={logo} width={160} height={32} loading='lazy'/>
                </Link>

                <Link to={"/"} className='visible md:hidden'>
                    <img src={logo2} loading='lazy' className='w-[30px] h-[30px] '/>
                </Link>
            </div>
            

                {/* NavLinks dashboard */}
            <div className='hidden md:flex flex-row items-center gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((links, index) => {
                        return <div key={index}>
                            {
                                links.title === "Catalog" ? (
                                    <div className={`relative group flex flex-row items-center gap-1 cursor-pointer
                                    ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                        <p>{links.title}</p>
                                        <IoIosArrowDown />

                                        <div className='lg:w-[300px] z-10 invisible absolute left-[45%] top-[130%] -translate-x-[50%] flex flex-col rounded-md bg-richblack-5 py-4 px-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                                                {/* Diamond Shaped */}
                                            <div className='-z-10 absolute w-6 h-6 rounded-sm -rotate-45 bg-richblack-5 -top-[7%] translate-y-1 left-[58%] '></div>

                                            {
                                                subLinks.length ? (
                                                    subLinks
                                                    // ?.filter(
                                                    //     (subLink) => subLink?.courses?.length > 0
                                                    // )
                                                    ?.map((ele, index) => {
                                                        return <Link to={`/catalog/${ele.name.replaceAll(" ","-").toLowerCase()}`} key={index}>
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
                                ) : (
                                    <Link to={links?.path}>
                                        <div className={`${matchRoute(links?.path) ? "text-yellow-50" : ""}`}>
                                            {links.title}
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    })
                }
            </div>

                {/* Login Signup dashboard */}
            <div className='flex gap-x-4 items-center text-richblack-800'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative lg:z-10 text-richblack-25'>
                            <FaShoppingCart width={75} />
                            {
                                totalItems > 0 && (
                                    <span className='absolute -z-10 -top-4 -right-3 px-2 aspect-square rounded-full bg-richblack-50 text-yellow-700'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <div className='flex gap-x-4 items-center text-richblack-800'>
                            <Link to={"/login"}>
                                <button className='text-richblack-25 bg-richblack-800 border-[1px] border-richblack-600 px-3 py-2 rounded-lg flex items-center justify-center '>
                                    Log in
                                </button>
                            </Link>

                            <Link to={"/signup"} >
                                <button className='text-richblack-25 bg-richblack-800 border-[1px] border-richblack-600 px-3 py-2 rounded-lg flex items-center justify-center '>
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )
                }

                {
                    token !== null && (
                        <ProfileDropDown />
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default NavBar

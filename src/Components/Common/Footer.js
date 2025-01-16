import React from 'react'
import SLogo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import { CiFacebook } from 'react-icons/ci'

export default function Footer() {
  return (
    <div className='text-white w-11/12 border-richblack-600 mx-auto flex flex-col border-t-[1px] py-[52px] px-[120px] gap-8 mt-4 lg:mt-0 '>
        {/* Upper */}
      <div className='flex flex-col lg:flex-row items-center lg:items-stretch justify-between lg:gap-[52px] '>
          {/* Left */}
        <div className='flex flex-row gap-20'>
            {/* Study Notion */}
          <div className='text-white flex flex-col gap-3 items-start'>
            <div>
              <img src={SLogo} alt='logo' width={160} height={32}/>
            </div>

            <div className='flex flex-col text-inter font-semibold text-base text-richblack-100'>Company</div>

            <div className='flex flex-col gap-2'>
              <Link to={"/about"} className='text-sm font-inter text-richblack-400'>
                About
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Careers
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Affiliates
              </Link>
            </div>

            <div className='flex flex-row gap-3'>
              <CiFacebook className='w-6 h-6'/>
              <FaGoogle className='w-6 h-6'/>
              <FaTwitter className='w-6 h-6'/>
              <FaYoutube className='w-6 h-6'/>
            </div>
          </div>

            {/* Resources */}
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col text-richblack-100 gap-6 font-inter font-semibold text-base'>
                Resources
              </div>

              <div className='flex flex-col gap-2'>
                <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                  Articles
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Blog
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Chart Sheet
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Code challenges
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Docs
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Projects
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Videos
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Workspaces
                </Link>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
                Support
              </div>

              <div className='gap-2'>
                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Help Center
                </Link>
              </div>
            </div>
          </div>

            {/* Plans */}
          <div className='hidden lg:flex flex-col gap-9'>
            <div className='flex flex-col gap-3'>
              <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
                Plans
              </div>

              <div className='flex flex-col gap-2'>
                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Paid memberships
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  For students
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Business solutions
                </Link>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
                Community
              </div>

              <div className='flex flex-col gap-2'>
                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Forums
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Chapters
                </Link>

                <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                  Events
                </Link>
              </div>
            </div>
          </div>
        </div>

          {/* Line */}
        <div className='hidden lg:flex border-[1px] border-richblack-700'></div>

          {/* Right */}
        <div className='hidden lg:flex flex-row lg:gap-16 -translate-x-10'>
            {/* Subjects */}
          <div className='flex flex-col gap-3'>
            <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
              Subjects
            </div>

            <div className='flex flex-col gap-2'>
              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                AI
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Cloud Computing
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Code Foundations
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Computer Science
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Cybersecurity
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Data Analytics
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Data Science
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Data Visualization
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Developer Tools
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                DevOps
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Game Development
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                IT
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Machine Learning
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Math
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Mobile Development
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Web Design
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'> 
                Web Development
              </Link>
            </div>
          </div>

            {/* Languages */}
          <div className='flex flex-col gap-3'>
            <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
              Languages
            </div>

            <div className='flex flex-col gap-2'>
              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Bash
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                C
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                C++
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                C#
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Go
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                HTML & CSS
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Java
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                JavaScript
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Kotlin
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                PHP
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Python
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                R
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Ruby
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                SQL
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Swift
              </Link>
            </div>
          </div>

            {/* Career Building */}
          <div className='flex flex-col gap-3'>
            <div className='text-richblack-100 gap-6 font-inter font-semibold text-base'>
              Career Building
            </div>

            <div className='flex flex-col gap-2'>
              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Career paths
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Career services
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Interview prep
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Professional certification
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                -
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Full Catalog
              </Link>

              <Link to={"/"} className='text-sm font-inter text-richblack-400'>
                Beta Content
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Line */}
      <div className='w-full h-[1px] bg-richblack-700'></div>

        {/* Lower */}
      <div className='flex flex-col lg:flex-row justify-between gap-3'>
        <div className='flex flex-row gap-2'>
          <Link to={"/"} className='text-sm font-inter text-richblack-400'>
            Privacy Policy
          </Link>

          <Link to={"/"} className='text-sm font-inter text-richblack-400'>
            Cookie Policy
          </Link>

          <Link to={"/"} className='text-sm font-inter text-richblack-400'>
            Terms
          </Link>
        </div>

        <div className='text-sm font-inter text-richblack-400'>
          Made with ❤️ Codehelp ©️ Studynotion
        </div>
      </div>
    </div>
  )
}

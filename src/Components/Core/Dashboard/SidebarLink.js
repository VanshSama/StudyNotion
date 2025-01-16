import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <NavLink to={link.path} className={`relative py-1 px-2 lg:px-6 flex md:gap-3 text-sm font-medium  ${matchRoute(link.path) ? "text-yellow-50 bg-yellow-800" : "bg-opacity-0 text-richblack-25"}`}>
        <span className={`hidden md:flex absolute left-0 top-0 h-full md:w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

        <div className={`flex items-center gap-x-1 md:gap-x-3 ${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-300"}`}>
            <Icon className='text-lg' />
            <span className={`text-sm font-inter`}>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink

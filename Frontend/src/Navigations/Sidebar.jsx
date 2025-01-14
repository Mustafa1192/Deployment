import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LOGO from "../assets/bscit_logo2nobg.png";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({sidebarOpen, setSidebarOpen = 'default',}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} `}>
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/home" className="block">
          <img src={LOGO} alt="" className="h-14"/>
            {/* <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg> */}
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">

              {/* Education */}
              <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("Education")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800  truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("Education") ? "" : "hover:text-gray-900 "
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("Education") ? 'text-violet-500' : 'text-gray-400 '}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                              <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                            </svg>                            
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Education
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/home"
                               className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Syllabus
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/home"
                              className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Practicals
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/home"
                               className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Question Paper  
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/home"
                              className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              PYQs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/home"
                               className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Extra Materials
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Member */}
              <SidebarLinkGroup activecondition={pathname.includes("ecommerce")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 truncate transition duration-150 ${
                          pathname.includes("ecommerce") ? "" : "hover:text-gray-900"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('ecommerce') ? 'text-violet-500' : 'text-gray-400 '}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Member
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400  ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/faculty"
                              className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Faculty
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/representative"
                              className= "block transition duration-150 truncate text-gray-500/90 hover:text-gray-700 ">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Representative 
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

                {/* Messages */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("messages") && "from-violet-500/[0.12] to-violet-500/[0.04]"}`}>
                <NavLink
                  end
                  to="/achievements"
                  className={`block text-gray-800 truncate transition duration-150 ${
                    pathname.includes("messages") ? "" : "hover:text-gray-900"}`}>
                  <div className="flex items-center">
                      <svg className={`shrink-0 fill-current ${pathname.includes('Achievements') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M6.753 2.659a1 1 0 0 0-1.506-1.317L2.451 4.537l-.744-.744A1 1 0 1 0 .293 5.207l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM6.753 10.659a1 1 0 1 0-1.506-1.317l-2.796 3.195-.744-.744a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.46-.049l3.5-4ZM8 4.5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1ZM9 11.5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Achievements
                      </span>
                  </div>
                </NavLink>
              </li>

              {/* Community */}
              {/* <SidebarLinkGroup activecondition={pathname.includes("community")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/"
                        className={`block text-gray-800  truncate transition duration-150 ${
                          pathname.includes("community") ? "" : "hover:text-gray-900 "}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);}}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('community') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Community
                            </span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}

            </ul>
          </div>

          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
            <ul className="mt-3">

              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="/"
                        className={`block text-gray-800 truncate transition duration-150 ${open ? "" : "hover:text-gray-900"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current text-gray-400`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="text-gray-500/90 hover:text-gray-700 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="text-gray-500/90 hover:text-gray-700 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign Out
                              </span>
                            </NavLink>
                          </li>                          
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 truncate transition duration-150 ${
                          pathname.includes("settings") ? "" : "hover:text-gray-900"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('settings') ? 'text-violet-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fillRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 hover:text-gray-700")}>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Profile
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 hover:text-gray-700")}>
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Notifications
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

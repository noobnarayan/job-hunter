import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./assets/media/JobHunter.png";

function Navbar() {
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Find Jobs",
      path: "/jobs",
    },
    {
      title: "Companies",
      path: "/companies",
    },
  ];

  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const activeStyle = "text-green-700 pb-4 border-b-2 border-green-700";
  return (
    <div className="border-b w-full fixed top-0 left-0 font-Nunito z-50">
      <div className="md:flex items-center justify-between bg-white py-2.5 md:px-10 px-7">
        <div className="font-semibold text-xl cursor-pointer flex items-center text-gray-800">
          <Link to="/" className="flex items-center font-Poppins">
            <img
              src={logo}
              className="w-10 rounded-lg mr-3"
              alt="JobHunter Logo"
            />
            / jobhunter
          </Link>
        </div>

        <div
          onClick={() => setOpen((pre) => !pre)}
          className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden"
        >
          <i
            className={open ? "fa-solid fa-x" : "fa-solid fa-bars"}
            style={{ color: "#3fb337" }}
          ></i>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {navLinks.map((link, index) => {
            return (
              <li
                key={index}
                className="md:ml-8 text-base font-semibold md:my-0 my-7"
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? activeStyle
                      : "text-gray-500 hover:text-green-700"
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            );
          })}
          {/* Temperory Hidden */}
          {!loggedIn ? (
            <div className=" md:flex ">
              <Link to="/login">
                <button className="border border-gray-300 text-black font-bold py-1.5 px-5 rounded-md lg:ml-32 md:ml-7 md:shadow xl:ml-36 hover:bg-green-300 hover:border-green-500 duration-500 mr-5 md:hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-black text-white font-bold py-1.5 px-5 rounded-md md:ml hover:bg-green-700 duration-500 md:hover:scale-105 md:shadow">
                  Sign Up
                </button>
              </Link>
              <div className="md:pl-2 md:ml-2 md:mr-3 flex items-center gap-1 md:border-l md:border-gray-300  lg:h-5 mt-4 md:mt-1.5 font-bold md:font-normal text-gray-500 hover:text-green-700 cursor-pointer">
                <span className=" hover:pb-px md:hover:border-b-2 hover:border-green-700">
                  For employers
                </span>
                <i className="fa-solid fa-angle-down mt-1"></i>
              </div>
            </div>
          ) : (
            <>
              <div className="px-20 flex gap-8 items-center justify-center">
                <div>
                  <span>
                    <i className="fa-solid fa-bell text-xl text-gray-600"></i>
                  </span>
                </div>
                <div className="relative shado">
                  <div
                    className="rounded-full h-9 w-9 hover:cursor-pointer overflow-hidden flex justify-center items-center border"
                    onClick={toggleDropdown}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                      className="object-cover"
                    />
                  </div>

                  {isOpen && (
                    <div className=" absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <a
                          href="profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Edit Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Temperory Hidden */}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

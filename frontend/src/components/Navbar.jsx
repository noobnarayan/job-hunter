import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/media/JobHunter.png";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../services/userService";
import { logout } from "../store/authSlice";

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
  const dispatch = useDispatch();
  const { status, userData } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
  );
  useEffect(() => {
    const profilePicture =
      userData?.userProfile?.profilePicture ||
      userData?.userProfile?.companyLogo;
    setProfilePicture(profilePicture);
  }, [userData]);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    userService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const activeStyle = "text-green-700 pb-4 border-b-2 border-green-700";

  return (
    <div className="border-b w-full fixed top-0 left-0 font-Nunito z-50">
      <div className="lg:flex items-center justify-between bg-white py-2.5 lg:px-10 px-7">
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
          className="text-3xl absolute right-8 top-3 cursor-pointer lg:hidden"
        >
          <i
            className={open ? "fa-solid fa-x" : "fa-solid fa-bars"}
            style={{ color: "#3fb337" }}
          ></i>
        </div>
        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {navLinks.map((link, index) => {
            return (
              <li
                key={index}
                className="lg:ml-8 text-base font-semibold lg:my-0 my-7"
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

          {!status ? (
            <div className=" lg:flex ">
              <Link to="/login">
                <button className="border border-gray-300 text-black font-bold py-1.5 px-5 rounded-md lg:ml-32 lg:ml-7 lg:shadow xl:ml-36 hover:bg-green-300 hover:border-green-500 duration-500 mr-5 lg:hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-black text-white font-bold py-1.5 px-5 rounded-md lg:ml hover:bg-green-700 duration-500 lg:hover:scale-105 lg:shadow">
                  Sign Up
                </button>
              </Link>
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
                    onClick={() => {
                      if (userData.role !== "employer") {
                        toggleDropdown();
                      } else {
                        navigate("/dashboard/home");
                      }
                    }}
                  >
                    <img src={profilePicture} className="object-cover" />
                  </div>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={toggleDropdown}
                        >
                          Edit Profile
                        </Link>
                        <Link
                          to="/saved-jobs"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          onClick={toggleDropdown}
                        >
                          Saved Jobs
                        </Link>
                        <p
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                          role="menuitem"
                          onClick={() => {
                            handleLogout();
                            toggleDropdown();
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

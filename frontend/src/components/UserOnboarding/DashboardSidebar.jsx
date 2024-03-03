import {
  HomeIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/media/JobHunter.png";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../services/userService";
import { logout } from "../../store/authSlice";
import useUpdateUserData from "../../hooks/useUpdateUserData";
import { useEffect } from "react";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    name: "Applications",
    href: "/dashboard/applications",
    icon: UserPlusIcon,
  },
  {
    name: "Shortlisted",
    href: "/dashboard/shortedlisted",
    icon: ShieldCheckIcon,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: ChatBubbleBottomCenterIcon,
  },
];

function DashboardSidebar() {
  const updateUser = useUpdateUserData();
  const { userData } = useSelector((store) => store.auth);

  useEffect(() => {
    updateUser();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    userService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col justify-between border-r border-gray-200 bg-white px-1 py-5 xl:py-12 xl:px-2">
      <div className="ie-logo px-3 py-0 text-center xl:text-left">
        <div className="font-semibold text-xl cursor-pointer flex items-center text-gray-800">
          <Link to="/" className="flex items-center font-Poppins">
            <img
              src={logo}
              className="w-10 rounded-lg mr-3"
              alt="JobHunter Logo"
            />
            <span className="hidden xl:block"> / jobhunter </span>
          </Link>
        </div>
      </div>
      <div className="ie-menu mt-8 h-full">
        <div className="flex flex-col items-center gap-3 p-1 xl:items-stretch xl:px-3">
          {sidebarLinks.map((item) => {
            return (
              <NavLink to={item.href} key={item.name} className="group">
                {({ isActive }) => {
                  return (
                    <span
                      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all ${
                        isActive ? "bg-gray-100" : "group-hover:bg-gray-50"
                      }`}
                    >
                      <item.icon
                        className={`h-5 stroke-2 ${
                          isActive
                            ? "stroke-blue-700"
                            : "stroke-gray-500 group-hover:stroke-blue-700"
                        }`}
                      />
                      <span
                        className={`hidden text-base font-semibold xl:block ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-500 group-hover:text-gray-900"
                        }`}
                      >
                        {item.name}
                      </span>
                    </span>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="ie-user hidden items-center gap-3 px-3 xl:flex">
        <div className="h-10 w-10 rounded-full p-px overflow-hidden border">
          <img
            src={userData?.userProfile?.companyLogo}
            alt={`${userData?.userProfile?.companyName} Logo`}
          />
        </div>
        <div className="ie-userDetails">
          <div className="flex justify-between gap-2">
            <span className="text-base font-semibold text-gray-700">
              {userData?.userProfile?.companyName}
            </span>
            <div className="group flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-2 py-1 transition-all hover:bg-gray-50">
              <span
                className="text-xs font-medium text-gray-700 group-hover:text-red-700"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
          <span className="mt-1 block text-sm font-medium text-gray-700">
            Logged in as {userData?.username}
          </span>
        </div>
      </div>
      <div className="ie-userMobile p-1 xl:hidden"></div>
    </div>
  );
}

export default DashboardSidebar;

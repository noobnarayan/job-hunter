import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import JobCard from "./CardTest";
import Searchbar from "./components/JobListing/Searchbar";
import LoginSignUp from "./Pages/LoginSignUp";
import Signup from "./components/LoginSignup/Signup";
import Login from "./components/LoginSignup/Login";
import UserOnboarding from "./Pages/UserOnboarding";
import JobListing from "./Pages/JobListing";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup"];

  return (
    <>
      <div className="font-Poppins">
        {!hideOnRoutes.includes(location.pathname) && <Navbar />}
        <AllRoutes />
      </div>
    </>
  );
}

export default App;

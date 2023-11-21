import { useEffect, useState } from "react";
import Test from "./Test";
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
function App() {
  return (
    <>
      <div className="font-Poppins">
        <AllRoutes />
      </div>
    </>
  );
}

export default App;

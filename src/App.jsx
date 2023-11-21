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
function App() {
  // const [jobs, setJobs] = useState([]);

  // const fetchJobs = async () => {
  //   let tempData = [];
  //   const q = query(collection(db, "jobs"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((job) => {
  //     // console.log(job.id, " => ", job.data());
  //     tempData.push({ ...job.data(), id: job.id });
  //   });
  //   setJobs(tempData);
  // };

  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  return (
    <>
      <div className="font-Poppins">
        {/* <Login /> */}
        <Signup />
        {/* <JobListing /> */}
      </div>
    </>
  );
}

export default App;

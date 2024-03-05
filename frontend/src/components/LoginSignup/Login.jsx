import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/media/JobHunter.png";
import { userService } from "../../services/userService";
import useUpdateUserData from "../../hooks/useUpdateUserData";

function Login() {
  const navigate = useNavigate();
  const updateUser = useUpdateUserData();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const resetErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    makeLoginRequest(formData);
  };

  const makeLoginRequest = async (userData) => {
    setLoading(true);
    try {
      const res = await userService.login(userData);
      if (res.status === 200) {
        const userData = await userService.getCurrentUser();
        if (userData) {
          await updateUser();
          if (userData.role === "jobSeeker") {
            if (userData.userProfile.doneOnboarding === true) {
              navigate("/");
            } else {
              navigate("/user-onboarding");
            }
          } else if (userData.role === "employer") {
            if (userData.userProfile.doneOnboarding === true) {
              console.log("Sending to dashboard");
              navigate("/dashboard/home");
            } else {
              console.log(userData);
              navigate("/company-onboarding");
            }
          }
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      resetErrorMessage();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hidden font-semibold text-xl cursor-pointer md:flex items-center text-gray-800 px-16 mt-3">
        <Link to="/" className="flex items-center font-Poppins">
          <img
            src={logo}
            className="w-10 rounded-lg mr-3"
            alt="JobHunter Logo"
          />
          / jobhunter
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-3/6 sm:h-screen flex items-center justify-center sm:pt-5 sm:pl-5 md:w-3/5 lg:pl-16 lg:pt-5">
          <div className="h-full w-full sm:text-right sm:pr-12 bg-black sm:pt-24 sm:pl-14 text-green-500 sm:rounded-t-lg lg:pt-44">
            <h2 className="py-4 text-xl text-center sm:text-5xl sm:text-right font-bold sm:mb-5 sm:pl-4 xl:text-6xl ">
              Find the job made for you.
            </h2>
            <p className="hidden sm:block font-light sm:pl-3 sm:text-lg text-white xl:text-xl xl:pl-16">
              Browse over 130K jobs at top companies and fast-growing startups.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-3/6 pt-7 sm:pt-14 md:w-2/5">
          <div className="p-3 sm:p-10">
            <h2 className="text-3xl font-bold">Login</h2>
            <p className="mt-3">Find the job made for you!</p>
            <form className="mt-6" onSubmit={handleFormSubmission}>
              <div className="flex flex-col">
                <label className=" font-semibold">Email:</label>

                <input
                  type="text"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded h-10 text-base pl-5 mb-3 border-x border-y border-gray-400"
                  placeholder="Email"
                />
                <label className=" font-semibold">Password:</label>

                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
                  placeholder="Password"
                />
                <div className="flex justify-between">
                  <span className="text-red-600 text-sm ml-2">
                    {errorMessage}
                  </span>
                  <a
                    href="#"
                    className="text-right font-light text-black cursor-pointer mb-3 underline"
                  >
                    Forget Password?
                  </a>
                </div>

                <button className="bg-black rounded-md text-white font-normal text-sm h-11">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              {/* Temp Hidden */}
              <div className="hidden flex items-center justify-center gap-5 my-6">
                <div className="bg-gray-400 h-px w-1/4"></div>
                <p className="text-gray-400 text-sm">or Login with Google</p>
                <div className="bg-gray-400 h-px w-1/4"></div>
              </div>
            </form>

            {/* Hidden google login button */}
            <button className="hidden px-10 items-center justify-center gap-2 flex h-11 rounded-md text-black text-sm w-full border-x border-y border-gray-400">
              <img
                className="w-10 p-1"
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt="Google Sign-In"
              />
              <span className="text-black font-normal">
                Sign in with Google
              </span>
            </button>
            <div className="mt-5">
              <p className="cursor-pointer text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

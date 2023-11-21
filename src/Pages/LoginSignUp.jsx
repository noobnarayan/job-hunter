import React, { useState } from "react";
import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/Signup";
function LoginSignUp() {
  const [loggedIn, setLoggedIn] = useState(true);
  return <div>{!loggedIn ? <Login /> : <Signup />}</div>;
}

export default LoginSignUp;

import React, { useState } from "react";
import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/Signup";
function LoginSignUp() {
  const [loginSelected, setLoginSelected] = useState(false);

  return <div>{!loginSelected ? <Login /> : <Signup />}</div>;
}

export default LoginSignUp;

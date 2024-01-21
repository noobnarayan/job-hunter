import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup", "/dashboard"];

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

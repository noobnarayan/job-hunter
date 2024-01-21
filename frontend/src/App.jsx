import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";
import { userService } from "./services/userService.js";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup", "/dashboard"];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const userData = await userService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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

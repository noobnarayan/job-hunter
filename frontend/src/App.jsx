import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import useUpdateUserData from "./hooks/useUpdateUserData";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup"];
  const updateUser = useUpdateUserData();

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <>
      <div className="font-Poppins">
        {!(
          location.pathname.startsWith("/dashboard") ||
          hideOnRoutes.includes(location.pathname)
        ) && <Navbar />}
        <AllRoutes />
      </div>
    </>
  );
}

export default App;

import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import useUpdateUserData from "./hooks/useUpdateUserData";

function App() {
  const location = useLocation();
  const hideOnRoutes = ["/login", "/signup", "/dashboard"];
  useUpdateUserData();

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

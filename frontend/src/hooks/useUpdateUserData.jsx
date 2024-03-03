import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../services/userService";
import { login, logout, setLoadingFalse } from "../store/authSlice";

const useUpdateUserData = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const updateUserData = async () => {
    setLoading(true);
    try {
      const userData = await userService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
      dispatch(setLoadingFalse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return updateUserData;
};

export default useUpdateUserData;

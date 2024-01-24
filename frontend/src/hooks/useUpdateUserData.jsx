import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../services/userService";
import { login, logout } from "../store/authSlice";
const useUpdateUserData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const updateUserData = async () => {
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
    updateUserData();
  }, []);

  return updateUserData;
};

export default useUpdateUserData;

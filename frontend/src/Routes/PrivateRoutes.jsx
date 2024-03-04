import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLoadingFalse } from "../store/authSlice";

function PrivateRoutes({ children }) {
  const { status, userData, isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        dispatch(setLoadingFalse());
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isLoading, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-gray-600 h-screen">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoutes;

import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-gray-700">404</h1>
        <p className="text-gray-500 mt-2 mb-6">Oops! Page not found.</p>
        <button
          className="px-4 py-2 font-semibold text-white bg-black rounded hover:bg-green-600"
          onClick={redirectToHome}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;

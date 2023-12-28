import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { useUserContext } from "../../UserProvider";

const ProtectedRoute = ({ children, accessBy }) => {
  const user = useUserContext();

  if (accessBy == "non-authenticated") {
    console.log(user);    
    if (!user) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (user || true) {
      return children;
    }
  }
  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
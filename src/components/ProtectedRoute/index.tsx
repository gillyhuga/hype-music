
import React from "react";
import { Redirect, Route } from "react-router-dom";


interface IProps {
  component: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps & any> = ({ component: Component, ...restOfProps }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props: JSX.IntrinsicAttributes) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
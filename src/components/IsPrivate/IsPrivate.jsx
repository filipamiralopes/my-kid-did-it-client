import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const IsPrivate = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  // this is where we do the logic to check if isLoading and isLoggedIn are correct
  if (isLoading) {
    return <Spinner/>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default IsPrivate;

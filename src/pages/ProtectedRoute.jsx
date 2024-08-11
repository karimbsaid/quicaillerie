import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ group }) => {
  const { user, userBelongsToGroup } = useContext(AuthContext);

  // Render the route if authorized
  return user && userBelongsToGroup(group) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

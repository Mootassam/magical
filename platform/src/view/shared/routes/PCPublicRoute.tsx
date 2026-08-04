import { Redirect, Route } from "react-router-dom";
import permissionCheker from "../../../modules/auth/permissionChecker";

function PCPublicRoute({ component: Component, currentTenant, currentUser, ...reset }) {
  return (
    <Route
      {...reset}
      render={(props) => {
        const permissionChecker = new permissionCheker(currentTenant, currentUser);
        if (permissionChecker.isAuthenticated) {
          return <Redirect to="/pc" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PCPublicRoute;

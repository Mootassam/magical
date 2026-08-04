import { Route, Redirect, useLocation } from "react-router-dom";
import permissionCheker from "../../../modules/auth/permissionChecker";
import PCLayout from "src/view/layout/PC/PCLayout";

function PCPrivateRoute({ component: Component, currentTenant, currentUser, ...reset }) {
  const location = useLocation();
  return (
    <Route
      {...reset}
      render={(props) => {
        const permissionChecker = new permissionCheker(currentTenant, currentUser);
        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: "/pc/auth/signin", state: { from: location } }}
            />
          );
        }

        return (
          <PCLayout>
            <Component {...props} />
          </PCLayout>
        );
      }}
    />
  );
}

export default PCPrivateRoute;

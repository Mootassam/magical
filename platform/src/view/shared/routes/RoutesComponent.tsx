import React, { useEffect, useRef } from "react";
import PrivateRoute from "src/view/shared/routes/PrivateRoute";
import routes from "src/view/shared/routes";
import lazyRouter from "src/view/shared/Lazyroutes";
import PublicRoute from "src/view/shared/routes/PublicRoute";
import ScreenRoute from "src/view/shared/routes/ScreenRoute";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import ProgressBar from "src/view/shared/ProgressBar";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import EmptyPermissionsRoute from "src/view/shared/routes/EmptyPermissionsRoute";
import EstoreRoute from "src/view/shared/routes/EstoreRoute";
import PCRoute from "src/view/shared/routes/PCRoute";
import PCPublicRoute from "src/view/shared/routes/PCPublicRoute";
import PCPrivateRoute from "src/view/shared/routes/PCPrivateRoute";
import useIsDesktop from "src/view/shared/hooks/useIsDesktop";
import { getDeviceRedirectPath } from "src/view/shared/routes/deviceRouteMap";

function RoutesComponent() {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(authSelectors.selectLoadingInit);
  const loading = authLoading;

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);
  const location = useLocation();
  const isDesktop = useIsDesktop();
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // ProgressBar.start();
      return;
    }

    if (!loading) {
      // ProgressBar.done();
    }
  }, [loading]);

  if (loading) {
    return <div />;
  }

  const deviceRedirectTo = getDeviceRedirectPath(location.pathname, isDesktop);
  if (deviceRedirectTo && deviceRedirectTo !== location.pathname) {
    return (
      <Redirect to={{ pathname: deviceRedirectTo, search: location.search }} />
    );
  }

  return (
    <Switch>
      {routes.publicRoutes.map((route) => (
        <PublicRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
        />
      ))}

      {routes.emptyPermissionsRoutes.map((route) => (
        <EmptyPermissionsRoute
          key={route.path}
          exact
          path={route.path}
          currentUser={currentUser}
          currentTenant={currentTenant}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))} 
      {routes.privateRoutes.map((route) => {
        const permissionRequired =
          'permissionRequired' in route ? route.permissionRequired : undefined;
        const withTabNav =
          'withTabNav' in route ? route.withTabNav : undefined;

        return (
          <PrivateRoute
            exact
            key={route.path}
            path={route.path}
            component={lazyRouter({ loader: route.loader })}
            currentUser={currentUser}
            currentTenant={currentTenant}
            permissionRequired={permissionRequired}
            withTabNav={withTabNav}
          />
        );
      })}
      {routes.screenRoutes.map((route) => (
        <ScreenRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
        />
      ))}
      {routes.estoreRoutes.map((route) => (
        <EstoreRoute
          key={route.path}
          exact
          path={route.path}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
      {routes.pcRoutes.map((route) => (
        <PCRoute
          key={route.path}
          exact
          path={route.path}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
      {routes.pcPublicRoutes.map((route) => (
        <PCPublicRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
        />
      ))}
      {routes.pcPrivateRoutes.map((route) => (
        <PCPrivateRoute
          exact
          key={route.path}
          path={route.path}
          component={lazyRouter({ loader: route.loader })}
          currentUser={currentUser}
          currentTenant={currentTenant}
        />
      ))}
      {routes.simpleRoutes.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={lazyRouter({
            loader: route.loader,
          })}
        />
      ))}
    </Switch>
  );
}

export default RoutesComponent;

import { Route } from "react-router-dom";
import LayoutPage from "src/view/layout/LayoutPage";

function EstoreRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutPage withTabNav>
          <Component {...props} />
        </LayoutPage>
      )}
    />
  );
}

export default EstoreRoute;

import { Route } from "react-router-dom";
import PCLayout from "src/view/layout/PC/PCLayout";

function PCRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <PCLayout>
          <Component {...props} />
        </PCLayout>
      )}
    />
  );
}

export default PCRoute;

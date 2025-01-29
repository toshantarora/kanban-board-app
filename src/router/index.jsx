import { Route, Routes } from "react-router-dom";
import routes from "./router.index";

const Routers = () => {
  return (
    <>
      <Routes>
        {routes?.map((route) => (
          <Route
            key={route?.routeId}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </>
  );
};

export default Routers;

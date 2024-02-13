import { useRoutes } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterMainPage";
import FilingComplaintPage from "../pages/FilingComplaintPage";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/test",
      element: <FilingComplaintPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;

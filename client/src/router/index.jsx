import { useRoutes } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/LoginPage";
import PackagePage from "../pages/Packagepage";
import MatchingPage from "../pages/MatchingPage";
// import Admin from "../pages/admin/Admin";
// import AdminPackage from "../pages/admin/Package";
// import AdminComplaint from "../pages/admin/Complaint";
// import Cratepackage from "../pages/admin/Createpackage";
// import Editpackage from "../pages/admin/Editpackage";
import Register from "../pages/RegisterMainPage";
import AdminPage from "../pages/AdminTestPage";

export default function Router() {
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
      path: "/package",
      element: <PackagePage />,
    },
    {
      path: "/matching",
      element: <MatchingPage />,
    },
    {
      path: "/admintest",
      element: <AdminPage />,
    },
    // {
    //   path: "/admin",
    //   element: <Admin />,
    // },

    // {
    //   path: "/admin/package",
    //   element: <AdminPackage />,
    // },

    // {
    //   path: "/admin/complaint",
    //   element: <AdminComplaint />,
    // },

    // {
    //   path: "/admin/createpackage",
    //   element: <Cratepackage />,
    // },
    // {
    //   path: "/admin/editpackage",
    //   element: <Editpackage />,
    // },
  ];

  return useRoutes(routes);
}

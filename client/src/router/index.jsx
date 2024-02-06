import { useRoutes } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/LoginPage";
import PackagePage from "../pages/Packagepage";
import MatchingPage from "../pages/MatchingPage";
import AdminPackageList from "../pages/AdminPackageList";
import AdminPackageCreate from "../pages/AdminPackageCreate";
import AdminPackageEdit from "../pages/AdminPackageEdit";
// import Admin from "../pages/admin/Admin";
// import AdminPackage from "../pages/admin/Package";
// import AdminComplaint from "../pages/admin/Complaint";
// import Cratepackage from "../pages/admin/Createpackage";
// import Editpackage from "../pages/admin/Editpackage";
import Register from "../pages/RegisterMainPage";
import AdminPage from "../pages/AdminTestPage";
import FilingComplaintPage from "../pages/FilingComplaintPage";

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

    {
      path: "/admin/package",
      element: <AdminPackageList />,
    },

    // {
    //   path: "/admin/complaint",
    //   element: <AdminComplaint />,
    // },

    {
      path: "/admin/createpackage",
      element: <AdminPackageCreate />,
    },
    {
      path: "/admin/editpackage",
      element: <AdminPackageEdit />,
    },
    { path: "/filing-complaint", element: <FilingComplaintPage /> },
  ];

  return useRoutes(routes);
}

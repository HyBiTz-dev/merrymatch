import { useRoutes } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/LoginPage";
import PackagePage from "../pages/Packagepage";
import MatchingPage from "../pages/MatchingPage";
import AdminPackageList from "../pages/AdminPackageList";
import AdminPackageCreate from "../pages/AdminPackageCreate";
import AdminPackageEdit from "../pages/AdminPackageEdit";
import Register from "../pages/RegisterMainPage";
import AdminPage from "../pages/AdminTestPage";
import Chat from "../pages/ChatPage";
import { useAuth } from "../context/authentication";

export default function Router() {
  // const { state } = useAuth();
  // const role = state ? state.role : null;
  // console.log(state);
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
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/admintest",
      element: <AdminPage />,
    },
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
  ];

  return useRoutes(routes);
}

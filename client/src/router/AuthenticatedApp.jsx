import { useRoutes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
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
import FilingComplaintPage from "../pages/FilingComplaintPage";
import { useAuth } from "../context/authentication";

export default function Router() {
  const { state } = useAuth();
  const role = state ? state.role : null;
  return (
    <div>
      <Routes>
        {/* ------Common routes for both User and Admin------ */}
        <Route path="/" element={<Home />} />
        <Route path="/package" element={<PackagePage />} />
        <Route path="/matching" element={<MatchingPage />} />
        {/* <Route path="/merrylist" element={<MerryListPage/>} /> */}
        <Route path="/chat" element={<Chat />} />

        {/* ------Admin routes------ */}
        {role === "Admin" && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admintest" element={<AdminPage />} />
            <Route path="/admin/package" element={<AdminPackageList />} />
            <Route
              path="/admin/createpackage"
              element={<AdminPackageCreate />}
            />
            <Route path="/admin/editpackage" element={<AdminPackageEdit />} />
            {/* <Route path="/admin/complaint" element={<AdminComplaint />} /> */}

            <Route path="/filing-complaint" element={<FilingComplaintPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

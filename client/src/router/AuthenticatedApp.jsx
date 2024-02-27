import { useRoutes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/LoginPage";
import PackagePages from "../pages/Packagespage";
import MatchingPage from "../pages/MatchingPage";
import AdminPackageList from "../pages/AdminPackageList";
import AdminPackageCreate from "../pages/AdminPackageCreate";
import AdminPackageEdit from "../pages/AdminPackageEdit";
import Register from "../pages/RegisterMainPage";
import Chat from "../pages/MessagePage";
import FilingComplaintPage from "../pages/FilingComplaintPage";
import MerryListPage from "../pages/MerryListPage";
import AdminComplaintListPage from "../pages/AdminComplaintListPage";
import { useAuth } from "../context/authentication";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import AdminComplaintDetailPage from "../pages/AdminComplaintDetailPage";

import Payment1Page from "../pages/Payment1Page";
import Payment2Page from "../pages/Payment2Page";
import MerryMembershipPage from "../pages/MerryMembershipPage";
export default function Router() {
  const { state } = useAuth();
  const role = state ? state.role : null;
  return (
    <div>
      <Routes>
        {/* ------Common routes for both User and Admin------ */}
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<PackagePages />} />
        <Route path="/payment1" element={<Payment1Page />} />
        <Route path="/payment2" element={<Payment2Page />} />
        <Route path="/merry-membership" element={<MerryMembershipPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/update/:id" element={<UpdateProfilePage />} />
        <Route path="/messages/:id" element={<Chat />} />
        <Route path="/filing-complaint" element={<FilingComplaintPage />} />
        <Route path="/merrylist" element={<MerryListPage />} />

        {/* ------Admin routes------ */}
        {role === "Admin" && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/package" element={<AdminPackageList />} />
            <Route
              path="/admin/createpackage"
              element={<AdminPackageCreate />}
            />
            <Route
              path="/admin/editpackage/:id"
              element={<AdminPackageEdit />}
            />
            <Route
              path="/admin/complaint-list"
              element={<AdminComplaintListPage />}
            />
            <Route
              path="/admin/complaint-details/:id"
              element={<AdminComplaintDetailPage />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";

function SideBarAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
    navigate(`/admin/${item}`);
  };

  return (
    <div className="flex h-screen w-[15rem] bg-white border-r border-r-gray-400 flex-col">
      <div>
        <div className="mx-6 my-6 flex flex-col items-center">
          <img
            src="/images/logo(merry-match-admin).svg"
            alt="merry match logo"
            className=""
          />
          <span className="text-base text-gray-700">Admin Panel Control</span>
        </div>
        <div className="h-[34rem] my-10 text-base font-extrabold text-gray-800">
          <div
            className={`hover:bg-gray-100 ${
              activeItem === "package" || location.pathname === "/admin/package"
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => handleItemClick("package")}
          >
            <div className="flex mx-6 py-6">
              <img src="/images/package.svg" alt="" className="pr-4" />
              <span>Merry Package</span>
            </div>
          </div>
          <div
            className={`hover:bg-gray-100 ${
              activeItem === "complaint-list" ||
              location.pathname === "/admin/complaint-list"
                ? "bg-gray-200"
                : ""
            }`}
            onClick={() => handleItemClick("complaint-list")}
          >
            <div className="flex mx-6 py-6 ">
              <img src="/images/complaint.svg" alt="" className="pr-4" />
              <span onClick={() => navigate("/admin/complaint-list")}>
                Complaint
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-t-gray-300 text-base font-extrabold text-gray-800">
          <div className=" hover:bg-gray-100 active:bg-gray-200">
            <div className="flex mx-6 py-6 cursor-pointer">
              <img src="/images/logout-admin.svg" alt="" className="pr-4" />
              <span onClick={logout}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;

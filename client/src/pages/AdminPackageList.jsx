import SideBarAdmin from "../components/SidebarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AdminPackageList() {
  const [allPackages, setAllPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/packages");
        setAllPackages(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="w-full">
        <div className="h-20 flex items-center  border-b border-b-gray-400">
          <span className="font-bold text-2xl text-gray-900 pl-14 pr-14 w-full">
            Merry Package
          </span>
          <div className="flex">
            <div className="relative pr-4">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered focus:border-purple-500 w-80 max-w-xs pl-12"
              />
              <img
                src="/images/search.svg"
                alt="search icon"
                className="absolute flex items-center inset-y-3 left-0 pl-4"
              />
            </div>
            <div className="ml-auto mr-14">
              <button
                onClick={() => navigate("/admin/createpackage")}
                className="btn  bg-red-500 hover:bg-red-400 active:bg-red-600 text-white w-40 h-[3rem]"
              >
                + Add Package
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex h-[calc(100vh_-_80px)]">
          <div className="pl-14 pr-14 pt-12 w-full">
            <div className="overflow-x-auto text-gray-800 font-medium">
              <table className="table">
                <thead className="bg-gray-400">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Icon</th>
                    <th>Package name</th>
                    <th>Merry limit</th>
                    <th>Created date</th>
                    <th>Updated date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {Array.isArray(allPackages) &&
                    allPackages.map((packageItem, index) => (
                      <tr key={packageItem.id} className="bg-white">
                        <td>
                          <img src="/images/drag.svg" />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          <img src={packageItem.icon} alt="package icon" />
                        </td>
                        <td>{packageItem.packageName}</td>
                        <td>{`${packageItem.merryLimit} Merry`}</td>
                        <td>{packageItem.createdDate}</td>
                        <td>{packageItem.updatedDate}</td>
                        <td>
                          <button>
                            <img src="/images/delete.svg" alt="delete icon" />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => navigate("/admin/editpackage")}
                          >
                            <img src="/images/edit.svg" alt="edit icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPackageList;

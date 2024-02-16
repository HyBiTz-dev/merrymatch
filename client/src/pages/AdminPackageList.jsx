import SideBarAdmin from "../components/SidebarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function AdminPackageList() {
  const [allPackages, setAllPackages] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const openModal = (packageId) => {
    setShowModal(true);
    setDeletePackageId(packageId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/packages/${deletePackageId}`);
      closeModal();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredAllPackages = allPackages.filter((packageItem) =>
    packageItem.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="w-full">
        <div className="h-20 flex items-center bg-white  border-b border-b-gray-400">
          <span className="font-bold text-2xl text-gray-900 pl-14 pr-14 w-full">
            Merry Package
          </span>
          <div className="flex">
            <div className="relative pr-4">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="input input-bordered focus:border-purple-500 w-80 max-w-xs pl-12"
              />
              <img
                src="/images/search.svg"
                alt="search icon"
                className="absolute flex items-center inset-y-3 left-0 pl-4"
              />
            </div>
            <div className="ml-auto mr-14">
              <Button
                primary
                onClick={() => navigate("/admin/createpackage")}
                className="w-40 h-[3rem]"
              >
                + Add Package
              </Button>
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
                    <th>Price</th>
                    <th>Merry limit</th>
                    <th>Created date</th>
                    <th>Updated date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredAllPackages) &&
                    filteredAllPackages.map((packageItem, index) => (
                      <tr key={packageItem.id} className="bg-white">
                        <td>
                          <img src="/images/drag.svg" />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          <img src={packageItem.icon} alt="package icon" />
                        </td>
                        <td>{packageItem.packageName}</td>
                        <td>{`${packageItem.price} THB`}</td>
                        <td>{`${packageItem.merryLimit} Merry`}</td>
                        <td>{packageItem.createdDate}</td>
                        <td>{packageItem.updatedDate}</td>
                        <td>
                          <button onClick={() => openModal(packageItem.id)}>
                            <img src="/images/delete.svg" alt="delete icon" />
                          </button>
                          {showModal && (
                            <dialog
                              id="my_modal_5"
                              className="modal modal-bottom sm:modal-middle bg-black/20"
                              open
                            >
                              <div className="modal-box p-0 shadow-2xl">
                                <div className="px-6 py-2 border-b border-b-gray-200 flex">
                                  <h3 className="font-bold text-lg ">
                                    Delete Confirmation
                                  </h3>
                                  <button
                                    onClick={closeModal}
                                    className="ml-auto"
                                  >
                                    <img
                                      src="/images/close.svg"
                                      alt="close icon"
                                    />
                                  </button>
                                </div>
                                <p className="p-6 text-gray-700">
                                  Do you sure to delete this Package?
                                </p>
                                <div className="modal-action justify-start px-6 pb-6">
                                  <form method="dialog" className="flex gap-4">
                                    <Button secondary onClick={handleDelete}>
                                      Yes, I want to delete
                                    </Button>
                                    <Button primary onClick={closeModal}>
                                      No, I don’t want
                                    </Button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/admin/editpackage/${packageItem.id}`)
                            }
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

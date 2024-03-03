import SideBarAdmin from "../components/SideBarAdmin";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { DndContext } from "@dnd-kit/core";
import { Droppable } from "../components/Dropable";
import { TableRowDraggable } from "../components/TableRowDraggable";
import { SortableItem } from "../components/Sortableitem";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

function AdminPackageList() {
  const [allPackages, setAllPackages] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const items = useMemo(() => allPackages?.map(({ id }) => id), [allPackages]);

  useEffect(() => {
    fetchPackageData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchFromServer(searchTerm);
    } else {
      fetchPackageData();
    }
  }, [searchTerm]);

  const fetchPackageData = async () => {
    try {
      const { data, error } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages`
      );
      if (error) throw error;
      setAllPackages(data);
    } catch (error) {
      console.error("Error fetching package data:", error);
    }
  };

  const searchFromServer = async (searchTerm) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_ENDPOINT
        }/packages?search=${searchTerm}`
      );
      setAllPackages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages/${deletePackageId}`
      );
      setAllPackages(
        allPackages.filter((packageItem) => packageItem.id !== deletePackageId)
      );
    } catch (error) {
      console.error("Error deleting package:", error);
    }
    setShowModal(false);
  };

  const openModal = (packageId) => () => {
    setShowModal(true);
    setDeletePackageId(packageId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAllPackages((allPackages) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newArray = arrayMove(allPackages, oldIndex, newIndex);
        const setData = async (data) => {
          await axios.put(
            `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages`,
            { data: JSON.stringify(data) }
          );
        };
        setData(newArray);
        return newArray;
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <div className="flex bg-white ">
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
                  className="input input-bordered bg-white focus:border-purple-500 w-80 max-w-xs pl-12"
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
          <div className="bg-gray-100 flex justify-center h-[calc(100vh_-_80px)]">
            <div className="pl-14 pr-14 pt-12">
              {/* <Droppable className="overflow-x-auto font-medium" id="dropable"> */}
              <table className="table w-[67.5rem] bg-white rounded-b-2xl overflow-hidden">
                <thead className="bg-gray-400 text-gray-800 text-body4">
                  <tr className=" border-gray-400">
                    <th></th>
                    <th className=""></th>
                    <th className="">Icon</th>
                    <th className="">Package name</th>
                    <th className="">Price</th>
                    <th className="">Merry limit</th>
                    <th className="">Created date</th>
                    <th className="">Updated date</th>
                    <th className=""></th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  <SortableContext
                    items={allPackages.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {allPackages.map((packageItem, index) => (
                      <SortableItem key={index} id={packageItem.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={packageItem.package_icon}
                            alt="package icon"
                            width={32}
                            height={32}
                          />
                        </td>
                        <td>{packageItem.name}</td>
                        <td>{`${packageItem.price} THB`}</td>
                        <td>{`${packageItem.merry_limit} Merry`}</td>
                        <td>
                          {new Date(packageItem.created_at).toLocaleString()}
                        </td>
                        <td>
                          {new Date(packageItem.updated_at).toLocaleString()}
                        </td>
                        <td>
                          <button onClick={openModal(packageItem.id)}>
                            <img
                              src="/images/delete.svg"
                              alt="delete icon"
                              width={24}
                              height={24}
                            />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/admin/editpackage/${packageItem.id}`)
                            }
                          >
                            <img
                              src="/images/edit.svg"
                              alt="edit icon"
                              width={24}
                              height={24}
                            />
                          </button>
                        </td>
                      </SortableItem>
                    ))}
                  </SortableContext>
                  {/* {Array.isArray(filteredAllPackages) &&
                    filteredAllPackages.map((packageItem, index) => (
                      <TableRowDraggable
                        key={packageItem.id}
                        id={packageItem.id}
                      >
                        <td>
                          <img src="/images/drag.svg" />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={packageItem.package_icon}
                            alt="package icon"
                          />
                        </td>
                        <td>{packageItem.name}</td>
                        <td>{`${packageItem.price} THB`}</td>
                        <td>{`${packageItem.merry_limit} Merry`}</td>
                        <td>
                          {new Date(packageItem.created_at).toLocaleString()}
                        </td>
                        <td>
                          {new Date(packageItem.updated_at).toLocaleString()}
                        </td>
                        <td>
                          <button onClick={openModal(packageItem.id)}>
                            <img src="/images/delete.svg" alt="delete icon" />
                          </button>
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
                      </TableRowDraggable>
                    ))} */}
                </tbody>
              </table>
              {/* </Droppable> */}

              {showModal && (
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle bg-black/20"
                  open
                >
                  <div className="modal-box p-0 shadow-2xl bg-white border border-gray-100">
                    <div className="px-6 py-2 border-b border-b-gray-200 flex">
                      <h3 className="font-bold text-lg">Delete Confirmation</h3>
                      <button onClick={closeModal} className="ml-auto">
                        <img src="/images/close.svg" alt="close icon" />
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
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default AdminPackageList;

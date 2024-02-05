import SideBarAdmin from "../components/SidebarAdmin";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import classNames from "classnames";

function AdminPackageCreate() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [merryLimit, setMerryLimit] = useState("");
  const [detailInputs, setDetailInputs] = useState([""]);
  const [packages, setPackages] = useState([]);
  const [packageNames, setPackageNames] = useState("");
  const [errorMessages, setErrorMessages] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMerryLimitChange = (e) => {
    const seletedLimit = e.target.value;
    setMerryLimit(seletedLimit);
  };

  const handlePackageNameChange = (e) => {
    const name = e.target.value;
    setPackageNames(name);
  };

  const handleCreatePackage = () => {
    if (packageNames.trim() === "" || merryLimit.trim() === "") {
      setErrorMessages("Please fill in all the fields !");
      return;
    }

    setPackages((prevPackages) => [
      ...prevPackages,
      {
        id: Date.now(),
        packageNames,
        merryLimit,
        selectedFile,
        detailInputs,
      },
    ]);
    console.log("allPackages", packages);
    setErrorMessages(null);
  };

  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="w-full">
        <div className="h-20 flex items-center  pl-14 pr-14">
          <span className="font-bold text-2xl text-gray-900 w-full">
            Add Package
          </span>
          <div className="flex ">
            <button
              onClick={() => navigate("/admin/package")}
              className="btn bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 rounded-[6rem] w-[6rem]"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePackage}
              className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white rounded-[6rem] w-[6rem]"
            >
              Create
            </button>
          </div>
        </div>

        <div className="bg-gray-100 flex justify-center items-start pt-10 pb-[3.75rem] h-[calc(100vh_-_80px)] overflow-auto">
          <div className="bg-white rounded-2xl pt-[2.5rem] pb-[3.75rem] px-[6.25rem] w-full mx-[3.75rem] max-w-[67.5rem]">
            <div className="grid grid-cols-2 mb-10">
              <label className="form-control mr-10">
                <div className="">
                  <span className="">Package name</span>
                  <span className=" text-red-500"> *</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered input-md "
                  value={packageNames}
                  onChange={handlePackageNameChange}
                />
              </label>
              <label className="form-control">
                <div className="">
                  <span className="">Merry limit</span>
                  <span className=" text-red-500"> *</span>
                </div>
                <select
                  value={merryLimit}
                  onChange={handleMerryLimitChange}
                  className="select select-bordered "
                >
                  <option></option>
                  <option value="25">25</option>
                  <option value="50">45</option>
                  <option value="70">70</option>
                </select>
              </label>
            </div>
            <div className="pb-10">
              <span>Icon</span>
              <span className="text-red-500"> *</span>
              <div className="">
                <button
                  onClick={() => inputRef.current.click()}
                  className=" bg-gray-100 text-white rounded-2xl w-[6.25rem] h-[6.25rem] pt-2"
                >
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt="file"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="text-purple-600 flex flex-col font-medium">
                      <span>+</span>
                      <span>Upload icon</span>
                    </div>
                  )}
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  className="input input-bordered hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="border-b border-b-gray-500 mb-10 relative"></div>
            <div className="pb-10">
              <span>Package Detail</span>
            </div>
            {detailInputs.map((detail, index) => {
              const deletable = detailInputs.length > 1;
              return (
                <div key={index} className="flex pb-10">
                  <img className="pr-6" src="/images/drag.svg" alt="icon" />
                  <div className="flex-1">
                    <label className="form-control w-full mr-10">
                      <div className="">
                        <span>Detail</span>
                        <span className="text-red-500"> *</span>
                      </div>
                      <input
                        type="text"
                        className="input input-bordered input-md"
                      />
                    </label>
                  </div>
                  <button
                    disabled={!deletable}
                    onClick={() =>
                      setDetailInputs((prevDetails) =>
                        prevDetails.length > 1
                          ? prevDetails.filter((_, i) => i !== index)
                          : prevDetails
                      )
                    }
                    className={classNames(
                      "w-[3rem] pl-6 bg-white text-gray-500 hover:text-red-400 active:text-red-600 font-bold",
                      { "cursor-not-allowed grayscale": !deletable }
                    )}
                  >
                    Delete
                  </button>
                </div>
              );
            })}

            <div className="pl-[3.12rem]">
              <button
                onClick={() =>
                  setDetailInputs((prevDetails) => [...prevDetails, ""])
                }
                className="btn bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 rounded-[6rem] w-[8.75rem] h-12"
              >
                + Add detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPackageCreate;

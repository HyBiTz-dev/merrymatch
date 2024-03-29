import SideBarAdmin from "../components/SideBarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import classNames from "classnames";
import Button from "../components/Button";
import { Formik, Field, FieldArray, Form } from "formik";
import axios from "axios";

function AdminPackageEdit() {
  const inputRef = useRef(null);
  const params = useParams();
  const [packages, setPackages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [deletePackageId, setDeletePackageId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const packageId = params.id;

    if (!packageId) {
      navigate("/admin/package");
      return;
    }

    const fetchPackageData = async () => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages/${packageId}`
        );
        const packageData = resp.data;
        if (packageData.length > 0) {
          setPackages(packageData[0]);
        } else {
          console.error("Package not found");
          navigate("/admin/package");
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
        navigate("/admin/package");
      }
    };
    fetchPackageData();
  }, [params.id, navigate]);

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFieldValue("packageIcon", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleEditPackage(values) {
    const { packageName, price, merryLimit, packageIcon, packageDetails } =
      values;
    const packageId = params.id;
    try {
      const { data, error } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages/${packageId}`,
        {
          packageName,
          price,
          merryLimit,
          packageIcon,
          details: packageDetails,
        }
      );
      if (error) throw error;
      navigate("/admin/package");
    } catch (error) {
      alert("Error edit package: " + error.message);
    }
  }

  if (!packages) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages/${deletePackageId}`
      );
      const updatePackages = allPackages.filter(
        (packageItem) => packageItem.id !== deletePackageId
      );
      setAllPackages(updatePackages);
      setShowModal(false);
      navigate("/admin/package");
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

  return (
    <Formik
      initialValues={{
        packageName: packages.name || "",
        price: packages.price || 0,
        merryLimit: packages.merry_limit || 0,
        packageIcon: packages.package_icon || "",
        packageDetails: packages.details || [""],
      }}
      onSubmit={handleEditPackage}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex">
            <SideBarAdmin />
            <div className="w-full bg-white">
              <div className="h-20 flex items-center gap-4 pl-14 pr-14">
                <button onClick={() => navigate("/admin/package")}>
                  <img
                    src="/images/arrow_back.svg"
                    alt="arrow icon"
                    width={24}
                    height={24}
                  />
                </button>
                <span className="font-bold text-2xl text-gray-900 w-full">
                  Edit ‘{packages.name}’
                </span>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    secondary
                    onClick={() => navigate("/admin/package")}
                    className=" text-red-600 rounded-[6rem] w-[6rem]"
                  >
                    Cancel
                  </Button>
                  <Button
                    primary
                    type="submit"
                    className=" text-white rounded-[6rem] w-[6rem]"
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 flex justify-center items-start pt-10 pb-[3.75rem] h-[calc(100vh_-_80px)] overflow-auto">
                <div className=" w-full max-w-[67.5rem] mx-[3.75rem]">
                  <div className="bg-white rounded-2xl pt-[2.5rem] pb-[3.75rem] px-[6.25rem] w-full mx-[3.75rem] max-w-[67.5rem]">
                    <div className="grid grid-cols-2 mb-10">
                      <label className="form-control mr-10">
                        <div className="">
                          <span className="text-[#07090D]">Package name</span>
                          <span className=" text-red-500"> *</span>
                        </div>
                        <Field
                          type="text"
                          as="input"
                          name="packageName"
                          className="input input-bordered input-md bg-white text-black text-body2 focus:outline-none"
                        />
                      </label>
                      <label className="form-control pb-10">
                        <div>
                          <span className="text-[#07090D]">Price</span>
                          <span className=" text-red-500"> *</span>
                        </div>
                        <Field
                          as="input"
                          type="number"
                          name="price"
                          min={1}
                          className="input input-bordered input-md bg-white text-black text-body2 focus:outline-none"
                        />
                      </label>
                    </div>
                    <label className="form-control pb-10">
                      <div>
                        <span className="text-[#07090D]">Merry limit</span>
                        <span className=" text-red-500"> *</span>
                      </div>
                      <Field
                        as="input"
                        type="number"
                        name="merryLimit"
                        min={1}
                        className="input input-bordered input-md bg-white text-black text-body2 focus:outline-none"
                      />
                    </label>
                    <div className="pb-10 flex flex-col gap-2">
                      <span className="text-[#07090D]">
                        Icon <span className="text-red-500"> *</span>
                      </span>

                      <div className=" bg-gray-100 text-white rounded-2xl w-[6.25rem] h-[6.25rem] flex justify-center items-center relative ">
                        {values.packageIcon ? (
                          <div>
                            <img
                              src={values.packageIcon}
                              alt="file"
                              width={32}
                              height={32}
                            />
                            <img
                              src="/images/cross-btn.svg"
                              width={24}
                              height={24}
                              alt="close"
                              role="button"
                              className="rounded-full absolute -top-1 -right-1 bg-[#AF2758] p-1.5"
                              onClick={() => setFieldValue("packageIcon", "")}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => inputRef.current.click()}
                            className="text-purple-600 text-body4 flex flex-col justify-center items-center gap-2 cursor-pointer"
                          >
                            <img
                              src="/images/plus.svg"
                              alt=""
                              width={15}
                              height={15}
                            />
                            <span>Upload icon</span>
                          </div>
                        )}
                        <Field
                          as="input"
                          innerRef={inputRef}
                          name="packageIcon"
                          type="file"
                          value={undefined}
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                          className="input input-bordered hidden"
                        />
                      </div>
                    </div>
                    <div className="border-b border-b-gray-500 mb-10 relative"></div>
                    <div className="pb-10">
                      <span className="text-gray-700">Package Detail</span>
                    </div>
                    <FieldArray
                      name="packageDetails"
                      render={(arrayHelper) => (
                        <>
                          {values.packageDetails.map((detail, index) => {
                            const deletable = values.packageDetails.length > 1;
                            return (
                              <div key={index} className="flex gap-6 mb-4">
                                <img
                                  className=""
                                  src="/images/drag.svg"
                                  alt="icon"
                                />
                                <div className="flex-1">
                                  <label className="form-control w-full mr-10">
                                    <div className="">
                                      <span className="text-[#07090D]">
                                        Detail
                                      </span>
                                      <span className="text-red-500"> *</span>
                                    </div>
                                    <Field
                                      name={`packageDetails.${index}`}
                                      as="input"
                                      type="text"
                                      className="input input-bordered input-md bg-white text-black text-body2 focus:outline-none"
                                    />
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  disabled={!deletable}
                                  onClick={() =>
                                    values.packageDetails.length > 1
                                      ? arrayHelper.remove(index)
                                      : null
                                  }
                                  className={classNames({
                                    "text-red-500  hover:text-red-400 active:text-red-600 text-base font-bold":
                                      deletable,
                                    "cursor-not-allowed text-gray-500 text-base font-bold":
                                      !deletable,
                                  })}
                                >
                                  Delete
                                </button>
                              </div>
                            );
                          })}
                          <div className="pl-[3.12rem] mt-10">
                            <Button
                              secondary
                              type="button"
                              onClick={() => arrayHelper.push("")}
                              className=" text-red-600 rounded-[6rem] w-[8.75rem] h-12"
                            >
                              + Add detail
                            </Button>
                          </div>
                        </>
                      )}
                    />
                  </div>

                  <div className="mt-5 text-right">
                    <button onClick={openModal(packages.id)}>
                      Delete Package
                    </button>
                    {showModal && (
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle bg-black/20"
                        open
                      >
                        <div className="modal-box p-0 shadow-2xl ">
                          <div className="px-6 py-2 border-b border-b-gray-200 flex">
                            <h3 className="font-bold text-lg ">
                              Delete Confirmation
                            </h3>
                            <button onClick={closeModal} className="ml-auto">
                              <img src="/images/close.svg" alt="close icon" />
                            </button>
                          </div>
                          <p className="p-6 text-gray-700 flex">
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
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdminPackageEdit;

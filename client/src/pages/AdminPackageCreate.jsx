import SideBarAdmin from "../components/SideBarAdmin";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import classNames from "classnames";
import Button from "../components/Button";
import { Formik, Field, FieldArray, Form } from "formik";
import axios from "axios";

function AdminPackageCreate() {
  const inputRef = useRef(null);

  const navigate = useNavigate();

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

  async function handleCreatePackage(values) {
    const { packageName, price, merryLimit, packageIcon, packageDetails } =
      values;
    try {
      const { data, error } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/packages`,
        {
          packageName,
          price,
          merryLimit,
          packageIcon,
          details: packageDetails,
        }
      );
      console.log(data);
      if (error) throw error;
      navigate("/admin/package");
    } catch (error) {
      alert("Error creating package: " + error.message);
    }
  }

  return (
    <Formik
      initialValues={{
        packageName: "",
        price: 0,
        merryLimit: 0,
        packageIcon: "",
        packageDetails: [""],
      }}
      onSubmit={handleCreatePackage}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex">
            <SideBarAdmin />
            <div className="w-full bg-white">
              <div className="h-20 flex items-center  pl-14 pr-14">
                <span className="font-bold text-2xl text-gray-900 w-full">
                  Add Package
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
                    Create
                  </Button>
                </div>
              </div>

              <div className="bg-gray-100 flex justify-center items-start pt-10 pb-[3.75rem] h-[calc(100vh_-_80px)] overflow-auto">
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
                        className="input input-bordered input-md bg-white text-black focus:outline-none"
                      />
                    </label>
                    <label className="form-control">
                      <div className="">
                        <span className="text-[#07090D]">Price</span>
                        <span className=" text-red-500"> *</span>
                      </div>
                      <Field
                        as="input"
                        type="number"
                        name="price"
                        min={1}
                        className="input input-bordered input-md bg-white text-black focus:outline-none"
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
                      className="input input-bordered input-md bg-white text-black focus:outline-none"
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
                            <div className="flex gap-6 mb-4" key={index}>
                              <img src="/images/drag.svg" />
                              <div className="flex-1">
                                <label className="form-control w-full mr-10">
                                  <div>
                                    <span className="text-[#07090D]">
                                      Detail
                                    </span>
                                    <span className="text-red-500"> *</span>
                                  </div>
                                  <Field
                                    name={`packageDetails.${index}`}
                                    as="input"
                                    type="text"
                                    className="input input-bordered input-md bg-white text-black focus:outline-none"
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
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdminPackageCreate;

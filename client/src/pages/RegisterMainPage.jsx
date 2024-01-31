import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { useState } from "react";

function RegisterMainPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      location: "",
      city: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      genderInterests: "",
      recial: "",
      meeting: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };
  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <form
            className="flex flex-col gap-10 pb-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-2xl text-purple-500 pb-6">
              Basic Information
            </div>
            <div id="input-container-1" className="flex justify-between">
              <div id="name-input">
                <div className="text-base text-black">Name</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div id="date-of-birth-input">
                <div className="text-base text-black">Date of birth</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.dateOfBirth}
                />
              </div>
            </div>
            <div id="input-container-2" className="flex justify-between">
              <div id="location-input">
                <div className="text-base text-black">Location</div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="location"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                >
                  <option>Location</option>
                  <option>Thailand</option>
                  <option>China</option>
                  <option>etc</option>
                </select>
              </div>
              <div id="city-input">
                <div className="text-base text-black">City</div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                >
                  <option>city</option>
                  <option>Bangkok</option>
                  <option>Chingmai</option>
                  <option>etc</option>
                </select>
              </div>
            </div>
            <div id="input-container-3" className="flex justify-between">
              <div id="username-input">
                <div className="text-base text-black">Username</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="At least 6 characters"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </div>
              <div id="email-input">
                <div className="text-base text-black">Email</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@website.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </div>
            <div id="input-container-4" className="flex justify-between">
              <div id="password-input">
                <div className="text-base text-black">Password</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div id="confirm-password-input">
                <div className="text-base text-black">Confirm Password</div>
                <input
                  className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="At least 8 characters"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>
            </div>
          </form>
        );
      case 2:
        return (
          <form
            className="flex flex-col gap-10 pb-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-2xl text-purple-500 pb-6">
              Identities and Interests
            </div>
            <div id="input-container-1" className="flex justify-between">
              <div id="gender-input">
                <div className="text-base text-black">Sexual identities </div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>non-binary</option>
                  <option>etc</option>
                </select>
              </div>
              <div id="date-of-birth-input">
                <div className="gender-interests-base text-black">
                  Sexual preferences{" "}
                </div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="genderInterests"
                  name="genderInterests"
                  onChange={formik.handleChange}
                  value={formik.values.genderInterests}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>non-binary</option>
                  <option>etc</option>
                </select>
              </div>
            </div>
            <div id="input-container-2" className="flex justify-between">
              <div id="recial-input">
                <div className="text-base text-black">Racial preferences</div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="recial"
                  name="recial"
                  onChange={formik.handleChange}
                  value={formik.values.recial}
                >
                  <option>Asian</option>
                  <option>Caucasian</option>
                  <option>Black</option>
                  <option>etc</option>
                </select>
              </div>
              <div id="meeting-input">
                <div className="text-base text-black">Meeting interests</div>
                <select
                  className="border bg-white rounded-lg p-3 w-[27.9rem]"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.meeting}
                >
                  <option>friends</option>
                  <option>partners</option>
                  <option>long-term commitment</option>
                  <option>etc</option>
                </select>
              </div>
            </div>
            <div id="input-container-3" className="flex justify-around">
              <div id="hobbies-interests-input">
                <div className="text-base text-black">
                  Hobbies / Interests (Maximum 10)
                </div>
                <input
                  className="border bg-white rounded-lg p-3 w-[66rem] focus:border-purple-500 outline-none"
                  id="hobbiesInterests"
                  name="hobbiesInterests"
                  type="text"
                  placeholder="Hobbies Interests"
                  onChange={formik.handleChange}
                  value={formik.values.hobbiesInterests}
                />
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <form
            className="flex flex-col gap-10 pb-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-2xl text-purple-500  pb-6">
              Profile pictures
              <div className=" text-gray-800 text-base">
                Upload at least 2 photos
              </div>
            </div>
            <div id="input-container-1" className="flex justify-around">
              <input id="picture1" name="picture1" type="file"></input>
              <input id="picture2" name="picture2" type="file"></input>
              <input id="picture3" name="picture3" type="file"></input>
              <input id="picture4" name="picture4" type="file"></input>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-main w-full h-[55.9375rem] font-nunito">
        <div className=" w-[66rem] h-full">
          <header className="flex h-36 pb-20 mt-20 items-end justify-around">
            <div id="register-header">
              <div className="text-sm text-beige-700 font-semibold">
                Register
              </div>
              <div className="text-5xl text-purple-500 font-extrabold w-[28.3125rem]">
                Join us and start matching{" "}
              </div>
            </div>
            <div id="header-tabs" className="flex gap-3">
              {currentStep === 1 ? (
                <div className="flex items-center gap-4 border-purple-500 border p-4 pr-8 rounded-2xl">
                  <div className=" text-2xl font-bold text-purple-500 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    1
                  </div>
                  <div>
                    <div className=" text-gray-700 font-medium">Step 1/3</div>
                    <div className=" text-purple-500 font-bold">
                      Basic Information
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 border-purple-500 border p-4  rounded-2xl">
                  <div className=" text-2xl font-bold text-gray-600 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    1
                  </div>
                </div>
              )}
              {currentStep === 2 ? (
                <div className="flex items-center gap-4 border-purple-500 border p-4 pr-8 rounded-2xl">
                  <div className=" text-2xl font-bold text-purple-500 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    2
                  </div>
                  <div>
                    <div className=" text-gray-700 font-medium">Step 2/3</div>
                    <div className=" text-purple-500 font-bold">
                      Identities and Interests
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 border-purple-500 border p-4  rounded-2xl">
                  <div className=" text-2xl font-bold text-gray-600 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    2
                  </div>
                </div>
              )}
              {currentStep === 3 ? (
                <div className="flex items-center gap-4 border-purple-500 border p-4 pr-8 rounded-2xl">
                  <div className=" text-2xl font-bold text-purple-500 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    3
                  </div>
                  <div>
                    <div className=" text-gray-700 font-medium">Step 3/3</div>
                    <div className=" text-purple-500 font-bold">
                      Profile pictures
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 border-purple-500 border p-4  rounded-2xl">
                  <div className=" text-2xl font-bold text-gray-600 bg-gray-200 p-4 pt-2 pb-2 rounded-2xl">
                    3
                  </div>
                </div>
              )}
            </div>
          </header>
          {renderFormFields()}
        </div>
        <div className="flex justify-around items-center w-full h-fit bg-white pt-9 pb-8">
          <div id="pagination-number">{currentStep}/3</div>
          <div className="flex gap-6" id="button-container">
            <button
              disabled={currentStep === 1}
              className="flex items-center text-base gap-2 text-red-500 pt-1 p-4 pl-6 pr-6 disabled:bg-none"
              onClick={prevStep}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.5275 7.33665H5.08079L8.33412 4.08332C8.59412 3.82332 8.59412 3.39665 8.33412 3.13665C8.07412 2.87665 7.65412 2.87665 7.39412 3.13665L3.00079 7.52998C2.74079 7.78998 2.74079 8.20998 3.00079 8.46998L7.39412 12.8633C7.65412 13.1233 8.07412 13.1233 8.33412 12.8633C8.59412 12.6033 8.59412 12.1833 8.33412 11.9233L5.08079 8.66998H12.5275C12.8941 8.66998 13.1941 8.36998 13.1941 8.00332C13.1941 7.63665 12.8941 7.33665 12.5275 7.33665Z"
                  fill="#C70039"
                />
              </svg>
              Back
            </button>
            {currentStep < 3 ? (
              <button
                type="button"
                className="rounded-[6.1875rem] bg-red-500 text-white p-3 pl-6 pr-6 hover:bg-red-400 active:bg-red-600"
                onClick={nextStep}
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-[6.1875rem] bg-red-500 text-white p-3 pl-6 pr-6 hover:bg-red-400 active:bg-red-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterMainPage;

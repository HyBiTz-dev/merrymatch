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
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-main w-full h-full font-nunito">
        <header className="flex justify-around pt-20 pb-20">
          <div id="register-header">
            <div className="text-sm text-beige-700">Register</div>
            <div className="text-5xl text-purple-500">
              Join us and start matching{" "}
            </div>
          </div>
          <div id="header-tabs">
            <ul className="steps">
              <li className="step step-primary">step 1/3</li>
              <li className="step">step 2/3</li>
              <li className="step">step 3/3</li>
            </ul>
          </div>
        </header>
        <form className="flex flex-col gap-10" onSubmit={formik.handleSubmit}>
          <div className="text-2xl text-purple-500 pl-60 pb-6">
            Basic Information
          </div>
          <div id="input-container-1" className="flex justify-around">
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
          <div id="input-container-2" className="flex justify-around">
            <div id="location-input">
              <div className="text-base text-black">Location</div>
              <select
                className="border bg-white rounded-lg p-3 w-[27.9rem]"
                id="location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
              >
                <option disabled selected>
                  Location
                </option>
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
                <option disabled selected>
                  city
                </option>
                <option>Bangkok</option>
                <option>Chingmai</option>
                <option>etc</option>
              </select>
            </div>
          </div>
          <div id="input-container-3" className="flex justify-around">
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
          <div id="input-container-4" className="flex justify-around">
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
          <div className="flex justify-around w-full h-full pb-8 pt-12 bg-white">
            <div id="pagination-number">1/3</div>
            <div className="flex gap-6" id="button-container">
              <button className="btn btn-ghost">
                <img src="src/assets/arrow_back.svg" alt="Back" />
                Back
              </button>
              <button
                type="submit"
                className="rounded-[6.1875rem] bg-red-500 text-white p-3 pl-6 pr-6 hover:bg-red-400 active:bg-red-600"
              >
                Next Step
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterMainPage;

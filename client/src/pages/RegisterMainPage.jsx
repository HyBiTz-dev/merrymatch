import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { useState } from "react";
import { Step1, Step2, Step3 } from "../components/RegisterForm";
import Button from "../components/Button";
import * as Yup from "yup";

function RegisterMainPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      location: null,
      city: null,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: null,
      genderInterests: null,
      recial: null,
      meeting: null,
      hobbiesInterests: [],
      profilePictures: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(64, "Must be 64 characters or less")
        .required("Required"),
      dateOfBirth: Yup.date()
        .required("Required")
        .test(
          "is-over-18",
          "You must be at least 18 years old",
          function (value) {
            const currentDate = new Date();
            const userDate = new Date(value);
            const userAge = currentDate.getFullYear() - userDate.getFullYear();
            return userAge >= 18;
          }
        ),
      location: Yup.string().nullable(false).required("Required"),
      city: Yup.string().nullable(false).required("Required"),
      username: Yup.string()
        .max(64, "Must be 64 characters or less")
        .min(6, "Must be at least 6 character")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 character")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm Password must match password"
        )
        .required("Required"),
      gender: Yup.string().nullable(false).required("Required"),
      genderInterests: Yup.string().nullable(false).required("Required"),
      recial: Yup.string().nullable(false).required("Required"),
      meeting: Yup.string().nullable(false).required("Required"),
      hobbiesInterests: Yup.array()
        .min(1, "Must be at least 1 hobbies Interests or less")
        .max(10, "Must be 10 hobbies Interests or less")
        .required("Required"),
      profilePictures: Yup.array()
        .min(2, "Must be at least 2 picture")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const steps = [Step1, Step2, Step3];

  const StepComponent = steps[currentStep - 1];

  const stepsFields = [
    [
      "name",
      "dateOfBirth",
      "location",
      "city",
      "username",
      "email",
      "password",
      "confirmPassword",
    ],
    ["gender", "genderInterests", "racial", "meeting", "hobbiesInterests"],
    ["profilePictures"],
  ];

  const nextStep = () => {
    const currentStepFields = stepsFields[currentStep - 1];
    formik.setTouched(
      currentStepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    formik.validateForm().then((errors) => {
      const currentStepErrors = currentStepFields.some(
        (field) => errors[field]
      );
      if (!currentStepErrors && currentStep < steps.length) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    });
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
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
            <div id="current-step-tabs" className="flex gap-3">
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
          <StepComponent formik={formik} />
        </div>
        <div className="flex justify-around items-center w-full h-fit bg-white pt-9 pb-8">
          <div id="pagination-number">{currentStep}/3</div>
          <div
            className="flex justify-center items-end gap-6 h-[48px]"
            id="button-container"
          >
            <button
              id="back-step-button"
              disabled={currentStep === 1}
              className="flex items-center m-auto justify-center text-base gap-2 text-red-500 disabled:text-gray-500 hover:text-red-600"
              onClick={prevStep}
            >
              <svg
                className={`${
                  currentStep === 1 ? " fill-gray-500 " : "fill-red-500"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M12.5275 7.33665H5.08079L8.33412 4.08332C8.59412 3.82332 8.59412 3.39665 8.33412 3.13665C8.07412 2.87665 7.65412 2.87665 7.39412 3.13665L3.00079 7.52998C2.74079 7.78998 2.74079 8.20998 3.00079 8.46998L7.39412 12.8633C7.65412 13.1233 8.07412 13.1233 8.33412 12.8633C8.59412 12.6033 8.59412 12.1833 8.33412 11.9233L5.08079 8.66998H12.5275C12.8941 8.66998 13.1941 8.36998 13.1941 8.00332C13.1941 7.63665 12.8941 7.33665 12.5275 7.33665Z" />
              </svg>
              Back
            </button>
            {currentStep < 3 ? (
              <Button id="next-step-button" primary onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button
                id="confirm-button"
                type="submit"
                primary
                onClick={formik.handleSubmit}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterMainPage;

import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { useState } from "react";
import { Step1, Step2, Step3 } from "../components/RegisterForm";
import Button from "../components/Button";
import * as Yup from "yup";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function RegisterMainPage() {
  const navigate = useNavigate("");
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
    onSubmit: async (values) => {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) {
          console.error("ลงทะเบียนไม่สำเร็จ: ", error.message);
        } else {
          console.log("ลงทะเบียนสำเร็จ: ", user);
        }
      } catch (error) {
        console.error("ลงทะเบียนไม่สำเร็จ: ", error.message);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
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
      <Navbar unauth />
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
          <div className="flex gap-6" id="button-container">
            {currentStep === 1 ? (
              <Button ghostarrow disabled>
                Back
              </Button>
            ) : (
              <Button ghostarrow onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button id="next-step-button" primary onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button
                id="confirm-button"
                type="submit"
                primary
                onClick={async () => {
                  await formik.handleSubmit();
                  navigate("/login");
                }}
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

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleLogin } from "./Auth";

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-container">
        <label htmlFor="email" className="text-black text-base">
          Email
        </label>
        <br />
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Enter Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-10
        placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black relative
        ${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="text-red-500 absolute mt-3 ml-2">
            {formik.errors.email}
          </span>
        ) : null}
        <br />
        <label htmlFor="password" className="text-black">
          Password
        </label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-3
                placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black relative
                ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="text-red-500 absolute  mt-3 ml-2">
            {formik.errors.password}
          </span>
        ) : null}
        <br />
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-3xl w-[28.3rem] h-12 font-bold
                mt-10 mb-10 drop-shadow-[2px_2px_12px_0_rgba(64,50,133,0.16)]"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

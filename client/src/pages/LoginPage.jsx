import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import BeigeVector from "../components/BeigeVector";

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Navbar />
      <main className="bg-main flex justify-center content-center w-full relative">
        <BeigeVector />
        <div className="flex flex-row mt-20 justify-between content-center w-[70rem] mb-20">
          <img src="/images/login-photo.png" alt="Login Photo" className="" />
          <div className="flex flex-col justify-center gap-2 ">
            <p className="text-beige-700 text-sm font-semibold">LOGIN</p>
            <h1 className="text-purple-500 text-[2.875rem] font-extrabold leading-[3.5rem] mb-[2.3rem]">
              Welcome back to <br /> Merry Match
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container">
                <label className="text-black text-base">
                  Username or Email
                </label>
                <br />
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter Username or Email"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-10
                  placeholder-gray-600 focus:outline-none focus:border-purple-600"
                />
                <br />
                <label className="text-black">Password</label>
                <br />
                <input
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-3
                  placeholder-gray-600 focus:outline-none focus:border-purple-600"
                />
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
            <div className="register-text">
              <span className="text-black">Don't have an account?</span>
              <a href="*" className="text-red-500 font-bold ml-2 ">
                Register
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

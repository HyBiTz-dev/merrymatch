import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import BeigeVector from "../components/BeigeVector";
import LoginForm from "../features/auth/LoginForm";
import Toast from "../components/Toast";
import { useAuth } from "../context/authentication";
import { useState, useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginError } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowSuccessToast(true);
      navigate(location.pathname, { replace: true, state: {} });
      const timer = setTimeout(() => setShowSuccessToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  if (loginError) {
    setTimeout(() => {
      setShowToast(!false);
    }, 0);
  }

  return (
    <div className="bg-main w-full h-screen">
      <Navbar unauth />
      <main className="bg-main flex justify-center content-center w-full h-[53.5rem] relative">
        <BeigeVector />
        <div className="flex flex-row mt-20 justify-between content-center w-[70rem] mb-20">
          <img src="/images/login-photo.png" alt="Login Photo" className="" />
          <div className="flex flex-col justify-center gap-2 ">
            <p className="text-beige-700 text-sm font-semibold">LOGIN</p>
            <h1 className="text-purple-500 text-[2.875rem] font-extrabold leading-[3.5rem] mb-[2.3rem]">
              Welcome back to <br /> Merry Match
            </h1>
            <LoginForm />
            <div className="register-text">
              <span className="text-black">Don't have an account?</span>
              <a
                href=""
                className="text-red-500 font-bold ml-2 "
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </a>
            </div>
          </div>
        </div>
        {showSuccessToast && (
          <Toast
            success
            text="Registration complete! Welcome aboard the love train."
          />
        )}
        {showToast && (
          <Toast error text="The email address or password is incorrect." />
        )}
      </main>
    </div>
  );
}

export default LoginPage;

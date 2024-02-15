import Button from "./Button";
import { supabase } from "../lib/helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";

function Navbar({ username }) {
  const navigate = useNavigate();
  const { logout, isAuthenticated , state } = useAuth();
  

  const unauth = () => {
    return (
      <nav className="flex justify-center items-center w-full h-[5.5rem] px-40 gap-[30.5rem] bg-white relative z-50 shadow-nav">
        <div>
          <a href="/">
            <img src="/images/logo.svg" width={167} height={56} alt="logo" />
          </a>
        </div>
        <ul className="flex justify-center items-center ">
          <li className="px-6">
            <a
              href="#why-merry-match"
              className="text-purple-800 text-base font-bold text-nowrap"
            >
              Why Merry Match?
            </a>
          </li>
          <li className="px-6">
            <a
              href="#how-to-merry"
              className="text-purple-800 text-base font-bold text-nowrap"
            >
              How to Merry
            </a>
          </li>
          <li className="px-6">
            <Button
              primary
              onClick={(event) => (window.location.href = "/login")}
            >
              Login
            </Button>
          </li>
        </ul>
      </nav>
    );
  };
  const auth = () => {
    return (
      <nav className="flex justify-center items-center w-full h-[5.5rem] px-40 gap-[30.5rem] bg-white relative z-50 shadow-nav">
        <div>
          <a href="/">
            <img src="/images/logo.svg" width={167} height={56} alt="logo" />
          </a>
        </div>
        <ul className="flex justify-center items-center gap-6">
          <li className="px-6">
            <a
              href="/matching"
              className="text-purple-800 text-base font-bold text-nowrap"
            >
              Start Matching!
            </a>
          </li>
          <li className="px-6">
            <a
              href=""
              className="text-purple-800 text-base font-bold text-nowrap"
            >
              Merry Membership
            </a>
          </li>
          <li className="flex justify-center items-center gap-3">
            <img
              src="/images/bell.svg"
              width={48}
              height={48}
              className="bg-gray-100 rounded-3xl p-3"
            />
            <div className="dropdown dropdown-end">
              <img tabIndex={0} role="button" src="/images/profile.png" />
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white shadow-nav rounded-box w-[12.375rem] mt-4 py-2 px-0 gap-2"
              >
                <li>
                  <a
                    href="/package"
                    className="bg-gradient-to-r from-[#742138] to-[#A878BF] text-body4 text-white rounded-btn px-6 mx-2 "
                  >
                    <img src="/images/more-limit.svg" alt="" />
                    More limit Merry!
                  </a>
                </li>
                <div>
                  <li>
                    <a href={`/update/${state?.id}`} className="text-gray-700">
                      <img src="images/profile.svg" alt="" />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-gray-700">
                      <img src="/images/member-list.svg" alt="" />
                      Merry List
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-gray-700">
                      <img src="/images/membership.svg" alt="" />
                      Merry Membership
                    </a>
                  </li>
                  <li>
                    <a href="" className="text-gray-700 w-full">
                      <img src="/images/compliant.svg" alt="" />
                      Compliant
                    </a>
                  </li>
                </div>
                <li className="border-t">
                  <a onClick={logout} className="text-gray-700">
                    <img src="/images/logout.svg" alt="" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    );
  };
  return isAuthenticated ? auth() : unauth();
}

export default Navbar;

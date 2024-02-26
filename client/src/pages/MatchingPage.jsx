import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Ageslider from "../components/Ageslider";
import MatchingSidebar from "../components/MatchingSidebar";
import SwipeCard from "../components/SwipeCard";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authentication";
import axios from "axios";

function MatchingPage() {
  const { state } = useAuth();
  const [user, setUser] = useState();
  const [defaultChecked, setDefaultChecked] = useState(true);
  const [genderInterest1Checked, setGenderInterest1Checked] = useState(false);
  const [genderInterest2Checked, setGenderInterest2Checked] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [valueAgeSlider, setValueAgeSlider] = useState();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user?userId=${state?.id}`
        );
        setUser(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleReset = () => {
    if (reset) {
      setReset(false);
    } else {
      setReset(true);
    }
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    const data = {
      default: defaultChecked,
      gender_interest_1: genderInterest1Checked,
      gender_interest_2: genderInterest2Checked,
      age_range: valueAgeSlider,
    };
    setSearchData(data);
  };

  const handleValueChange = (value) => {
    setValueAgeSlider(value);
  };

  const handleResetForm = () => {
    setDefaultChecked(true);
    setGenderInterest1Checked(false);
    setGenderInterest2Checked(false);
    setSearchData({});
    setValueAgeSlider([18, 50]);
  };

  return (
    <div className=" bg-main h-screen overflow-hidden">
      <Navbar auth />
      <main className="flex justify-center bg-main h-[91.1%]">
        <MatchingSidebar />
        <div className="bg-bg flex flex-col justify-center gap-16 w-[56.563rem] overflow-hidden">
          <SwipeCard search={searchData} />
        </div>
        <form
          action=""
          className="border-l border-gray-300 w-[13.563rem]"
          onSubmit={(e) => handleSearchButton(e)}
        >
          <div className="h-[42.125rem] flex flex-col gap-14 px-4 pt-9">
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold text-purple-800">
                Search by Keywords
              </p>
              <input
                type="text"
                placeholder="Search..."
                className="input border border-gray-300 w-full focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold text-purple-800">
                Sex you interest
              </p>
              <div className="flex flex-col gap-4">
                <label className="cursor-pointer flex gap-3">
                  <input
                    type="checkbox"
                    name="default"
                    checked={defaultChecked}
                    onChange={(e) => setDefaultChecked(e.target.checked)}
                    className="checkbox border border-gray-400  checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium">Default</span>
                </label>

                <label className="cursor-pointer flex gap-3 checked:text-gray-900">
                  <input
                    type="checkbox"
                    name="gender1"
                    checked={genderInterest1Checked}
                    onChange={(e) =>
                      setGenderInterest1Checked(e.target.checked)
                    }
                    className="checkbox border border-gray-400 checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium ">
                    {user?.gender_interest_name === "Male" ? "Female" : "Male"}
                  </span>
                </label>

                <label className="cursor-pointer flex gap-3">
                  <input
                    type="checkbox"
                    name="gender2"
                    checked={genderInterest2Checked}
                    onChange={(e) =>
                      setGenderInterest2Checked(e.target.checked)
                    }
                    className="checkbox border border-gray-400 checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium">
                    {user?.gender_interest_name === "Non-binary"
                      ? "Female"
                      : "Non-binary people"}
                  </span>
                </label>
              </div>
            </div>
            <Ageslider onChange={handleValueChange} onReset={reset} />
          </div>
          <div className="flex justify-center items-center border-t border-gray-300 gap-4 px-4 py-4">
            <Button
              ghost
              type="reset"
              onClick={() => {
                handleResetForm();
                handleReset();
              }}
            >
              Clear
            </Button>
            <Button primary type="submit">
              Search
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default MatchingPage;

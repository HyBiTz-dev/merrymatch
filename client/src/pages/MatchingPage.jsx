import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Ageslider from "../components/Ageslider";
import MatchingSidebar from "../components/MatchingSidebar";
import SwipeCard from "../components/SwipeCard";

function MatchingPage() {
  return (
    <div className=" bg-main h-screen">
      <Navbar auth />
      <main className="flex justify-center bg-main h-[91.1%]">
        <MatchingSidebar />
        <div className="bg-bg flex flex-col justify-center gap-16 w-[56.563rem] overflow-hidden">
          <SwipeCard />
        </div>
        <div className="border-l border-gray-300 w-[13.563rem]">
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
                    defaultChecked
                    className="checkbox border border-gray-400  checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium">Default</span>
                </label>

                <label className="cursor-pointer flex gap-3 checked:text-gray-900">
                  <input
                    type="checkbox"
                    className="checkbox border border-gray-400 checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium ">Female</span>
                </label>

                <label className="cursor-pointer flex gap-3">
                  <input
                    type="checkbox"
                    className="checkbox border border-gray-400 checked:border-purple-300 [--chkbg:theme(colors.purple.500)] [--chkfg:white]"
                  />
                  <span className="text-base font-medium">
                    Non-bunary people
                  </span>
                </label>
              </div>
            </div>
            <Ageslider />
          </div>
          <div className="flex justify-center items-center border-t border-gray-300 gap-4 px-4 py-4">
            <Button ghost>Clear</Button>
            <Button primary>Search</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MatchingPage;

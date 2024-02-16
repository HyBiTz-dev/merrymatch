import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Ageslider from "../components/Ageslider";
import TinderCard from "react-tinder-card";
import MatchingSidebar from "../components/MatchingSidebar";
import ProfileModal from "../components/Modal/ProfileModal";
import { useState } from "react";

function MatchingPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <div className=" bg-main h-screen">
      <Navbar auth />
      <main className="flex justify-center bg-main h-[91.1%]">
        <MatchingSidebar />
        <div className="bg-bg flex flex-col justify-center items-center gap-16 w-[56.563rem]">
          <div className="">
            <ProfileModal isOpen={showModal} onClose={closeModal} />
            <TinderCard
              onSwipe={onSwipe}
              onCardLeftScreen={() => onCardLeftScreen("fooBar")}
              preventSwipe={["right", "left"]}
            >
              <div className="bg-[url('/images/matching-test.png')] w-[38.75rem] h-[38.75rem]  rounded-[2rem] bg-cover flex flex-col justify-end relative">
                <div className="flex justify-between items-center py-14 pr-8 pl-10 bg-gradient-to-t from-[#390741] to-transparent rounded-b-[2rem]">
                  <div className="flex justify-center items-center gap-4 ">
                    <span className="text-white text-headline3">
                      Danny{" "}
                      <span className="text-gray-400 text-headline3">24</span>
                    </span>
                    <img
                      src="images/eye.svg"
                      className="w-8 h-8 p-2 bg-white bg-opacity-20 shadow-nav rounded-full"
                      alt=""
                      role="button"
                      onClick={openModal}
                    />
                  </div>
                  <div className="flex">
                    <svg
                      className="w-10 fill-gray-100"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                        fill="#9AA1B9"
                      />
                    </svg>
                    <svg
                      className="rotate-180 w-10 fill-gray-100"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                        fill="#9AA1B9"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex absolute -bottom-14 left-[12.75rem]">
                  <img
                    src="/images/cross-button.svg"
                    height={110}
                    width={110}
                    role="button"
                    alt=""
                  />
                  <img
                    src="/images/match-button.svg"
                    height={110}
                    width={110}
                    role="button"
                    alt=""
                  />
                </div>
              </div>
            </TinderCard>
          </div>
          <div className="flex gap-3 py-3 px-6">
            <span className="text-body2 text-gray-700">Merry limit today</span>
            <span className="text-body2 text-red-400">2/20</span>
          </div>
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

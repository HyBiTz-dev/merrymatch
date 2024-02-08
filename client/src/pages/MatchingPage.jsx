import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Ageslider from "../components/Ageslider";
import TinderCard from "react-tinder-card";

function MatchingPage() {
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
        <div className="border-r border-gray-300">
          <div className="border-b border-gray-300 px-4">
            <div className="flex flex-col justify-center items-center w-72 h-44 rounded-2xl bg-gray-100 border border-purple-500 gap-1 my-9 p-6">
              <img src="images/search-match.svg" alt="" />
              <p className="text-headline4 text-red-600">Discover New Match</p>
              <p className="text-body4 text-gray-700 text-center">
                Start find and Merry to get know <br />
                and connect with new friend!
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center py-6 px-4 gap-4">
            <div className="text-headline4 text-gray-900">Merry Match!</div>
            <div className="flex items-center gap-3">
              <img src="/images/test-match.png" alt="" />
              <img src="/images/test-match2.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center py-6 px-4 gap-4">
            <div className="text-headline4 text-gray-900">
              Chat with Merry Match
            </div>
            <div
              className="flex justify-center items-center gap-3 py-4 px-3 cursor-pointer"
              onClick={(event) => (window.location.href = "/chat")}
            >
              <img src="/images/avatar-chat.png" alt="" />
              <div>
                <div className="text-body2 text-gray-900">Ygritte</div>
                <div className="text-body4 text-gray-700">
                  You know nothing Jon Snow
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-bg flex flex-col justify-center items-center gap-16 w-[56.563rem]">
          <div className="">
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
                      onClick={() =>
                        document.getElementById("profile").showModal()
                      }
                    />
                    <dialog id="profile" className="modal">
                      <div className="modal-box w-[71.25rem] max-w-[71.25rem] h-[46.25rem] bg-white">
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                        </div>
                        <div className="flex justify-between items-center ml-10 w-[61.25rem]">
                          <div className="w-[29.875rem] relative">
                            <img
                              src="/images/matching-test.png"
                              className=" rounded-[2rem]"
                              alt=""
                            />
                            <div className="flex justify-between items-center">
                              <p className="text-body2 py-3 px-6 ">1/2</p>
                              <div className="flex">
                                <svg
                                  className="w-12 fill-gray-600"
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
                                  className="rotate-180 w-12 fill-gray-600"
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
                            <div className="flex absolute bottom-1 left-40">
                              <img
                                src="/images/cross-button.svg"
                                role="button"
                                alt=""
                              />
                              <img
                                src="/images/match-button.svg"
                                role="button"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-10 pt-6 pl-14 w-[29.875rem]">
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-4">
                                <span className="text-headline2 text-gray-900">
                                  Daeny
                                </span>
                                <span className="text-headline2 text-gray-700">
                                  24
                                </span>
                              </div>
                              <div className="flex gap-4">
                                <img src="/images/pin.svg" alt="" />
                                <p className="text-body1 text-gray-700">
                                  Bangkok, Thailand
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center py-2">
                                <span className="text-body2 text-gray-900 w-48">
                                  Sexual identities
                                </span>
                                <span className="text-body1 text-gray-700">
                                  Female
                                </span>
                              </div>
                              <div className="flex items-center py-2">
                                <span className="text-body2 text-gray-900 w-48">
                                  Sexual preferences
                                </span>
                                <span className="text-body1 text-gray-700">
                                  Male
                                </span>
                              </div>
                              <div className="flex items-center py-2">
                                <span className="text-body2 text-gray-900 w-48">
                                  Racial preferences
                                </span>
                                <span className="text-body1 text-gray-700">
                                  Indefinite
                                </span>
                              </div>
                              <div className="flex items-center py-2">
                                <span className="text-body2 text-gray-900 w-48">
                                  Meeting interests
                                </span>
                                <span className="text-body1 text-gray-700">
                                  Long-term commitment
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-4">
                              <span className="text-headline4 text-gray-900">
                                About me
                              </span>
                              <span className="text-body2 text-gray-900">
                                I know nothing..but you
                              </span>
                            </div>
                            <div className="flex flex-col gap-6">
                              <span className="text-headline4 text-gray-900">
                                Hobbies and Interests
                              </span>
                              <div className="flex gap-3 flex-wrap">
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  dragon
                                </span>
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  romantic relationship
                                </span>
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  political
                                </span>
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  black hair
                                </span>
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  friendly
                                </span>
                                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                                  fire
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </dialog>
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

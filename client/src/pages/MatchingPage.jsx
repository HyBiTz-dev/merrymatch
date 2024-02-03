import Navbar from "../components/Navbar";

function MatchingPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Navbar />
        <div className="flex w-[90rem] h-[58.5rem] bg-white text-gray-700">
          <div className="flex flex-col w-[19.75rem]">
            <div className="flex justify-center items-center w-full h-[16.188rem]">
              <div className="flex flex-col items-center w-[17.625rem] h-[11.688rem] p-[1.5rem] pt-[2.25rem] pl-[1.063rem] border-purple-500 border-[0.063rem] rounded-2xl bg-gray-100">
                <img
                  src="images\discover-match.png"
                  className="self-center w-[3.833rem] h-[3.688rem]"
                />
                <h4 className="font-bold text-[1.5rem] text-red-600">
                  Discover New Match
                </h4>
                <p className="font-medium text-center text-[0.875rem] leading-[1.313rem]">
                  Start find and Merry to get know and connect with new friend!
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full h-[12.125rem] px-0 py-[1.5rem] bg-lime-400">
              <h4 className="font-bold text-2xl leading-[1.875rem] text-gray-900">
                Merry Match!
              </h4>
              <div className="flex flex-grow bg-slate-400"></div>
            </div>
            <div className="flex w-full h-[34.625rem] bg-blue-300">
              chat history
            </div>
          </div>

          <div className="flex w-[56.563rem] bg-slate-600">people profile</div>

          <div className="flex flex-col w-[13.75rem] ">
            <div className="flex flex-col w-full h-[42.125rem] ">
              <div className="flex w-full h-[5.5rem] bg-violet-300">
                search by keyword
              </div>
              <div className="flex w-full h-[9rem] bg-orange-600">
                sex you interested
              </div>
              <div className="flex flex-col w-full h-[7.625rem] bg-zinc-300">
                age range
              </div>
            </div>
            <div className="flex w-full h-[5rem] bg-red-300">
              clear/search button
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchingPage;

import Button from "./Button";
import Tooltip from "./Tooltip";

function MerryCard() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[62.5rem] h-[15.625rem] bg-main flex items-center justify-around border-b-2 border-gray-300">
        <div className="flex gap-10">
          <div className="relative h-fit">
            <img
              src="/images/matching-test.png"
              className="w-[200px] h-[200px] rounded-3xl"
            ></img>
            <p className="absolute bottom-0 left-0 bg-purple-100 text-purple-600 rounded-bl-3xl rounded-tr-3xl text-body5 w-20 text-center">
              Merry today
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h4 className="text-headline4 inline text-gray-900">Daeny</h4>
              <h4 className="text-headline4 inline text-gray-700">24</h4>
              <img src="/images/pin.svg" className="inline w-[4%] ml-2"></img>
              <p className="text-body4 inline text-gray-700">
                Bangkok, Thailand
              </p>
            </div>
            <div className="grid  grid-cols-[170px_minmax(160px,_1fr)_80px] gap-3">
              <span className="text-body2 text-gray-900  ">
                Sexual identities
              </span>
              <span className="text-body2 text-gray-700 ">Female</span>
              <br />
              <span className="text-body2 text-gray-900 ">
                Sexual preferences
              </span>
              <span className="text-body2 text-gray-700 ">Male</span>
              <br />
              <span className="text-body2 text-gray-900 ">
                Racial preferences
              </span>
              <span className="text-body2 text-gray-700 ">Indefinite</span>
              <br />
              <span className="text-body2 text-gray-900 ">
                Meeting interests
              </span>
              <span className="text-body2 text-gray-700 ">
                Long-term commitment
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="w-40 h-8 relative border-red-500 border-2 rounded-full">
            <img
              src="/images/merry-match.svg"
              className="absolute top-2 left-3"
            ></img>
            <p className="text-body3 text-red-500 text-center font-extrabold ml-5 mt-0.5">
              Merry Match!
            </p>
          </div>
          {/* <div className="w-40 h-8 relative border-gray-500 border-2 rounded-full">
            <p className="text-body3 text-gray-700 text-center font-extrabold mt-0.5">
              Not Match Yet
            </p>
          </div> */}
          <div className="flex gap-4">
            <Tooltip gray text="Go to chat" img="/images/chat.svg" />
            <Tooltip gray text="See profile" img="/images/Frame.svg" />
            <Tooltip
              red
              text="Merry"
              img="/images/merry-white.svg"
              imgHover="/images/merry-red.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerryCard;

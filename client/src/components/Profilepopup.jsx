function Profilepopup() {
  return (
    <div className="flex overflow-auto flex-col w-[71.25rem] h-[46.25rem] rounded-[2rem] gap-[0.01944rem] bg-main">
      <div className="flex justify-end items-center h-[4.04306rem] ">
        <img
          src="\images\close-button.svg"
          className="w-[4.125rem] h-[4.04306rem]"
        />
      </div>
      <div className="flex grow flex-row">
        <div className="relative flex grow justify-center ">
          <div className="">
            <img
              src="\images\dany-photo.png"
              className="w-[29.875rem] h-[29.875rem] rounded-[2rem]"
            />
          </div>
          <div className="flex absolute items-center justify-center bottom-[10.5rem] left-[15rem] w-[3.75rem] h-[3.75rem] rounded-[1rem] shadow-[2px_2px_12px_0_rgba(64,50,133,0.12)] bg-main">
            <img src="\images\Frame.svg" className="w-[2.5rem] h-[2.5rem]" />
          </div>
          <div className="flex absolute items-center justify-center bottom-[10.5rem] right-[15rem] w-[3.75rem] h-[3.75rem] rounded-[1rem] shadow-[2px_2px_12px_0_rgba(64,50,133,0.12)] bg-main">
            <img src="/images/merry.svg" className="w-[2.5rem] h-[2.5rem]" />
          </div>
          <div className="flex absolute z-0 items-center justify-center bottom-[9.5rem] right-[8rem] w-[2.5rem] h-[2.5rem] rounded-[1rem] bg-main">
            <img
              src="\images\arrow-left.svg"
              className="w-[2.5rem] h-[2.5rem]"
            />
          </div>
          <div className="flex absolute z-0 items-center justify-center bottom-[9.5rem] right-[5rem] w-[2.5rem] h-[2.5rem] rounded-[1rem] bg-main">
            <img
              src="\images\arrow-right.svg"
              className="w-[2.5rem] h-[2.5rem]"
            />
          </div>
          <div className="flex absolute items-center justify-center  bottom-[9.5rem] left-[5rem] w-[2.5rem] h-[2.5rem] rounded-[1rem] bg-main">
            1/2
          </div>
        </div>

        <div className="flex flex-col grow space-y-10 pt-6 text-[1rem] text-gray-900 ">
          <div>
            <div className="flex gap-4">
              <p className="text-[2.875rem] font-extrabold">Daeny</p>
              <p className="text-[2.875rem] text-gray-700 font-extrabold">24</p>
            </div>
            <div className="flex items-center gap-4 space-y-2">
              <img
                src="\images\location-icon.svg"
                className="w-[1.5rem] h-[1.5rem]"
              />
              <p className="text-xl text-gray-700 font-semibold">
                Bangkok, Thailand
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex ">
              <p className="w-[11.9375rem]">Sexual identities</p>
              <p className="text-gray-700 font-semibold">Female</p>
            </div>
            <div className="flex">
              <p className="w-[11.9375rem]">Sexual preferences</p>
              <p className="text-gray-700 font-semibold">Male</p>
            </div>
            <div className="flex">
              <p className="w-[11.9375rem]">Racial preferences</p>
              <p className="text-gray-700 font-semibold">Indefinite</p>
            </div>
            <div className="flex">
              <p className="w-[11.9375rem]">Meeting interests</p>
              <p className="text-gray-700 font-semibold">
                Long-term commitment
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-bold">About me</p>
            <p>I know nothing...but you</p>
          </div>

          <div className="space-y-6">
            <p className="text-2xl font-bold">Hobbies and Interests</p>
            <div>tags</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilepopup;

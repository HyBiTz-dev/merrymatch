function SideBarAdmin() {
  return (
    <div className="flex h-screen w-[15rem] border-r border-r-gray-400 flex-col">
      <div className="">
        <div className="mx-6 my-6 flex flex-col items-center">
          <img
            src="/images/logo(merry-match-admin).svg"
            alt="merry match logo"
            className=""
          />
          <span className="text-base text-gray-700">Admin Panel Control</span>
        </div>
        <div className="h-[34rem] my-10 text-base font-extrabold text-gray-800">
          <div className=" hover:bg-gray-100 active:bg-gray-200">
            <div className="flex mx-6 py-6">
              <img src="/images/package.svg" alt="" className="pr-4" />
              <span>Merry Package</span>
            </div>
          </div>
          <div className=" hover:bg-gray-100 active:bg-gray-200">
            <div className="flex mx-6 py-6 ">
              <img src="/images/complaint.svg" alt="" className="pr-4" />
              <span>Complaint</span>
            </div>
          </div>
        </div>
        <div className="border-t border-t-gray-300 text-base font-extrabold text-gray-800">
          <div className=" hover:bg-gray-100 active:bg-gray-200">
            <div className="flex mx-6 py-6 ">
              <img src="/images/logout-admin.svg" alt="" className="pr-4" />
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;

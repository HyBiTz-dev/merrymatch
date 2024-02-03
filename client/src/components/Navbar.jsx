function Navbar() {
  return (
    <nav className="flex justify-center items-center w-full h-20 pr-40 pl-40 gap-[30.5rem] bg-main">
      <div>
        <img src="/images/logo.svg" width={167} height={56} alt="logo" />
      </div>
      <ul className="flex justify-center items-center">
        <li className="px-6">
          <a href="" className="text-blue-800 font-bold">
            Why Merry Match?
          </a>
        </li>
        <li className="px-6">
          <a href="" className="text-blue-800 font-bold">
            How to Merry
          </a>
        </li>
        <li className="px-6">
          <button className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-3xl w-24 h-12">
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

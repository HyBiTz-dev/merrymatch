import Button from "./Button";

function Navbar() {
  return (
    <nav className="flex justify-center items-center w-full h-[5.5rem] px-40 gap-[30.5rem] bg-main relative z-50 shadow-nav">
      <div>
        <a href="/">
          <img src="/images/logo.svg" width={167} height={56} alt="logo" />
        </a>
      </div>
      <ul className="flex justify-center items-center">
        <li className="px-6">
          <a
            href="#why-merry-match"
            className="text-blue-800 text-base font-bold"
          >
            Why Merry Match?
          </a>
        </li>
        <li className="px-6">
          <a href="#how-to-merry" className="text-blue-800 text-base font-bold">
            How to Merry
          </a>
        </li>
        <li className="px-6">
          <Button primary>Login</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

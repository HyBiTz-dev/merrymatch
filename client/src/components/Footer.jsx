function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center w-full h-96 pr-40 pl-40 pt-12 pb-12 bg-main">
      <div className="flex flex-col items-center">
        <img src="images/logo.svg" width={240} height={80} alt="logo" />
        <div className="text-gray-700 text-lg font-semibold">
          New generation of online dating website for everyone
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 pt-6 border-t-2 w-full ">
        <div className="text-gray-600 text-sm font-medium">
          copyright ©2022 merrymatch.com All rights reserved
        </div>
        <div className="flex gap-4">
          <img
            src="images/facebook-circle-fill.svg"
            width={48}
            height={48}
            className="bg-purple-500 rounded-3xl p-3"
          />
          <img
            src="images/instagram-fill.svg"
            width={48}
            height={48}
            className="bg-purple-500 rounded-3xl p-3"
          />
          <img
            src="images/twitter-fill.svg"
            width={48}
            height={48}
            className="bg-purple-500 rounded-3xl p-3"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

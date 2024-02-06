import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FilingComplaintPage() {
  return (
    <div>
      <Navbar auth />
      <main className="bg-main flex justify-center content-center w-full h-[53.5rem]">
        <div className="flex flex-row mt-20 justify-between content-center w-[70rem] mb-20">
          <div className="flex flex-col justify-center gap-2">
            <p className="text-beige-700 text-sm font-semibold">COMPLAINT</p>
            <h1 className="text-purple-500 text-[2.875rem] font-extrabold leading-[3.5rem] mb-[2.3rem]">
              If you have any trouble <br /> Don't be afraid to tell us!
            </h1>
            <label htmlFor="issue" className="text-black text-base">
              Issue
            </label>
            <input
              id="issue"
              type="text"
              name="issue"
              placeholder="Placeholder"
              className={`bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] mb-10 
              placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black`}
            />
            <label htmlFor="description" className="text-black text-base">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Placeholder"
              className={`inline-block bg-white border-solid border-[1px] rounded-lg border-gray-400 p-3 w-[28.3rem] h-[14rem] mb-10 
                placeholder-gray-600 focus:outline-none focus:border-purple-600 text-black`}
            ></textarea>
            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white 
              border-none rounded-3xl w-[6.375rem] h-12 font-bold
              mt-10 mb-10 drop-shadow-[2px_2px_12px_0_rgba(64,50,133,0.16)]"
            >
              Submit
            </button>
          </div>
          <img src="/images/login-photo.png" alt="Login Photo" className="" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FilingComplaintPage;

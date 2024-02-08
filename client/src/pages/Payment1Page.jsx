import Navbar from "../components/Navbar";

export default function Payment1Page() {
  return (
    <>
      <Navbar auth />
      <div className="payment1-page flex justify-center bg-[#FCFCFE]">
        <section className="payment1-section bg-green-200 flex flex-col items-center w-[90rem] h-[58.5rem] top-[5.5rem]">
          <h1 className="text-[24px] bg-slate-300">Hello Payment 1 page</h1>
          <div className="payment1-container flex bg-fuchsia-300 w-[58rem] h-[34.625rem] mt-[5rem] left-[16rem] gap-[1.375rem]">
            <div className="payment1-package-box flex flex-col bg-[#F6F7FC] w-[22.375rem] h-[14rem] rounded-[1.5rem] border-[0.063rem] border-[#D6D9E4] py-[2rem] px-[1.5rem] gap-[1.5rem]"></div>
          </div>
        </section>
      </div>
    </>
  );
}

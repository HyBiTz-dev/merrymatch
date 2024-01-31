function PackageCard() {
  return (
    <div className="package-card flex flex-col w-[22.3125rem] h-auto p-10 items-start gap-6 rounded-[2rem] border-[1px] border-solid border-gray-400 bg-white">
      <img
        className="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"
        src="../../public/images/basic.svg"
      ></img>
      <div className="package-title flex flex-col items-start gap-[0.5rem] self-stretch">
        <h3 className="package-name text-headline3 w-full h-auto text-[2rem] font-[700] leading-10 tracking-[-0.02rem] text-purple-800">
          Basic
        </h3>
        <div className="package-price-per-date flex items-baseline gap-[0.375rem] self-stretch">
          <p className="package-price text-body1 text-gray-900 text-xl font-[600] leading-[1.875rem] ">
            THB 99.00
          </p>
          <p className="package-per-date text-body2 text-gray-600 text-base font-[400] leading-6">
            /Month
          </p>
        </div>
      </div>
      <div className="package-details flex flex-col items-start pb-9 gap-4 self-stretch border-b-[1px] border-solid border-gray-300">
        <div className="package-feature flex items-start gap-3 self-stertch">
          <img
            className="package-circle-checkbox w-6 h-6"
            src="../../public/images/checkbox-circle-fill.svg"
          ></img>
          <p className="details-text text-gray-800 text-base font-[400] leading-[1.5rem]">
            ‘Merry’ more than a daily limited
          </p>
        </div>
        <div className="package-feature flex items-start gap-3 self-stertch">
          <img
            className="package-circle-checkbox w-6 h-6"
            src="../../public/images/checkbox-circle-fill.svg"
          ></img>
          <p className="details-text text-gray-800 text-base font-[400] leading-[1.5rem]">
            Up to 25 Merry per day
          </p>
        </div>
      </div>
      <button className="btn flex px-6 py-3 justify-center items-center gap-[0.5rem] self-stretch rounded-[6.1875rem] bg-red-100 shadow-[2px_2px_12px_0_rgba(64,50,133,0.08)] text-red-600 text-center text-base font-[700] leading-6 ">
        Choose Package
      </button>
    </div>
  );
}

export default PackageCard;

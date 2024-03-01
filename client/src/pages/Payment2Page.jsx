import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

export default function Payment2Page() {
  const navigate = useNavigate();
  const location = useLocation();

  const statePackage = location.state;

  const cardId = statePackage.data.product.id;
  const cardIcon = statePackage.data.product.icon;
  const cardName = statePackage.data.product.name;
  const cardPrice = statePackage.data.product.price;
  const cardPriceShow = statePackage.data.product.priceShow;
  const cardPerDate = statePackage.data.product.perdate;
  const cardDetails = statePackage.data.product.details;
  const dateStart = new Date(statePackage.date);
  let year = dateStart.getFullYear();
  let monthStart = dateStart.getMonth() + 1;
  let monthEnd = monthStart + 1;
  let day = dateStart.getDate();
  if (monthStart < 10) {
    monthStart = "0" + monthStart;
  }
  if (monthEnd < 10) {
    monthEnd = "0" + monthEnd;
  }
  let stringDateStart = `${day}/${monthStart}/${year}`;
  let stringDateEnd = `${day}/${monthEnd}/${year}`;

  const handleBackToHome = () => {
    navigate("/");
  };
  const handleGoMembership = () => {
    navigate("/merry-membership");
  };

  return (
    <>
      <Navbar auth />
      <section className="payment2-section w-[90rem] h-[58.5rem] t-[5.5rem] bg-[#FCFCFE] flex">
        <section className="payment2-header-container bg-[#FCFCFE] w-[40.063rem] h-[24.563rem] mt-[7.375rem] ml-[10.188rem] flex flex-col gap-[5rem]">
          <div className="payment2-header-top w-[40.063rem] h-[16.563rem] flex flex-col gap-[2.5rem]">
            <div className="icon-success w-[5rem] h-[5rem] flex justify-center items-center">
              <img
                alt="icon-success"
                src="/images/checkbox-circle-fill-light.svg"
                className="w-[5rem] h-[5rem] "
              ></img>
            </div>
            <div className="header-details w-[40.063rem] h-[9.063rem] flex flex-col gap-[0.5rem]">
              <p className="w-[40.063rem] h-[1.313rem] text-beige-700 text-tag">
                AYMENT SUCCESS
              </p>
              <p className="w-[40.063] h-[7.25rem] text-headline2 text-purple-500">
                Welcom Merry Membership! Thank you for joining us
              </p>
            </div>
          </div>
          <div className="payment2-header-foot w-[22.75rem] h-[3rem] flex gap-[1.5rem]">
            <Button secondary onClick={handleBackToHome}>
              Back to home{" "}
            </Button>
            <Button primary onClick={handleGoMembership}>
              Check Membership
            </Button>
          </div>
        </section>
        <section className="package-card flex flex-col w-[22.3125rem] h-[28.375rem] mt-[5.5rem] ml-[7.125rem] p-10 items-start gap-6 rounded-[2rem] border-[1px] border-solid border-gray-400 bg-gradient-to-r from-[#742138] to-[#A878BF]">
          <img
            className="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"
            src={cardIcon}
          ></img>
          <div className="package-title flex flex-col items-start gap-[0.5rem] self-stretch">
            <h3 className="package-name text-headline3 w-full h-auto text-[2rem] font-[700] leading-10 tracking-[-0.02rem] text-white">
              {cardName}
            </h3>
            <div className="package-price-per-date flex items-baseline gap-[0.375rem] self-stretch">
              <p className="package-price text-body1 text-purple-100 text-xl font-[600] leading-[1.875rem] ">
                THB {cardPriceShow}
              </p>
              <p className="package-per-date text-body2 text-purple-100 text-base font-[400] leading-6">
                /{cardPerDate}
              </p>
            </div>
          </div>
          <div className="package-details flex flex-col items-start pb-9 gap-4 self-stretch border-b-[1px] border-solid border-gray-300">
            {cardDetails.map((items, index) => {
              return (
                <div
                  key={index}
                  className="package-feature flex items-start gap-3 self-strech"
                >
                  <img
                    className="package-circle-checkbox w-6 h-6"
                    src="../../public/images/checkbox-circle-fill.svg"
                  ></img>
                  <p className="details-text text-purple-100 text-base font-[400] leading-[1.5rem]">
                    {items}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="package-show-start-end flex flex-col w-[17.313rem] h-[4rem]">
            <div className="package-start-date w-[17.313rem] h-[2rem] flex justify-between py-[0.25rem]">
              <p className="text-body2 text-[#EFC4E2]">Start Membership</p>
              <p className="text-body2 text-[#FFFFFF]">{stringDateStart}</p>
            </div>
            <div className="package-end-date w-[17.313rem] h-[2rem] flex justify-between py-[0.25rem]">
              <p className="text-body2 text-[#EFC4E2]">Next billing</p>
              <p className="text-body2 text-[#FFFFFF]">{stringDateEnd}</p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

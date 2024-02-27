import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Payment2Page() {
  const navigate = useNavigate();
  const location = useLocation();

  const statePackage = location.state;
  console.log(statePackage);
  const cardId = statePackage.data.product.id;
  const cardIcon = statePackage.data.product.icon;
  const cardName = statePackage.data.product.name;
  const cardPrice = statePackage.data.product.price;
  const cardPerDate = statePackage.data.product.perdate;
  const cardDetails = statePackage.data.product.details;

  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar auth />
      <div>Hello</div>
      <div className="package-card flex flex-col w-[22.3125rem] h-auto p-10 items-start gap-6 rounded-[2rem] border-[1px] border-solid border-gray-400 bg-white">
        <img
          className="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"
          src={cardIcon}
        ></img>
        <div className="package-title flex flex-col items-start gap-[0.5rem] self-stretch">
          <h3 className="package-name text-headline3 w-full h-auto text-[2rem] font-[700] leading-10 tracking-[-0.02rem] text-purple-800">
            {cardName}
          </h3>
          <div className="package-price-per-date flex items-baseline gap-[0.375rem] self-stretch">
            <p className="package-price text-body1 text-gray-900 text-xl font-[600] leading-[1.875rem] ">
              THB {cardPrice}
            </p>
            <p className="package-per-date text-body2 text-gray-600 text-base font-[400] leading-6">
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
                <p className="details-text text-gray-800 text-base font-[400] leading-[1.5rem]">
                  {items}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Button secondary onClick={handleBackToHome}>
        Back to home{" "}
      </Button>
      <Button primary>Check Membership</Button>
    </>
  );
}

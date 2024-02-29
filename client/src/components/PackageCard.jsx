import Button from "./Button";
import { userPackageData } from "../pages/Packagespage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function PackageCard() {
  const navigate = useNavigate();
  const context = useContext(userPackageData);
  const [packageId, setpackageId] = useState([]);
  let cardKey = context.package.package_num;
  let package_id = context.package.package_id;
  let cardIcon = context.package.icon;
  let cardName = context.package.name;
  let cardPrice = context.package.price;
  let cardPerDate = context.package.perDate;
  let cardDetails = context.package.details;

  if (Array.isArray(package_id)) {
    package_id.map((item) => {
      packageId.push(item);
    });
  }

  return (
    <>
      {cardIcon ? (
        cardKey.map((item, index) => {
          return (
            <div
              key={cardKey[index]}
              className="package-card flex flex-col w-[22.3125rem] h-auto p-10 items-start gap-6 rounded-[2rem] border-[1px] border-solid border-gray-400 bg-white"
            >
              <img
                className="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"
                src={cardIcon[index]}
              ></img>
              <div className="package-title flex flex-col items-start gap-[0.5rem] self-stretch">
                <h3 className="package-name text-headline3 w-full h-auto text-[2rem] font-[700] leading-10 tracking-[-0.02rem] text-purple-800">
                  {cardName[index]}
                </h3>
                <div className="package-price-per-date flex items-baseline gap-[0.375rem] self-stretch">
                  <p className="package-price text-body1 text-gray-900 text-xl font-[600] leading-[1.875rem] ">
                    THB {cardPrice[index]}
                  </p>
                  <p className="package-per-date text-body2 text-gray-600 text-base font-[400] leading-6">
                    /{cardPerDate[index]}
                  </p>
                </div>
              </div>
              <div className="package-details flex flex-col items-start pb-9 gap-4 self-stretch border-b-[1px] border-solid border-gray-300">
                {cardDetails[index].map((items, index) => {
                  return (
                    <div
                      key={index}
                      className="package-feature flex items-start gap-3 self-strech"
                    >
                      <img
                        className="package-circle-checkbox w-6 h-6"
                        src="/public/images/checkbox-circle-fill.svg"
                      ></img>
                      <p className="details-text text-gray-800 text-base font-[400] leading-[1.5rem]">
                        {items}
                      </p>
                    </div>
                  );
                })}
              </div>
              <Button
                secondary
                className="w-full"
                onClick={() => {
                  console.log(packageId[index]);
                  navigate("/payment1", {
                    state: {
                      package_id: packageId[index],
                      package_name: cardName[index],
                      package_price: cardPrice[index],
                      package_icon: cardIcon[index],
                      package_details: cardDetails[index],
                      package_perdate: cardPerDate[index],
                    },
                  });
                }}
              >
                Choose Package
              </Button>
            </div>
          );
        })
      ) : (
        <div>no icon to render</div>
      )}
    </>
  );
}

export default PackageCard;

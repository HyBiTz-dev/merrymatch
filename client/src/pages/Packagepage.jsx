import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PackageCard from "../components/PackageCard";

export default function PackagePage() {
  let iconPackage = [
    "../../public/images/basic.svg",
    "../../public/images/platinum.svg",
    "../../public/images/premium.svg",
  ];
  let namePackage = ["Basic", "Platinum", "Premium"];

  let pricePackage = ["59.00", "99", "149.00"];
  let perDatePackage = ["month", "month", "month"];
  let detailPackage = [
    ["‘Merry’ more than a daily limited", "Up to 25 Merry per day"],
    ["‘Merry’ more than a daily limited", "Up to 45 Merry per day"],
    ["‘Merry’ more than a daily limited", "Up to 70 Merry per day"],
  ];
  return (
    <>
      <Navbar auth />
      <section className="package-section bg-white flex flex-col h-[56.4375rem] justify-center items-center pt-[5rem] pr-[10.0625rem] pb-[10rem] pl-[10rem]">
        <div className="package-container flex flex-col items-start gap-[5rem]">
          <section className="package-header flex flex-col items-start gap-[0.5rem] self-stretch">
            <p className=" w-full h-auto text-body4 text-beige-700 text-sm font-[600]">
              MERRY MEMBERSHIP
            </p>
            <h2 className=" w-full h-auto text-headline2 text-purple-500 text-[2.875rem] font-[800]">
              Be part of Merry Membership <br />
              to make more Merry!
            </h2>
          </section>

          <section className="package-wrapper w-auto h-auto flex items-start gap-6 mt-20">
            {iconPackage.map((items, index) => {
              return (
                <PackageCard
                  key={index}
                  icon={items}
                  name={namePackage[index]}
                  price={pricePackage[index]}
                  perDate={perDatePackage[index]}
                  details={[...detailPackage[index]]}
                />
              );
            })}
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}

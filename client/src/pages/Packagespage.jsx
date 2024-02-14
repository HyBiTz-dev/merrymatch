import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PackageCard from "../components/PackageCard";
import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const userPackageData = React.createContext();

export default function PackagePage() {
  const [allPackages, setAllPackages] = useState({});
  const [packagesName, setPackagesName] = useState([]);
  const [packagesPrice, setPackagesPrice] = useState([]);
  const [packagesPerdate, setPackagesPerdate] = useState([]);
  const [packagesdetails, setPackagesdetails] = useState([]);
  const test = async () => {
    try {
      let { data, error } = await supabase.from("packages").select("*");
      console.log(data);
      let newArrray = [...data];
      let newObject = {
        icon: [],
        name: [],
        price: [],
        perDate: [],
        details: [],
      };
      newArrray.map((items, index) => {
        newObject.icon.push(items.package_icon);
        newObject.name.push(items.name);
        newObject.price.push(items.price);
        newObject.details.push(items.details);
        newObject.perDate[index] = "mouth";
      });
      setAllPackages(newObject);
    } catch (error) {
      console.log(error);
    }
  };

  // const getPackage = async () => {
  //   try {
  //     let response = await axios.get("http://localhost:3000/packages");
  //     let result = response.data;
  //     console.log(result);
  //     setPackage(result);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    test();
  }, []);

  console.log(allPackages);
  let iconPackage = [
    "../../public/images/basic.svg",
    "../../public/images/platinum.svg",
    "../../public/images/premium.svg",
  ];
  let namePackages = ["Basic", "Platinum", "Premium"];
  let pricePackages = ["59.00", "99", "149.00"];
  let perDatePackages = ["month", "month", "month"];
  let detailPackages = [
    ["‘Merry’ more than a daily limited", "Up to 25 Merry per day"],
    ["‘Merry’ more than a daily limited", "Up to 45 Merry per day"],
    ["‘Merry’ more than a daily limited", "Up to 70 Merry per day"],
  ];

  let packageData = {
    icon: iconPackage,
    name: namePackages,
    price: pricePackages,
    perDate: perDatePackages,
    details: detailPackages,
  };

  return (
    <>
      <Navbar auth />
      <section className="package-section bg-white flex flex-col h-[56.4375rem] justify-center items-center pt-[5rem] pr-[10.0625rem] pb-[10rem] pl-[10rem]">
        <userPackageData.Provider value={{ package: allPackages }}>
          {allPackages ? (
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
                <PackageCard />
              </section>
            </div>
          ) : (
            <div>no data to render</div>
          )}
        </userPackageData.Provider>
      </section>
      <Footer />
    </>
  );
}

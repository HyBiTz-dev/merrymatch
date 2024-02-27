import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PackageCard from "../components/PackageCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const userPackageData = React.createContext();

export default function PackagePage() {
  const [allPackages, setAllPackages] = useState({});
  const getDataPackages = async () => {
    try {
      let { data, error } = await supabase
        .from("packages")
        .select("*")
        .limit(3);

      let newArrray = [...data];
      let newObject = {
        package_num: [],
        package_id: [],
        icon: [],
        name: [],
        price: [],
        perDate: [],
        details: [],
      };
      newArrray.map((items, index) => {
        newObject.package_num.push(index + 1);
        newObject.package_id.push(items.id);
        newObject.icon.push(items.package_icon);
        newObject.name.push(items.name);
        newObject.price.push(parseFloat(items.price).toFixed(2));
        newObject.details.push(items.details);
        newObject.perDate[index] = "Mouth";
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
    getDataPackages();
  }, []);

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

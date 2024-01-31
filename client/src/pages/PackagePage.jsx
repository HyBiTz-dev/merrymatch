import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PackagePage() {
  return (
    <>
      <Navbar />
      <div class="bg-green-100 flex flex-col h-[56.4375rem] justify-center items-center pt-[5rem] pr-[10.0625rem] pb-[10rem] pl-[10rem]">
        <p class="bg-red-200 w-full h-auto text-body4 text-beige-700 text-sm font-[600]">
          MERRY MEMBERSHIP
        </p>
        <h2 class="bg-gray-500 w-full h-auto text-headline2 text-purple-500 text-[2.875rem] font-[800]">
          Be part of Merry Membership <br />
          to make more Merry!
        </h2>
        <section class="package-wrapper bg-orange-400 w-auto h-auto flex items-start gap-6">
          <div class="package-card flex flex-col w-[22.3125rem] h-auto p-10 items-start gap-6 rounded-[2rem] border-[1px] border-solid border-gray-400 bg-white">
            <i class="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"></i>
            <h3 class="package-name text-headline3 text-[2rem] font-[700] leading-10 tracking-[-0.02rem]">
              Basic
            </h3>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

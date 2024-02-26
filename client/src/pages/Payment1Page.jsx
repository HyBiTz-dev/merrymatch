import Navbar from "../components/Navbar";
import package_cube from "../../public/images/package_cube.svg";
import visa from "../../public/images/visa.svg";
import master_card from "../../public/images/master_card.svg";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication";

export default function Payment1Page() {
  const { state } = useAuth();
  console.log(state);
  const userId = state.id;
  const userEmail = state.email;
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState("");
  const location = useLocation();

  const statePackage = location.state;
  console.log(statePackage);
  const package_id = statePackage.package_id;
  const package_name = statePackage.package_name;
  const package_price_show = statePackage.package_price;
  const package_price = statePackage.package_price
    .toString()
    .replaceAll(".", "");

  const eventHandleCancle = () => {
    navigate(-1);
  };
  const evenetHandleConfirm = async () => {
    console.log("try to send payment to server");
    let data = {
      user: {
        id: userId,
        name: "Latte",
        email: userEmail,
      },
      product: {
        name: package_name,
        price: package_price,
      },
    };
    //let result = await axios.post(`http://localhost:3000/payment1`, "test");
    let result = await axios.post(
      `http://localhost:3000/payment1/create-payment1`,
      data
    );
    console.log(result.data.status);
    if (result.data === "succeeded") {
      //done
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <Navbar auth />
      <div className="payment1-page flex justify-center bg-[#FCFCFE]">
        <section className="payment1-section bg-[#FCFCFE] flex flex-col items-center w-[90rem] h-[58.5rem] top-[5.5rem]">
          <div className="payment1-container flex bg-[#FCFCFE] w-[58rem] h-[34.625rem] mt-[5rem] left-[16rem] gap-[1.375rem]">
            <div className="payment1-package-box flex flex-col items-center w-[22.375rem] h-[14rem] rounded-[1.5rem] border-[0.063rem] border-gray-400 bg-gray-100 py-[2rem] px-[1.5rem] gap-[1.5rem]">
              <div className="package-box-header flex w-[19.375rem] h-[1.875] gap-[0.75rem]">
                <img src={package_cube} alt="package_cube_icon"></img>
                <div className="text-body1 text-gray-700">Merry Membership</div>
              </div>
              <div className="package-box-details flex flex-col w-[19.375rem] h-[7.875rem]">
                <div className="package-box-details-subtitle w-full h-[3rem] flex justify-between py-[0.75rem] ">
                  <span className="text-body2 text-gray-700 w-[10.438rem] h-[1.5rem]">
                    Package
                  </span>
                  <span className="text-body2 text-gray-700 w-[10.25rem] h-[1.5rem] text-right">
                    Price (Mountly)
                  </span>
                </div>
                <div className="package-box-details-package w-full h-[4.875rem] py-[1.5rem] flex justify-between">
                  <span className="text-body1 text-gray-900 w-[10.438rem] h-[1.875rem]">
                    {package_name}
                  </span>
                  <span className="text-body1 text-gray-900 w-[10.438rem] h-[1.875rem] text-right">
                    THB {package_price_show}
                  </span>
                </div>
              </div>
            </div>
            <div className="payment-creditcard-box flex flex-col   w-[34.25rem] h-[34.625rem] rounded-[1.5rem] border-[0.063rem] border-gray-400 bg-gray-100 box-border">
              <div className="creditcard-box-title w-full h-[4.875rem] flex justify-between p-[1.5rem] bg-gray-100 rounded-[1.5rem]">
                <span className="w-[6.5rem] h-[1.875rem] text-body1 text-gray-700">
                  Credit Card
                </span>
                <div className="credit-card-icon-container w-[6.25rem] h-[1.75rem] flex gap-[0.75rem]">
                  <img
                    className="w-[2.5rem] h-[1.75rem]"
                    src={visa}
                    alt="visa-icon"
                  ></img>
                  <img
                    className="w-[3rem] h-[1.75rem]"
                    src={master_card}
                    alt="master-card-icon"
                  ></img>
                </div>
              </div>
              <div className="creditcard-box-details flex flex-col bg-white w-[34rem] h-[23.25rem] py-[2rem] px-[1.5rem]  box-border ">
                <form className="flex flex-col gap-[2.5rem]">
                  <section className="bg-white w-full h-[4.75rem] flex flex-col gap-[0.25rem]">
                    <p className="text-body2 text-neutral-900">
                      Card Number <span className="text-[#AF2758]">*</span>
                    </p>
                    <input
                      className="w-full h-[3rem] rounded-[0.5rem] py-[0.75rem] px-[1rem]  gap-[0.5rem] bg-white  border-gray-400 border-[0.063rem] text-body2"
                      placeholder="Number of Card"
                    ></input>
                  </section>
                  <section className="bg-white w-full h-[4.75rem] flex flex-col gap-[0.25rem]">
                    <p className="text-body2 text-neutral-900">
                      Card Owner <span className="text-[#AF2758]">*</span>
                    </p>
                    <input
                      className="w-full h-[3rem] rounded-[0.5rem] py-[0.75rem] px-[1rem]  gap-[0.5rem] bg-white border-gray-400 border-[0.063rem] text-body2"
                      placeholder="Holder of card"
                    ></input>
                  </section>
                  <section className="bg-white flex w-full h-[4.75rem] gap-[1.375rem]">
                    <div className="expiry-date-box flex flex-col w-[14.938rem] h-[4.75rem] gap-[0.25rem]">
                      <p className="w-full h-[1.5rem] gap-[0.25rem] text-body2 text-neutral-900">
                        Expiry date <span className="text-[#AF2758]">*</span>
                      </p>
                      <input
                        className="bg-white w-full h-[3rem] rounded-[0.5rem] border-[0.063rem] border-gray-400 py-[0.75rem] px-[1rem] gap-[0.5rem] text-body2 "
                        placeholder="MM/YY"
                      ></input>
                    </div>
                    <div className="cvc-cvv-box flex flex-col w-[14.938rem] h-[4.75rem] gap-[0.25rem]">
                      <p className="w-full h-[1.5rem] gap-[0.25rem] text-body2 text-neutral-900">
                        CVC/CVV <span className="text-[#AF2758]">*</span>
                      </p>
                      <input
                        className="bg-white w-full h-[3rem] rounded-[0.5rem] border-[0.063rem] border-gray-400 py-[0.75rem] px-[1rem] gap-[0.5rem] text-body2 "
                        placeholder="x x x"
                      ></input>
                    </div>
                  </section>
                </form>
              </div>
              <div className="creditcard-box-confirm bg-white w-[34rem] h-[6.4rem] rounded-b-[1.5rem] flex justify-between items-center border-t-[0.07rem] border-b-[0.07rem] border-gray400 pt-[1.5rem] pr-[1.5rem] pb-[2rem] pl-[1.5rem]  ">
                <Button
                  ghost
                  className="w-[4.125] h-[2rem] font-[700] text-[1rem] rounded-[1rem]"
                  onClick={eventHandleCancle}
                >
                  Cancel
                </Button>
                {}
                <Button
                  primary
                  className="w-[11.063rem] h-[3rem]"
                  onClick={evenetHandleConfirm}
                >
                  Payment Confirm
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

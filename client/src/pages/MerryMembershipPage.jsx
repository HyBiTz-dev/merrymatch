import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../context/authentication";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import card_top from "../../public/images/card_top_saction.svg";
import card_bot from "../../public/images/card_bot_saction.svg";
import AlertModal from "../components/Modal/AlertModal";
import { useNavigate } from "react-router-dom";
export default function MerryMembershipPage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [billing, setBilling] = useState([]);
  const [nextbill, setNextBill] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [closeAlert, setCloseAlert] = useState(false);
  const userProfileId = state.id;

  const getPackageData = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_BASE_ENDPOINT}/membership/${userProfileId}`
    );

    const packageData = result.data.package;
    const paymentData = result.data.payment;

    setPackageDetails((packageDetails) => ({
      ...packageDetails,
      id: packageData.id,
      name: packageData.name,
      price: packageData.price,
      merry_limit: packageData.merry_limit,
      details: [...packageData.details],
      icon: packageData.package_icon,
      perdate: "Month",
    }));
    setPaymentMethod((paymentMethod) => ({
      ...paymentMethod,
      method: paymentData.payment_method,
    }));
  };

  const getBillHistory = async () => {
    if (billing.length <= 0) {
      try {
        const result = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_ENDPOINT
          }/transaction/${userProfileId}`
        );
        result.data.map((items, index) => {
          billing.push(items);
          if (index == 0) {
            setNextBill(items.nextBill);
          }
        });
      } catch (error) {}
    }
  };

  const handleConfirmCancelPackage = async () => {
    let statusConfirm = "";
    if (packageDetails != null && packageDetails != undefined) {
      try {
        const result = await axios.post(
          `${
            import.meta.env.VITE_APP_BASE_ENDPOINT
          }/membership/${userProfileId}`
        );

        statusConfirm = result.data.message;

        if (statusConfirm == "update completed") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeModal = () => {
    setShowAlert(false);
  };
  const openModal = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    getPackageData();
    getBillHistory();
  }, []);

  useEffect(() => {}, [showAlert, packageDetails, billing]);

  return (
    <>
      <Navbar auth />
      <div className="w-full h-full inline-block ">
        <div className="w-full h-full flex flex-col justify-center items-center bg-main ">
          <section className="membership-section w-[90rem] h-full t-[5.5rem]  ">
            <section className="membership-container bg-white w-[58.188rem] h-full mt-[5rem] ml-[15.875rem] flex flex-col gap-[5rem]">
              <section className="membership-header w-[58.125rem] h-[9.063rem] flex flex-col gap-[1rem]">
                <div className="wrapper w-full h-[9.063rem] flex flex-col gap-[0.5rem]">
                  <p className="w-[58.125rem] h-[1.313rem] text-tag text-beige-700">
                    Merry membership
                  </p>
                  <p className="w-[58.125rem] h-[7.25rem] text-headline2 text-purple-500">
                    Manage your membership <br />
                    and payment method
                  </p>
                </div>
              </section>
              <section className="merry-membership w-[58.188rem] h-full flex flex-col gap-[3.75rem] mb-[5rem]">
                <section className="membership-package w-[58.188rem] h-[17.25rem] flex flex-col gap-[1.5rem]">
                  <section className="package-details-container bg-white w-[58.188rem] h-[17.25rem] flex flex-col gap-[1.5rem]">
                    <p className="w-[58.188rem] h-[1.875rem] text-headline4 text-purple-500">
                      Merry Membership Package
                    </p>
                    {showAlert ? (
                      <AlertModal
                        CancleModal
                        isOpen={showAlert}
                        onClose={closeModal}
                        isConfirm={handleConfirmCancelPackage}
                      ></AlertModal>
                    ) : (
                      <></>
                    )}

                    <section className="package-card flex flex-col w-[58.125rem] h-[13.875rem] pt-[2rem] pr-[2rem] pl-[2rem] pb-[1.5rem]  items-start gap-[1rem] rounded-[2rem] border-[1px] border-solid border-gray-400 bg-gradient-to-r from-[#742138] to-[#A878BF]">
                      <div className="border-b-[1px] border-solid border-gray-300 flex flex-row w-[54.125rem] h-[7.375rem] justify-between">
                        <div className="w-[43.75rem] h-[4.875rem] flex justify-between gap-[1.5rem]">
                          <div className="package-details-left  w-[19.938rem] h-[4.688rem] flex gap-[1rem] ">
                            <img
                              className="flex justify-center items-center w-[3.75rem] h-[3.75rem] p-3 rounded-2xl bg-gray-100"
                              src={packageDetails.icon}
                            ></img>
                            <div className="package-title flex flex-col items-start gap-[0.5rem] self-stretch">
                              <h3 className="package-name text-headline3 w-full h-auto text-[2rem] font-[700] leading-10 tracking-[-0.02rem] text-white">
                                {packageDetails.name}
                              </h3>
                              <div className="package-price-per-date flex items-baseline gap-[0.375rem] self-stretch">
                                <p className="package-price text-body1 text-purple-100 text-xl font-[600] leading-[1.875rem] ">
                                  THB {packageDetails.price}
                                </p>
                                <p className="package-per-date text-body2 text-purple-100 text-base font-[400] leading-6">
                                  /{packageDetails.perdate}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="package-details-right  flex flex-col items-center w-[22.313rem] h-[4.875rem]  gap-[0.5rem]">
                            <div className="flex flex-col justify-center w-[22.313rem] h-[4.875rem] gap-[0.5rem]  text-purple-300">
                              {packageDetails.details ? (
                                packageDetails.details.map((items, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="package-feature flex items-start gap-[0.75rem]"
                                    >
                                      <img
                                        className="package-circle-checkbox w-6 h-6"
                                        src="../../public/images/checkbox-circle-fill.svg"
                                      ></img>
                                      <p className="details-text text-purple-100 text-body2 font-[400] leading-[1.5rem]">
                                        {items}
                                      </p>
                                    </div>
                                  );
                                })
                              ) : (
                                <div>not found details</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-beige-200 text-body3 text-beige-600 font-[800] h-[2rem] w-[5rem] rounded-[6.188rem] gap-[0.25rem] flex justify-center items-center">
                          <p> Active</p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-end w-full">
                        <Button
                          ghost
                          className="text-white text-[700]"
                          onClick={openModal}
                        >
                          Cancel Package
                        </Button>
                      </div>
                    </section>
                  </section>
                </section>
                <section className="payment-method-container w-[58.188rem] h-[15.5rem] flex flex-col gap-[1.5rem]">
                  <p className="w-[58.188rem] h-[1.875rem] text-headline4 text-purple-500">
                    Payment Method
                  </p>
                  <div className="payment-details bg-white w-[58.125rem] h-[12.125rem] rounded-[2rem] border-[0.063rem] border-gray-400 pt-[2rem] pr-[2rem] pl-[2rem] pb-[1.5rem] flex flex-col gap-[1rem]">
                    <div className="w-full h-[5.625rem] border-b-[0.063rem] border-b-gray-300 pb-[1.5rem] flex gap-[1.5rem]">
                      <div className="w-full h-full flex gap-[1rem]">
                        <div className="icon-card w-[4.125rem] h-[4.125rem] rounded-[1rem] bg-gray-100">
                          <div className="w-[2rem] h-[2rem] mt-[1.063rem] ml-[1.063rem] flex flex-col gap-[0.188rem]">
                            <img src={card_top}></img>
                            <img src={card_bot}></img>
                          </div>
                        </div>
                        <div className="details-card w-full h-[3.875rem] flex flex-col gap-[0.5rem]">
                          <p className="w-[49rem] h-[1.875rem] text-headline4 text-purple-600">
                            {paymentMethod.method}
                          </p>
                          <div className="w-full h-[1.5rem] flex gap-[0.375rem]">
                            <p className="w-[7rem] h-[1.5rem] text-body2 text-gray-700">
                              Expire 04/2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button ghost className="text-red-500">
                        Edit Payment Method
                      </Button>
                    </div>
                  </div>
                </section>
                <section className="billing-history-container w-[58.188rem] h-full flex flex-col gap-[1.5rem]">
                  <p className="w-[58.188rem] h-[1.875rem] text-headline4 text-purple-500">
                    Billing History
                  </p>
                  <div className="transaction-card bg-white w-[58.125rem] h-full rounded-[2rem] border-[0.063rem] border-gray-400 pt-[2rem] pr-[2rem] pl-[2rem] pb-[1.5rem] flex flex-col gap-[1rem]">
                    <div className="transaction-head w-[54.125rem] h-[2.875rem] border-b-[0.063rem] border-b-gray-300 py-[0.5rem] flex gap-[1rem]">
                      <p className="transaction-next-bill w-[54.125rem] h-[1.875rem] text-body1 text-gray-700 ">
                        Next billing : {nextbill}
                      </p>
                    </div>
                    <div className="transaction-detail w-[54.125rem] h-auto border-b-[0.063rem] border-b-gray-300 pb-[1.5rem]">
                      {billing.map((items, index) => {
                        return (
                          <div
                            key={index}
                            className="transaction-row w-[54.125rem] h-[3.5rem] p-[1rem] flex gap-[1rem]"
                          >
                            <p className="w-[45.563rem] h-[1.5rem] text-body2 text-gray-700">
                              {items.created_at}
                            </p>
                            <p className="w-[5.563rem] h-[1.5rem] text-body2 text-gray-800">
                              {items.package_price}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

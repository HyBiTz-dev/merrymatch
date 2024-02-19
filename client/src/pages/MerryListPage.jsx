import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MerryCard from "../components/MerryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authentication";

function MerryListPage() {
  const [timeUntilMidnight, setTimeUntilMidnight] = useState(null);
  const [packageLimit, setPackageLimit] = useState(null);
  const { state } = useAuth();
  const user_id = state.id;

  const fetchUserPackage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/merrylist/${user_id}/package`
      );
      const userPackage = response.data.packageLimit.packages.merry_limit;
      setPackageLimit(userPackage);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchUserPackage();
  }, []);

  useEffect(() => {
    const calTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timeUntilMidnightInMilliseconds = midnight - now;
      let minutes = Math.ceil(
        (timeUntilMidnightInMilliseconds / (1000 * 60)) % 60
      );
      let hours = Math.floor(
        (timeUntilMidnightInMilliseconds / (1000 * 60 * 60)) % 24
      );
      const timeStr = `${hours}h ${minutes}m`;
      setTimeUntilMidnight(timeStr);
    };
    calTime();
    const interval = setInterval(calTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar auth />
      <div className="bg-main h-fix">
        <header className="flex justify-evenly mb-16 ml-10">
          <div>
            <p className="text-body4 text-beige-700 mb-2 mt-20">MERRY LIST</p>
            <h2 className="text-headline2 text-purple-500">
              Let's know each other <br /> with Merry!
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex gap-2 mr-10">
              <span className="text-body2 text-gray-700">
                Merry limit today
              </span>
              <span className="text-body2 text-red-400">
                2/{packageLimit ? packageLimit : 20}
              </span>
            </div>
            <p className="text-body5 text-gray-600 flex justify-end mr-10">
              Reset in {timeUntilMidnight}
            </p>
          </div>
        </header>
        <div className="bg-main h-1"></div>
        <MerryCard />
      </div>
      <div className="bg-main h-40"></div>
      <Footer />
    </>
  );
}

export default MerryListPage;

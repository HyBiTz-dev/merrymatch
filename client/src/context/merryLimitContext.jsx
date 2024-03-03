import React, { useEffect, useState } from "react";
import { useAuth } from "./authentication";
import axios from "axios";

const MerryLimitContext = React.createContext();

function MerryLimitProvider(props) {
  const { state } = useAuth();
  const [dailyLimit, setDailyLimit] = useState();
  const [maxMerryLimit, setMaxMerryLimit] = useState();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user/merry-limit/${
          state?.id
        }`
      );
      setDailyLimit(result.data[0].daily_limit);
      setMaxMerryLimit(result.data[0].max_merry_limit);
    };
    getData();
  }, []);

  useEffect(() => {
    const updateLimit = async () => {
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user/merry-limit/${
          state?.id
        }`,
        {
          daily_limit: dailyLimit,
        }
      );
    };
    updateLimit();
  }, [dailyLimit]);

  return (
    <MerryLimitContext.Provider
      value={{
        dailyLimit,
        setDailyLimit,
        maxMerryLimit,
        setMaxMerryLimit,
      }}
    >
      {props.children}
    </MerryLimitContext.Provider>
  );
}

const useMerryLimit = () => React.useContext(MerryLimitContext);
export { MerryLimitProvider, useMerryLimit };

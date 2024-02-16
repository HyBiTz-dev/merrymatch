import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const AgeSliderStyle = styled(Slider)({
  color: "#A62D82",
  height: 2,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 13,
    width: 13,
    //color-button
    backgroundColor: "#DF89C6",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-rail": {
    color: "#C8CCDB",
  },
});

const minDistance = 1;
export default function AgeSlider() {
  const [value, setValue] = useState([18, 80]);
  const [ageLeft, setAgeLeft] = useState(18);
  const [ageRight, setAgeRight] = useState(80);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setAgeLeft(Math.min(newValue[0], value[1] - minDistance));
      setAgeRight(value[1]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setAgeLeft(value[0]);
      setAgeRight(Math.max(newValue[1], value[0] + minDistance));
    }
  };
  const handleInputRight = (event) => {};
  const handleInputLeft = (event) => {};
  return (
    <>
      <div className="Age-range-container flex flex-col gap-4">
        <div className="text-base font-bold text-purple-800">Age Range</div>
        <Box sx={{ width: 188, height: 18 }}>
          <AgeSliderStyle
            value={value}
            disableSwap
            onChange={handleChange}
            min={18}
            max={80}
          />
        </Box>
        <div className="input-age flex justify-center items-center gap-1">
          <input
            type="number"
            className="input-left input border border-gray-400 w-full focus:outline-none bg-white text-body2 text-gray-600 [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
            onChange={handleInputLeft}
            value={ageLeft}
          ></input>
          <span className="text-body2 text-black">-</span>
          <input
            type="number"
            className="input-right input border border-gray-400 w-full focus:outline-none bg-white text-body2 text-gray-600 [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
            onChange={handleInputRight}
            value={ageRight}
          ></input>
        </div>
      </div>
    </>
  );
}

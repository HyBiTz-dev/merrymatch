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
export default function AgeSlider({ onChange, onReset }) {
  const [value, setValue] = useState([18, 80]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  useEffect(() => {
    setValue([18, 80]);
  }, [onReset]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleBlurleft = () => {
    if (value[0] < 18) {
      setValue([18, value[1]]);
    } else if (value[0] >= value[1]) {
      setValue([value[1] - 1, value[1]]);
    }
  };
  const handleBlurright = () => {
    if (value[1] > 80) {
      setValue([value[0], 80]);
    } else if (value[1] <= value[0]) {
      setValue([value[0], value[0] + 1]);
    }
  };

  return (
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
          onChange={(e) => {
            setValue([Number(e.target.value), value[1]]);
          }}
          value={value[0]}
          onBlur={handleBlurleft}
        ></input>
        <span className="text-body2 text-black">-</span>
        <input
          type="number"
          className="input-right input border border-gray-400 w-full focus:outline-none bg-white text-body2 text-gray-600 [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
          onChange={(e) => {
            setValue([value[0], Number(e.target.value)]);
          }}
          value={value[1]}
          onBlur={handleBlurright}
        ></input>
      </div>
    </div>
  );
}

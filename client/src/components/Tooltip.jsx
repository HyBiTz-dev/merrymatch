import { useState } from "react";

export default function Tooltip(prop) {
  const [isHovered, setIsHovered] = useState(false);

  if (prop.gray) {
    return (
      <div
        className="tooltip tooltip-bottom [--tooltip-text-color:white] [--tooltip-tail:0px] [--tooltip-color:#646D89]"
        data-tip={prop.text}
      >
        <button
          className="btn bg-white hover:bg-white active:bg-white border-none rounded-2xl shadow-btn2 w-12 relative"
          onClick={prop.onClick}
        >
          <img src={prop.img} className="absolute inset-3"></img>
        </button>
      </div>
    );
  } else if (prop.merryRed) {
    return (
      <div
        className="tooltip tooltip-bottom [--tooltip-text-color:white] [--tooltip-tail:0px] [--tooltip-color:#646D89]"
        data-tip={prop.text}
      >
        <button
          className="btn bg-red-500 hover:bg-white active:bg-white border-none rounded-2xl shadow-btn2 w-12 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={prop.onClick}
        >
          {isHovered ? (
            <img src={prop.imgHover} className="absolute inset-1"></img>
          ) : (
            <img src={prop.img} className="absolute inset-1"></img>
          )}
        </button>
      </div>
    );
  } else if (prop.merryWhite) {
    return (
      <div
        className="tooltip tooltip-bottom [--tooltip-text-color:white] [--tooltip-tail:0px] [--tooltip-color:#646D89]"
        data-tip={prop.text}
      >
        <button
          className="btn bg-white hover:bg-white active:bg-white border-none rounded-2xl shadow-btn2 w-12 relative"
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          onClick={prop.onClick}
        >
          <img src={prop.img} className="absolute inset-1"></img>
          {/* {isHovered ? (
            <img src={prop.imgHover} className="absolute inset-1"></img>
          ) : (
            <img src={prop.img} className="absolute inset-1"></img>
          )} */}
        </button>
      </div>
    );
  }
}

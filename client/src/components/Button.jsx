export default function Button({
  props,
  primary,
  secondary,
  className,
  children,
  onClick,
  type,
}) {
  if (primary) {
    const classes =
      "btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-btn px-6 shadow-btn1 font-bold text-base";
    return (
      <button
        type={type}
        className={className + " " + classes}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (secondary) {
    const classes =
      "btn bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 border-none rounded-btn px-6 shadow-btn2 font-bold text-base";

    return (
      <button
        type={type}
        className={className + " " + classes}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

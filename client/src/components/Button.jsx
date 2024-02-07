export default function Button({
  props,
  primary,
  secondary,
  ghost,
  ghostarrow,
  className,
  children,
  onClick,
  disabled,
  actionRed,
  actionGray,
}) {
  if (primary) {
    const classes =
      "btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-600 border-none rounded-btn px-6 shadow-btn1 font-bold text-base";
    return (
      <button
        className={className + " " + classes}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else if (secondary) {
    const classes =
      "btn bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 disabled:bg-gray-300 disabled:text-gray-600 border-none rounded-btn px-6 shadow-btn2 font-bold text-base";

    return (
      <button
        className={className + " " + classes}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else if (ghost) {
    const classes =
      "hover:text-red-400 active:text-red-600 text-red-500 disabled:text-gray-500 border-none rounded-4 px-2 pt-1 font-bold text-base";

    return (
      <button
        className={className + " " + classes}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else if (ghostarrow) {
    const classes =
      "hover:text-red-400 active:text-red-600 text-red-500 disabled:text-gray-500  border-none rounded-4 px-2 pt-1 font-bold text-base flex justify-center items-center gap-2 ";

    return (
      <button
        className={className + " " + classes}
        onClick={onClick}
        disabled={disabled}
      >
        <svg
          className="h-3 fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z" />
        </svg>
        {children}
      </button>
    );
  }
}

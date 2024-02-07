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
  chat,
  view,
  match,
  type,
  actionRed,
  actionGray,
}) {
  if (primary) {
    const classes =
      "btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-600 border-none rounded-btn px-6 shadow-btn1 font-bold text-base";
    return (
      <button
        type={type}
        className={className + " " + classes}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  if (secondary) {
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
  }
  if (ghost) {
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
  }
  if (ghostarrow) {
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
  if (chat) {
    return (
      <div className="has-tooltip">
        <button
          className={
            "btn border-none hover:bg-white rounded-2xl shadow-nav bg-white flex justify-center items-center " +
            className
          }
          onClick={onClick}
        >
          <svg
            className="fill-gray-700"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 0.400024C7.24201 0.400024 0.600006 5.85942 0.600006 13C0.600006 16.6432 2.36041 19.885 5.09821 22.153C5.0731 23.2717 4.74864 24.3631 4.15861 25.3138C4.03627 25.5113 3.96698 25.7371 3.95743 25.9692C3.94789 26.2014 3.99841 26.432 4.10412 26.6389C4.20983 26.8458 4.36714 27.0219 4.56084 27.1502C4.75454 27.2785 4.97807 27.3546 5.20981 27.3712C7.73245 27.5602 10.241 26.854 12.2946 25.3768C13.1712 25.5244 14.0766 25.6 15 25.6C22.758 25.6 29.4 20.1406 29.4 13C29.4 5.85942 22.758 0.400024 15 0.400024ZM15 14.8C15.4774 14.8 15.9352 14.6104 16.2728 14.2728C16.6104 13.9353 16.8 13.4774 16.8 13C16.8 12.5226 16.6104 12.0648 16.2728 11.7272C15.9352 11.3897 15.4774 11.2 15 11.2C14.5226 11.2 14.0648 11.3897 13.7272 11.7272C13.3896 12.0648 13.2 12.5226 13.2 13C13.2 13.4774 13.3896 13.9353 13.7272 14.2728C14.0648 14.6104 14.5226 14.8 15 14.8ZM11.4 13C11.4 13.4774 11.2104 13.9353 10.8728 14.2728C10.5352 14.6104 10.0774 14.8 9.60001 14.8C9.12262 14.8 8.66478 14.6104 8.32721 14.2728C7.98965 13.9353 7.80001 13.4774 7.80001 13C7.80001 12.5226 7.98965 12.0648 8.32721 11.7272C8.66478 11.3897 9.12262 11.2 9.60001 11.2C10.0774 11.2 10.5352 11.3897 10.8728 11.7272C11.2104 12.0648 11.4 12.5226 11.4 13ZM20.4 14.8C20.8774 14.8 21.3352 14.6104 21.6728 14.2728C22.0104 13.9353 22.2 13.4774 22.2 13C22.2 12.5226 22.0104 12.0648 21.6728 11.7272C21.3352 11.3897 20.8774 11.2 20.4 11.2C19.9226 11.2 19.4648 11.3897 19.1272 11.7272C18.7896 12.0648 18.6 12.5226 18.6 13C18.6 13.4774 18.7896 13.9353 19.1272 14.2728C19.4648 14.6104 19.9226 14.8 20.4 14.8Z"
            />
          </svg>
        </button>
        <span className="tooltip rounded py-0.5 px-2 bg-gray-600 text-white text-body5 mt-1">
          Go to chat
        </span>
      </div>
    );
  }
  if (view) {
    return (
      <div className="has-tooltip">
        <button
          className={
            "btn border-none hover:bg-white rounded-2xl shadow-nav bg-white flex justify-center items-center " +
            className
          }
          onClick={onClick}
        >
          <svg
            className="fill-gray-700"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8C10 7.46957 9.78929 6.96086 9.41421 6.58579C9.03914 6.21071 8.53043 6 8 6C7.46957 6 6.96086 6.21071 6.58579 6.58579C6.21071 6.96086 6 7.46957 6 8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10Z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.531497 8.47203C0.41398 8.16668 0.41398 7.82858 0.531497 7.52323C1.11328 6.01482 2.13826 4.71798 3.47146 3.80347C4.80467 2.88896 6.38358 2.39967 8.0003 2.40002C11.4059 2.40002 14.3147 4.52802 15.4691 7.52803C15.5867 7.83283 15.5859 8.17123 15.4691 8.47683C14.8873 9.98523 13.8623 11.2821 12.5291 12.1966C11.1959 13.1111 9.61701 13.6004 8.0003 13.6C4.5947 13.6 1.6859 11.472 0.531497 8.47203ZM11.2003 8.00003C11.2003 8.84872 10.8632 9.66265 10.263 10.2628C9.66292 10.8629 8.84899 11.2 8.0003 11.2C7.1516 11.2 6.33767 10.8629 5.73755 10.2628C5.13744 9.66265 4.8003 8.84872 4.8003 8.00003C4.8003 7.15133 5.13744 6.3374 5.73755 5.73728C6.33767 5.13717 7.1516 4.80002 8.0003 4.80002C8.84899 4.80002 9.66292 5.13717 10.263 5.73728C10.8632 6.3374 11.2003 7.15133 11.2003 8.00003Z"
            />
          </svg>
        </button>
        <span className="tooltip rounded py-0.5 px-2 bg-gray-600 text-white text-body5 mt-1">
          See profile
        </span>
      </div>
    );
  }
  if (match) {
    return (
      <div className="has-tooltip">
        <button
          className={
            "btn border-none hover:bg-white rounded-2xl shadow-nav bg-white flex justify-center items-center " +
            className
          }
          onClick={onClick}
        >
          <svg
            className="fill-red-500"
            viewBox="0 0 26 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
            />
          </svg>
        </button>
        <span className="tooltip rounded py-0.5 px-2 bg-gray-600 text-white text-body5 mt-1">
          Marry
        </span>
      </div>
    );
  }
  if (!match) {
    return (
      <div className="has-tooltip">
        <button
          type="button"
          className={
            "btn border-none hover:bg-red-500 rounded-2xl shadow-nav bg-red-500 flex justify-center items-center " +
            className
          }
          onClick={onClick}
        >
          <svg
            className="fill-white"
            viewBox="0 0 26 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M12.5267 23.8807L12.5173 23.8767L12.488 23.8607C12.3164 23.7663 12.1461 23.6694 11.9773 23.57C9.94775 22.364 8.05103 20.9472 6.31867 19.3433C3.25067 16.4805 0 12.2324 0 7.00027C0 3.09617 3.28533 9.46041e-05 7.25067 9.46041e-05C8.353 -0.00530477 9.44238 0.237888 10.4378 0.711587C11.4331 1.18528 12.3089 1.8773 13 2.73616C13.6912 1.87712 14.5672 1.185 15.5628 0.711296C16.5585 0.237591 17.6481 -0.00550555 18.7507 9.46041e-05C22.7147 9.46041e-05 26 3.09617 26 7.00027C26 12.2337 22.7493 16.4818 19.6813 19.3419C17.949 20.9459 16.0523 22.3627 14.0227 23.5687C13.8539 23.6685 13.6836 23.7658 13.512 23.8607L13.4827 23.8767L13.4733 23.882L13.4693 23.8834C13.3247 23.96 13.1636 24 13 24C12.8364 24 12.6753 23.96 12.5307 23.8834L12.5267 23.882V23.8807Z"
            />
          </svg>
        </button>
        <span className="tooltip rounded py-0.5 px-2 bg-gray-600 text-white text-body5 mt-1">
          Unmatch
        </span>
      </div>
    );
  }
}

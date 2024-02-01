import className from "classnames";

export default function Button(props) {
  if (props.primary) {
    const classes = className({
      "btn bg-red-500 hover:bg-red-400 active:bg-red-600 text-white border-none rounded-btn px-6 shadow-btn1 font-bold text-base":
        props.primary,
    });
    return (
      <button className={props.className + " " + classes}>
        {props.children}
      </button>
    );
  } else if (props.secondary) {
    const classes = className({
      "btn bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 border-none rounded-btn px-6 shadow-btn2 font-bold text-base":
        props.secondary,
    });
    return (
      <button className={props.className + " " + classes}>
        {props.children}
      </button>
    );
  }
}

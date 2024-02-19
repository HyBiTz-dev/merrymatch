function ComplaintStatus({ status }) {
  let statusText;
  let statusColor;

  if (status === "New") {
    statusText = status;
    statusColor = "bg-beige-100 text-beige-700";
  } else if (status === "Pending") {
    statusText = status;
    statusColor = "bg-yellow-100 text-yellow-500";
  } else if (status === "Resolved") {
    statusText = status;
    statusColor = "bg-green-100 text-green-500";
  } else if (status === "Cancel") {
    statusText = status;
    statusColor = "bg-gray-200 text-gray-700";
  } else {
    statusText = "Unknown";
    statusColor = "bg-red-200 text-red-700";
  }

  return (
    <div
      className={`rounded-lg py-1 px-2.5 text-body5 h-[1.625rem] w-fit ${statusColor}`}
    >
      {statusText}
    </div>
  );
}

export default ComplaintStatus;

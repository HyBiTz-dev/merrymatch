export default function ComplaintStatus({
  isNew,
  isPending,
  isResolved,
  isCancel,
}) {
  if (isNew) {
    return (
      <div className="bg-beige-100 rounded-lg py-1 px-2.5 text-body5 text-beige-700 h-[1.625rem] w-[2.875rem]">
        New
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="bg-yellow-100 rounded-lg py-1 px-2.5 text-body5 text-yellow-500 h-[1.625rem] w-[4.063rem]">
        Pending
      </div>
    );
  }
  if (isResolved) {
    return (
      <div className="bg-green-100 rounded-lg py-1 px-2.5 text-body5 text-green-500 h-[1.625rem] w-[4.375rem]">
        Resolved
      </div>
    );
  }
  if (isCancel) {
    return (
      <div className="bg-gray-200 rounded-lg py-1 px-2.5 text-body5 text-gray-700 h-[1.625rem] w-[3.563rem]">
        Cancel
      </div>
    );
  }
}

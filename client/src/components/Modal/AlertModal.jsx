import Button from "../Button";

export default function AlertModal({
  isOpen,
  onClose,
  isConfrim,
  children,
  DeleteModal,
  CancleModal,
  ResolveModal,
  CancleResolveModal,
}) {
  if (!isOpen) return null;

  if (DeleteModal) {
    return (
      <dialog className="modal  bg-black/10 " open>
        <div className="modal-box bg-white h-[12.5rem] max-w-[33rem] p-0 py-2 rounded-3xl">
          <form
            method="dialog"
            className="flex justify-between items-center py-2 border-b px-6 border-gray-300"
          >
            <span className="text-body1 text-black">Delete Confirmation</span>
            <button
              className="btn btn-sm btn-circle btn-ghost text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-6 pt-6 px-6">
            <h3 className="text-body2 text-gray-700">{children}</h3>
            <div className="flex gap-4">
              <Button secondary onClick={isConfrim}>
                Yes, I want to delete
              </Button>
              <Button primary onClick={onClose}>
                No, I don’t want
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
  if (CancleModal) {
    return (
      <dialog className="modal  bg-black/10" open>
        <div className="modal-box bg-white h-[12.5rem] max-w-[33rem] p-0 py-2 rounded-3xl">
          <form
            method="dialog"
            className="flex justify-between items-center py-2 border-b px-6 border-gray-300"
          >
            <span className="text-body1 text-black">Cancel Confirmation</span>
            <button
              className="btn btn-sm btn-circle btn-ghost text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-6 pt-6 px-6">
            <h3 className="text-body2 text-gray-700">
              Do you sure to cancel Membership to get more Merry?
            </h3>
            <div className="flex gap-4">
              <Button secondary onClick={isConfrim}>
                Yes, I want to cancel
              </Button>
              <Button primary onClick={onClose}>
                No, I still want to be member
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
  if (ResolveModal) {
    return (
      <dialog className="modal  bg-black/10" open>
        <div className="modal-box bg-white h-[12.5rem] max-w-[33rem] p-0 py-2 rounded-3xl">
          <form
            method="dialog"
            className="flex justify-between items-center py-2 border-b px-6 border-gray-300"
          >
            <span className="text-body1 text-black">Resolve Complaint</span>
            <button
              className="btn btn-sm btn-circle btn-ghost text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-6 pt-6 px-6">
            <h3 className="text-body2 text-gray-700">
              This complaint is resolved?
            </h3>
            <div className="flex gap-4">
              <Button secondary onClick={isConfrim}>
                Yes, it has been resolved
              </Button>
              <Button primary onClick={onClose}>
                No, it’s not
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
  if (CancleResolveModal) {
    return (
      <dialog className="modal  bg-black/10" open>
        <div className="modal-box bg-white h-[12.5rem] max-w-[33rem] p-0 py-2 rounded-3xl">
          <form
            method="dialog"
            className="flex justify-between items-center py-2 border-b px-6 border-gray-300"
          >
            <span className="text-body1 text-black">Cancel Complaint</span>
            <button
              className="btn btn-sm btn-circle btn-ghost text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-6 pt-6 px-6">
            <h3 className="text-body2 text-gray-700">
              Do you sure to cancel this conplaint?
            </h3>
            <div className="flex gap-4">
              <Button secondary onClick={isConfrim}>
                Yes, cancel this complaint
              </Button>
              <Button primary onClick={onClose}>
                No, give me more time
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
}

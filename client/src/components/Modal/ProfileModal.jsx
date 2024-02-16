export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <dialog className="modal bg-black/20" open>
      <div className="modal-box w-[71.25rem] max-w-[71.25rem] h-[46.25rem] bg-white">
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
        </div>
        <div className="flex justify-between items-center ml-10 w-[61.25rem]">
          <div className="w-[29.875rem] relative">
            <img
              src="/images/matching-test.png"
              className=" rounded-[2rem]"
              alt=""
            />
            <div className="flex justify-between items-center">
              <p className="text-body2 py-3 px-6 ">1/2</p>
              <div className="flex">
                <svg
                  className="w-12 fill-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                    fill="#9AA1B9"
                  />
                </svg>
                <svg
                  className="rotate-180 w-12 fill-gray-600"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7915 7.00498H3.62148L8.50148 2.12498C8.89148 1.73498 8.89148 1.09498 8.50148 0.704976C8.11148 0.314976 7.48148 0.314976 7.09148 0.704976L0.501484 7.29498C0.111484 7.68498 0.111484 8.31498 0.501484 8.70498L7.09148 15.295C7.48148 15.685 8.11148 15.685 8.50148 15.295C8.89148 14.905 8.89148 14.275 8.50148 13.885L3.62148 9.00498H14.7915C15.3415 9.00498 15.7915 8.55498 15.7915 8.00498C15.7915 7.45498 15.3415 7.00498 14.7915 7.00498Z"
                    fill="#9AA1B9"
                  />
                </svg>
              </div>
            </div>
            <div className="flex absolute bottom-1 left-40">
              <img src="/images/cross-button.svg" role="button" alt="" />
              <img src="/images/match-button.svg" role="button" alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-10 pt-6 pl-14 w-[29.875rem]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="text-headline2 text-gray-900">Daeny</span>
                <span className="text-headline2 text-gray-700">24</span>
              </div>
              <div className="flex gap-4">
                <img src="/images/pin.svg" alt="" />
                <p className="text-body1 text-gray-700">Bangkok, Thailand</p>
              </div>
            </div>
            <div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Sexual identities
                </span>
                <span className="text-body1 text-gray-700">Female</span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Sexual preferences
                </span>
                <span className="text-body1 text-gray-700">Male</span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Racial preferences
                </span>
                <span className="text-body1 text-gray-700">Indefinite</span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Meeting interests
                </span>
                <span className="text-body1 text-gray-700">
                  Long-term commitment
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-headline4 text-gray-900">About me</span>
              <span className="text-body2 text-gray-900">
                I know nothing..but you
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-headline4 text-gray-900">
                Hobbies and Interests
              </span>
              <div className="flex gap-3 flex-wrap">
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  dragon
                </span>
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  romantic relationship
                </span>
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  political
                </span>
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  black hair
                </span>
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  friendly
                </span>
                <span className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600">
                  fire
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

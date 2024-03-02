import SwipeProfileImagesModal from "./SwipeProfileImagesModal";

export default function ProfileModal({
  isOpen,
  onClose,
  profileData,
  crossbtn,
  heartbtn,
}) {
  if (!isOpen) return null;

  return (
    <dialog className="modal bg-black/20 rounded-[32px]" open>
      <div className="modal-box w-[71.25rem] max-w-[71.25rem] h-[46.25rem] bg-white">
        <div className="modal-action h-4">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
        </div>
        <div className="flex justify-between ml-10 w-[61.25rem]">
          <div className="w-[29.875rem] relative">
            <SwipeProfileImagesModal
              user={profileData.image_url}
              crossbtn={crossbtn}
              heartbtn={heartbtn}
            />
          </div>
          <div className="flex flex-col gap-10 pt-6 pl-14 w-[29.875rem]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <span className="text-headline2 text-gray-900">
                  {profileData?.name}
                </span>
                <span className="text-headline2 text-gray-700">
                  {profileData?.age}
                </span>
              </div>
              <div className="flex gap-4">
                <img src="/images/pin.svg" alt="" />
                <p className="text-body1 text-gray-700">
                  {profileData?.city_name},{profileData?.country_name}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Sexual identities
                </span>
                <span className="text-body1 text-gray-700">
                  {profileData?.gender_name}
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Sexual preferences
                </span>
                <span className="text-body1 text-gray-700">
                  {profileData?.gender_interest_name}
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Racial preferences
                </span>
                <span className="text-body1 text-gray-700">
                  {profileData?.racial_name}
                </span>
              </div>
              <div className="flex items-center py-2">
                <span className="text-body2 text-gray-900 w-48">
                  Meeting interests
                </span>
                <span className="text-body1 text-gray-700">
                  {profileData?.relation_interest_name}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-headline4 text-gray-900">About me</span>
              <span className="text-body2 text-gray-900">
                {profileData?.description}
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-headline4 text-gray-900">
                Hobbies and Interests
              </span>

              <div className="flex gap-3 flex-wrap">
                {profileData?.hobbie_interest_array.map((text, index) => (
                  <span
                    className="border border-purple-300 rounded-xl py-2 px-4 bg-white text-body2 text-purple-600"
                    key={index}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

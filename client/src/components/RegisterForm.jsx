import TagsInput from "./TagInput";
export const Step1 = ({ formik }) => {
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">Basic Information</div>
      <div id="input-container-1" className="flex justify-between">
        <div id="name-input">
          <div className="text-base text-black">Name</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] text-black focus:border-purple-500 outline-none"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name || ""}
          />
          {formik.errors && formik.errors.name && <p>{formik.errors.name}</p>}
        </div>
        <div id="date-of-birth-input">
          <div className="text-base text-black">Date of birth</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] text-black focus:border-purple-500 outline-none"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth}
          />
          {formik.errors && formik.errors.dateOfBirth && (
            <p>{formik.errors.dateOfBirth}</p>
          )}
        </div>
      </div>
      <div id="input-container-2" className="flex justify-between">
        <div id="location-input">
          <div className="text-base text-black">Location</div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
          >
            <option disabled selected>
              Location
            </option>
            <option>Thailand</option>
            <option>China</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.location && (
            <p>{formik.errors.location}</p>
          )}
        </div>
        <div id="city-input">
          <div className="text-base text-black">City</div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          >
            <option disabled selected>
              city
            </option>
            <option>Bangkok</option>
            <option>Chingmai</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.city && <p>{formik.errors.city}</p>}
        </div>
      </div>
      <div id="input-container-3" className="flex justify-between">
        <div id="username-input">
          <div className="text-base text-black">Username</div>
          <input
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="username"
            name="username"
            type="text"
            placeholder="At least 6 characters"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors && formik.errors.username && (
            <p>{formik.errors.username}</p>
          )}
        </div>
        <div id="email-input">
          <div className="text-base text-black">Email</div>
          <input
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="name@website.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors && formik.errors.email && <p>{formik.errors.email}</p>}
        </div>
      </div>
      <div id="input-container-4" className="flex justify-between">
        <div id="password-input">
          <div className="text-base text-black">Password</div>
          <input
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
        </div>
        <div id="confirm-password-input">
          <div className="text-base text-black">Confirm Password</div>
          <input
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="At least 8 characters"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors && formik.errors.confirmPassword && (
            <p>{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export const Step2 = ({ formik }) => {
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">
        Identities and Interests
      </div>
      <div id="input-container-1" className="flex justify-between">
        <div id="gender-input">
          <div className="text-base text-black">Sexual identities </div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option disabled selected>
              Select Sexual identities
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>non-binary</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.gender && (
            <p>{formik.errors.gender}</p>
          )}
        </div>
        <div id="gender-interests-input">
          <div className="gender-interests-base text-black ">
            Sexual preferences
          </div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="genderInterests"
            name="genderInterests"
            onChange={formik.handleChange}
            value={formik.values.genderInterests}
          >
            <option disabled selected>
              Select Sexual preferences
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>non-binary</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.genderInterests && (
            <p>{formik.errors.genderInterests}</p>
          )}
        </div>
      </div>
      <div id="input-container-2" className="flex justify-between">
        <div id="recial-input">
          <div className="text-base text-black">Racial preferences</div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="recial"
            name="recial"
            onChange={formik.handleChange}
            value={formik.values.recial}
          >
            <option disabled selected>
              Select Racial preferences
            </option>
            <option>Asian</option>
            <option>Caucasian</option>
            <option>Black</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.recial && (
            <p>{formik.errors.recial}</p>
          )}
        </div>
        <div id="meeting-input">
          <div className="text-base text-black">Meeting interests</div>
          <select
            className="border text-black bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="meeting"
            name="meeting"
            onChange={formik.handleChange}
            value={formik.values.meeting}
          >
            <option disabled selected>
              Select Meeting interests
            </option>
            <option>friends</option>
            <option>partners</option>
            <option>long-term commitment</option>
            <option>etc</option>
          </select>
          {formik.errors && formik.errors.meeting && (
            <p>{formik.errors.meeting}</p>
          )}
        </div>
      </div>
      <div id="input-container-3" className="flex justify-around">
        <div id="hobbies-interests-input">
          <div className="text-base text-black">
            Hobbies / Interests (Maximum 10)
          </div>
          <TagsInput
            tags={formik.values.hobbiesInterests}
            setTags={(tags) => formik.setFieldValue("hobbiesInterests", tags)}
          />
          {formik.errors && formik.errors.hobbiesInterests && (
            <p>{formik.errors.hobbiesInterests}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export const Step3 = ({ formik }) => {
  return (
    <form
      className="flex flex-wrap justify-between gap-6 pb-10"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-full text-2xl text-purple-500 pb-6">
        Profile pictures
        <div className="text-gray-800 text-base">Upload at least 2 photos</div>
      </div>
      {formik.values.profilePictures.map((picture, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(picture)}
            alt={`Picture ${index + 1}`}
            className=" w-[10.5rem] h-[10.5rem] object-cover rounded-lg"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 "
            onClick={() => {
              const newPictures = [...formik.values.profilePictures];
              newPictures.splice(index, 1);
              formik.setFieldValue("profilePictures", newPictures);
            }}
          >
            x
          </button>
        </div>
      ))}
      {[...Array(5 - formik.values.profilePictures.length)].map((_, index) => (
        <div
          key={index}
          className="w-[10.5rem] h-[10.5rem] border bg-gray-200 rounded-lg flex justify-center items-center"
        >
          <label
            htmlFor="picture-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <div className="text-purple-600 text-base">+</div>
            <div className="text-purple-600 text-sm">Upload photo</div>
            <input
              id="picture-upload"
              name="profilePictures"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  formik.setFieldValue("profilePictures", [
                    ...formik.values.profilePictures,
                    file,
                  ]);
                }
              }}
            />
          </label>
        </div>
      ))}
      {formik.errors && formik.errors.profilePictures && (
        <p>{formik.errors.profilePictures}</p>
      )}
    </form>
  );
};

export const Step1 = ({ formik }) => {
  const { handleChange, values } = formik;
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">Basic Information</div>
      <div id="input-container-1" className="flex justify-between">
        <div id="name-input">
          <div className="text-base text-black">Name</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div id="date-of-birth-input">
          <div className="text-base text-black">Date of birth</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth}
          />
        </div>
      </div>
      <div id="input-container-2" className="flex justify-between">
        <div id="location-input">
          <div className="text-base text-black">Location</div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
          >
            <option>Location</option>
            <option>Thailand</option>
            <option>China</option>
            <option>etc</option>
          </select>
        </div>
        <div id="city-input">
          <div className="text-base text-black">City</div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="city"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          >
            <option>city</option>
            <option>Bangkok</option>
            <option>Chingmai</option>
            <option>etc</option>
          </select>
        </div>
      </div>
      <div id="input-container-3" className="flex justify-between">
        <div id="username-input">
          <div className="text-base text-black">Username</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="username"
            name="username"
            type="text"
            placeholder="At least 6 characters"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <div id="email-input">
          <div className="text-base text-black">Email</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500 outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="name@website.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
      </div>
      <div id="input-container-4" className="flex justify-between">
        <div id="password-input">
          <div className="text-base text-black">Password</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div id="confirm-password-input">
          <div className="text-base text-black">Confirm Password</div>
          <input
            className="border bg-white rounded-lg p-3 w-[27.9rem] focus:border-purple-500"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="At least 8 characters"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </div>
      </div>
    </form>
  );
};

export const Step2 = ({ formik }) => {
  const { handleChange, values } = formik;
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">
        Identities and Interests
      </div>
      <div id="input-container-1" className="flex justify-between">
        <div id="gender-input">
          <div className="text-base text-black">Sexual identities </div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option>Male</option>
            <option>Female</option>
            <option>non-binary</option>
            <option>etc</option>
          </select>
        </div>
        <div id="gender-interests-input">
          <div className="gender-interests-base text-black">
            Sexual preferences
          </div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="genderInterests"
            name="genderInterests"
            onChange={formik.handleChange}
            value={formik.values.genderInterests}
          >
            <option>Select Sexual</option>
            <option>Male</option>
            <option>Female</option>
            <option>non-binary</option>
            <option>etc</option>
          </select>
        </div>
      </div>
      <div id="input-container-2" className="flex justify-between">
        <div id="recial-input">
          <div className="text-base text-black">Racial preferences</div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="recial"
            name="recial"
            onChange={formik.handleChange}
            value={formik.values.recial}
          >
            <option>Asian</option>
            <option>Caucasian</option>
            <option>Black</option>
            <option>etc</option>
          </select>
        </div>
        <div id="meeting-input">
          <div className="text-base text-black">Meeting interests</div>
          <select
            className="border bg-white rounded-lg p-3 w-[27.9rem]"
            id="meeting"
            name="meeting"
            onChange={formik.handleChange}
            value={formik.values.meeting}
          >
            <option>friends</option>
            <option>partners</option>
            <option>long-term commitment</option>
            <option>etc</option>
          </select>
        </div>
      </div>
      <div id="input-container-3" className="flex justify-around">
        <div id="hobbies-interests-input">
          <div className="text-base text-black">
            Hobbies / Interests (Maximum 10)
          </div>
          <input
            className="border bg-white rounded-lg p-3 w-[66rem] focus:border-purple-500 outline-none"
            id="hobbiesInterests"
            name="hobbiesInterests"
            type="text"
            placeholder="Hobbies Interests"
            onChange={formik.handleChange}
            value={formik.values.hobbiesInterests}
          />
        </div>
      </div>
    </form>
  );
};

export const Step3 = ({ formik }) => {
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500  pb-6">
        Profile pictures
        <div className=" text-gray-800 text-base">Upload at least 2 photos</div>
      </div>
      <div id="input-container-1" className="flex justify-around">
        <input id="picture1" name="picture1" type="file"></input>
        <input id="picture2" name="picture2" type="file"></input>
        <input id="picture3" name="picture3" type="file"></input>
        <input id="picture4" name="picture4" type="file"></input>
      </div>
    </form>
  );
};

import { useEffect, useState } from "react";
import { InputField, SelectInputField } from "./InputField";
import TagsInput from "./TagInput";
import axios from "axios";
export const Step1 = ({ formik }) => {
  const [country, setCountry] = useState([]);
  const getCountry = async () => {
    try {
      const result = await axios.get("http://localhost:3000/register/country");
      setCountry(result.data.country_name);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    getCountry();
  }, []);
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">Basic Information</div>
      <div id="input-container-1" className="flex justify-between">
        <InputField
          formik={formik}
          fieldName="name"
          label="Name"
          type="text"
          placeholder="Name"
        />
        <div id="date-of-birth-input">
          <div className="text-base text-black">Date of birth</div>
          <div
            className={`relative ${
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg`}
          >
            <input
              className={`border bg-white rounded-lg p-3 w-[27.9rem] text-black focus:border-purple-500 outline-none ${
                formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  ? "border-red-500"
                  : ""
              }`}
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
              <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                <img src="public/images/alert_error_icon.svg" />
              </div>
            ) : (
              <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                <img src="public/images/dateIcon.svg" />
              </div>
            )}
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <p className=" text-red-500">{formik.errors.dateOfBirth}</p>
          )}
        </div>
      </div>
      <div id="input-container-2" className="flex justify-between">
        <SelectInputField
          formik={formik}
          fieldName="location"
          label="Location"
          options={country.map((countryName) => ({
            value: countryName,
            label: countryName,
          }))}
          placeholder="Location"
        />
        <SelectInputField
          formik={formik}
          fieldName="city"
          label="City"
          options={[
            { label: "Bangkok", value: "Bangkok" },
            { label: "Chiang Mai", value: "Chiang Mai" },
            { label: "etc", value: "etc" },
          ]}
          placeholder="City"
        />
      </div>
      <div id="input-container-3" className="flex justify-between">
        <InputField
          formik={formik}
          fieldName="username"
          label="Username"
          type="text"
          placeholder="At least 6 characters"
        />
        <InputField
          formik={formik}
          fieldName="email"
          label="Email"
          type="email"
          placeholder="name@website.com"
        />
      </div>
      <div id="input-container-4" className="flex justify-between">
        <InputField
          formik={formik}
          fieldName="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
        />
        <InputField
          formik={formik}
          fieldName="confirmPassword"
          label="confirmPassword"
          type="password"
          placeholder="At least 8 characters"
        />
      </div>
    </form>
  );
};

export const Step2 = ({ formik }) => {
  const [gender, setGender] = useState([]);
  const [genderInterests, setGenderInterests] = useState([]);
  const [racial, setRacial] = useState([]);
  const [relation, setRelation] = useState([]);
  const getGender = async () => {
    try {
      const result = await axios.get("http://localhost:3000/register/gender");
      setGender(result.data.gender_name);
      setGenderInterests(result.data.gender_name);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const getRacial = async () => {
    try {
      const result = await axios.get("http://localhost:3000/register/racial");
      setRacial(result.data.racial_name);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const getRelation = async () => {
    try {
      const result = await axios.get("http://localhost:3000/register/relation");
      setRelation(result.data.relation_name);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    getGender(), getRacial(), getRelation();
  }, []);
  return (
    <form className="flex flex-col gap-10 pb-10" onSubmit={formik.handleSubmit}>
      <div className="text-2xl text-purple-500 pb-6">
        Identities and Interests
      </div>
      <div id="input-container-1" className="flex justify-between">
        <SelectInputField
          formik={formik}
          fieldName="gender"
          label="Sexual identities"
          options={gender.map((genderName) => ({
            value: genderName,
            label: genderName,
          }))}
          placeholder="Sexual identities"
        />
        <SelectInputField
          formik={formik}
          fieldName="genderInterests"
          label="Sexual preferences"
          options={genderInterests.map((genderInterestsName) => ({
            value: genderInterestsName,
            label: genderInterestsName,
          }))}
          placeholder="Sexual preferences"
        />
      </div>
      <div id="input-container-2" className="flex justify-between">
        <SelectInputField
          formik={formik}
          fieldName="racial"
          label="Racial preferences"
          options={racial.map((racialName) => ({
            value: racialName,
            label: racialName,
          }))}
          placeholder="Racial preferences"
        />
        <SelectInputField
          formik={formik}
          fieldName="meeting"
          label="Meeting interests"
          options={relation.map((relationName) => ({
            value: relationName,
            label: relationName,
          }))}
          placeholder="Meeting interests"
        />
      </div>
      <div id="input-container-3" className="flex justify-around">
        <div id="hobbies-interests-input">
          <div className="text-base text-black">
            Hobbies / Interests (Maximum 10)
          </div>
          <TagsInput
            formik={formik}
            tags={formik.values.hobbiesInterests}
            setTags={(tags) => formik.setFieldValue("hobbiesInterests", tags)}
            error={
              formik.touched.hobbiesInterests && formik.errors.hobbiesInterests
            }
          />
          {formik.touched.hobbiesInterests &&
            formik.errors.hobbiesInterests && (
              <p className=" text-red-500">{formik.errors.hobbiesInterests}</p>
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

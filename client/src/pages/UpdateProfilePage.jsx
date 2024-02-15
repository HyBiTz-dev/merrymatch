import { Formik, useFormik } from "formik";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { InputField, SelectInputField } from "../components/InputField";
import TagsInput from "../components/TagInput";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateProfilePage() {
  const [userData, setUserData] = useState({});
  const [country, setCountry] = useState([]);
  const [city, SetCity] = useState([]);
  const [gender, setGender] = useState([]);
  const [genderInterests, setGenderInterests] = useState([]);
  const [racial, setRacial] = useState([]);
  const [relation, setRelation] = useState([]);
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const param = useParams();
  const getUserData = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/user/${param.id}`);
      setUserData(result.data.userData[0]);
      setUploadedPictures(result.data.userData[0].image_url);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const getData = async (dataType) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/user/data?dataType=${dataType}`
      );
      switch (dataType) {
        case "country":
          setCountry(result.data[dataType]);
          break;
        case "gender":
          setGender(result.data[dataType]);
          setGenderInterests(result.data[dataType]);
          break;
        case "racial":
          setRacial(result.data[dataType]);
          break;
        case "relation":
          setRelation(result.data[dataType]);
          break;
        default:
          console.error("Invalid dataType");
      }
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
    }
  };
  const getCity = async () => {
    const countryId = formik.values.country;
    if (!countryId) {
      console.error("No country_id provided");
      SetCity([]);
      return;
    }
    try {
      const result = await axios.get(
        `http://localhost:3000/user/data?dataType=city&country_id=${formik.values.country}`
      );
      const dataCity = result.data.city[0].city_id.map((id, index) => ({
        value: id,
        label: result.data.city[0].city_name[index],
      }));
      SetCity(dataCity);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      country: null,
      city: null,
      username: "",
      email: "",
      gender: null,
      genderInterests: null,
      racial: null,
      meeting: null,
      hobbiesInterests: [],
      description: "",
      profilePictures: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(64, "Must be 64 characters or less")
        .required("Required"),
      dateOfBirth: Yup.date()
        .required("Required")
        .test(
          "is-over-18",
          "You must be at least 18 years old",
          function (value) {
            const currentDate = new Date();
            const userDate = new Date(value);
            const userAge = currentDate.getFullYear() - userDate.getFullYear();
            return userAge >= 18;
          }
        ),
      location: Yup.string().nullable(false).required("Required"),
      city: Yup.string().nullable(false).required("Required"),
      username: Yup.string()
        .max(64, "Must be 64 characters or less")
        .min(6, "Must be at least 6 character")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      gender: Yup.string().nullable(false).required("Required"),
      genderInterests: Yup.string().nullable(false).required("Required"),
      racial: Yup.string().nullable(false).required("Required"),
      meeting: Yup.string().nullable(false).required("Required"),
      hobbiesInterests: Yup.array()
        .min(1, "Must be at least 1 hobbies Interests or less")
        .max(10, "Must be 10 hobbies Interests or less")
        .required("Required"),
      profilePictures: Yup.array()
        .test(
          "min-two-pictures",
          "Upload at least 2 pictures",
          function (pictures) {
            const uploadedCount = uploadedPictures.length;
            const newUploadCount = pictures.length;
            return uploadedCount + newUploadCount >= 2;
          }
        )
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
    validateOnChange: false,
    validateOnBlur: true,
  });
  useEffect(() => {
    getUserData();
  }, [param.id]);
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      formik.setValues({
        name: userData.name || "",
        dateOfBirth: userData.date_of_birth || "",
        country: userData.country_id || null,
        city: userData.city_id || null,
        username: userData.username || "",
        email: userData.email || "",
        gender: userData.gender_id || null,
        genderInterests: userData.gender_interest_id || null,
        racial: userData.racial_id || null,
        meeting: userData.relation_interest_id || null,
        hobbiesInterests: userData.hobbie_interest_array || [],
        description: userData.description || "",
        profilePictures: [],
      });
    }
  }, [userData]);
  useEffect(() => {
    getData("country");
    getData("gender");
    getData("racial");
    getData("relation");
  }, []);
  useEffect(() => {
    getCity();
  }, [formik.values.country]);
  const totalPictures =
    uploadedPictures.length + formik.values.profilePictures.length;
  const uploadSlots = Math.max(5 - totalPictures, 0);

  const handleRemoveUploadedPicture = (index) => {
    const newPictures = uploadedPictures.filter((_, i) => i !== index);
    setUploadedPictures(newPictures);
  };

  return (
    <>
      <Navbar auth />
      <div className="flex flex-col items-center w-full h-full bg-main py-20 gap-20">
        <header className="flex w-[58.188rem] pb-20 pt-20 justify-evenly items-end">
          <div className="flex flex-col w-[32rem]">
            <div className=" text-beige-700 font-semibold">PROFILE</div>
            <div className=" text-purple-500 text-5xl font-extrabold">
              let's make profile <br />
              to let other know you
            </div>
          </div>
          <div className="flex gap-4">
            <Button secondary>Preview Profile</Button>
            <Button
              primary
              type="submit"
              onClick={async () => {
                formik.handleSubmit();
              }}
            >
              Update Profile
            </Button>
          </div>
        </header>
        <form className="flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <div className="text-2xl text-purple-500">Basic Information</div>
            <div className="flex justify-between gap-6">
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
            <div className="flex justify-between gap-6">
              <SelectInputField
                formik={formik}
                fieldName="country"
                label="Location"
                options={country.map((countryName) => ({
                  value: countryName.id,
                  label: countryName.country_name,
                }))}
                placeholder="Location"
              />
              <SelectInputField
                formik={formik}
                fieldName="city"
                label="City"
                options={city}
                placeholder="City"
              />
            </div>
            <div className="flex justify-between gap-6">
              <InputField
                formik={formik}
                fieldName="username"
                label="Username"
                type="text"
                placeholder="At least 6 charactor"
              />
              <InputField
                formik={formik}
                fieldName="email"
                label="Email"
                type="email"
                placeholder="name@website.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-2xl text-purple-500">
              Identities and Interests
            </div>
            <div className="flex justify-between">
              <SelectInputField
                formik={formik}
                fieldName="gender"
                label="Sexual identities"
                options={gender.map((genderName) => ({
                  value: genderName.id,
                  label: genderName.name,
                }))}
                placeholder="Sexual identities"
              />
              <SelectInputField
                formik={formik}
                fieldName="genderInterests"
                label="Sexual preferences"
                options={genderInterests.map((genderInterestsName) => ({
                  value: genderInterestsName.id,
                  label: genderInterestsName.name,
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
                  value: racialName.id,
                  label: racialName.name,
                }))}
                placeholder="Racial preferences"
              />
              <SelectInputField
                formik={formik}
                fieldName="meeting"
                label="Meeting interests"
                options={relation.map((relationName) => ({
                  value: relationName.id,
                  label: relationName.name,
                }))}
                placeholder="Meeting interests"
              />
            </div>
            <div>
              <div className="text-base text-black">
                Hobbies / Interests (Maximum 10)
              </div>
              <TagsInput
                formik={formik}
                tags={formik.values.hobbiesInterests}
                setTags={(tags) =>
                  formik.setFieldValue("hobbiesInterests", tags)
                }
                error={
                  formik.touched.hobbiesInterests &&
                  formik.errors.hobbiesInterests
                }
              />
              {formik.touched.hobbiesInterests &&
                formik.errors.hobbiesInterests && (
                  <p className=" text-red-500">
                    {formik.errors.hobbiesInterests}
                  </p>
                )}
            </div>
            <div>
              <div className="text-base text-black">
                About me(Maximum 150 characters)
              </div>
              <div
                className={`relative ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg`}
              >
                <input
                  className={` border bg-white rounded-lg p-3 pr-4 w-[66rem] h-32 text-black focus:border-purple-500 outline-none ${
                    formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : ""
                  }`}
                  id="description"
                  name="description"
                  placeholder="Enter your description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-full text-2xl text-purple-500 pb-6">
              Profile pictures
              <div className="text-gray-800 text-base">
                Upload at least 2 photos
              </div>
            </div>
            <div className="flex gap-6">
              {uploadedPictures.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Uploaded Picture ${index}`}
                    className="w-[10.5rem] h-[10.5rem] object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                    onClick={() => handleRemoveUploadedPicture(index)}
                  >
                    x
                  </button>
                </div>
              ))}
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
              {[...Array(uploadSlots)].map((_, index) => (
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
            </div>
            {formik.errors && formik.errors.profilePictures && (
              <p>{formik.errors.profilePictures}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button className=" py-1 px-2 font-bold text-gray-700 ">
              Delete account
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
export default UpdateProfilePage;

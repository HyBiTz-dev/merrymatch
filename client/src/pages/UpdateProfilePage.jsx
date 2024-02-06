import { Formik, useFormik } from "formik";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { InputField, SelectInputField } from "../components/InputField";
import TagsInput from "../components/TagInput";

function UpdateProfilePage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      location: null,
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
  });
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
            <Button primary>Update Profile</Button>
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
                fieldName="location"
                label="Location"
                options={[
                  { label: "Thailand", value: "Thailand" },
                  { label: "China", value: "China" },
                  { label: "etc", value: "etc" },
                ]}
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
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Non-binary", value: "Non-binary" },
                  { label: "etc", value: "etc" },
                ]}
                placeholder="Sexual identities"
              />
              <SelectInputField
                formik={formik}
                fieldName="genderInterests"
                label="Sexual preferences"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Non-binary", value: "Non-binary" },
                  { label: "etc", value: "etc" },
                ]}
                placeholder="Sexual preferences"
              />
            </div>
            <div id="input-container-2" className="flex justify-between">
              <SelectInputField
                formik={formik}
                fieldName="racial"
                label="Racial preferences"
                options={[
                  { label: "Asian", value: "Asian" },
                  { label: "Caucasian", value: "Caucasian" },
                  { label: "Black", value: "Black" },
                  { label: "etc", value: "etc" },
                ]}
                placeholder="Racial preferences"
              />
              <SelectInputField
                formik={formik}
                fieldName="meeting"
                label="Meeting interests"
                options={[
                  { label: "friends", value: "friends" },
                  { label: "partners", value: "partners" },
                  {
                    label: "long-term commitment",
                    value: "long-term commitment",
                  },
                  { label: "etc", value: "etc" },
                ]}
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
                  value=""
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
              {[...Array(5 - formik.values.profilePictures.length)].map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-[10.5rem] h-[10.5rem] border bg-gray-200 rounded-lg flex justify-center items-center"
                  >
                    <label
                      htmlFor="picture-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="text-purple-600 text-base">+</div>
                      <div className="text-purple-600 text-sm">
                        Upload photo
                      </div>
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
                )
              )}
              {formik.errors && formik.errors.profilePictures && (
                <p>{formik.errors.profilePictures}</p>
              )}
            </div>
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

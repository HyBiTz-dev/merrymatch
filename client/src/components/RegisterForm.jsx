import { useEffect, useState } from "react";
import { InputField, SelectInputField } from "./InputField";
import TagsInput from "./TagInput";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export const Step1 = ({ formik }) => {
  const [country, setCountry] = useState([]);
  const [city, SetCity] = useState([]);
  const getCountry = async () => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_ENDPOINT
        }/register/data?dataType=country`
      );
      setCountry(result.data.country);
    } catch (error) {
      console.error("Error fetching countries:", error);
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
        `${
          import.meta.env.VITE_APP_BASE_ENDPOINT
        }/user/data?dataType=city&country_id=${formik.values.country}`
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
  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    getCity();
  }, [formik.values.country]);
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
  const getData = async (dataType) => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_ENDPOINT
        }/user/data?dataType=${dataType}`
      );
      switch (dataType) {
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
  useEffect(() => {
    getData("gender");
    getData("racial");
    getData("relation");
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
  const SortableItem = ({ id, picture, index }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative ${isDragging}`}
      >
        <img
          src={URL.createObjectURL(picture)}
          alt={`Picture ${index + 1}`}
          className="relative w-[10.5rem] h-[10.5rem] object-cover rounded-lg"
        />
        <button
          type="button"
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 z-50"
          onClick={() => {
            const newPictures = [...formik.values.profilePictures];
            newPictures.splice(index, 1);
            formik.setFieldValue("profilePictures", newPictures);
          }}
        >
          x
        </button>
      </div>
    );
  };
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = formik.values.profilePictures.findIndex(
        (picture) => picture.name === active.id
      );
      const newIndex = formik.values.profilePictures.findIndex(
        (picture) => picture.name === over.id
      );
      if (oldIndex !== -1 && newIndex !== -1) {
        formik.setFieldValue(
          "profilePictures",
          arrayMove(formik.values.profilePictures, oldIndex, newIndex)
        );
      }
    }
  };
  return (
    <form
      className="flex flex-wrap justify-between gap-6 pb-10"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-full text-2xl text-purple-500 pb-6">
        Profile pictures
        <div className="text-gray-800 text-base">Upload at least 2 photos</div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formik.values.profilePictures.map((picture) => picture.name)}
          strategy={horizontalListSortingStrategy}
        >
          {formik.values.profilePictures.map((picture, index) => (
            <SortableItem
              key={picture.name}
              id={picture.name}
              picture={picture}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
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
              multiple
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
        <p className=" text-red-500">{formik.errors.profilePictures}</p>
      )}
    </form>
  );
};

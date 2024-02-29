import React from "react";
import { InputField, SelectInputField } from "./InputField";
import TagsInput from "./TagInput";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const BasicInformation = ({ formik, country, city }) => {
  return (
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
                <img src="/images/alert_error_icon.svg" />
              </div>
            ) : (
              <div className="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                <img src="/images/dateIcon.svg" />
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
    </div>
  );
};

export const IdentitiesInterests = ({
  formik,
  gender,
  genderInterests,
  racial,
  relation,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-2xl text-purple-500">Identities and Interests</div>
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
      <div className="flex justify-between">
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
        <TagsInput
          formik={formik}
          tags={formik.values.hobbiesInterests}
          setTags={(tags) => formik.setFieldValue("hobbiesInterests", tags)}
          error={
            formik.touched.hobbiesInterests && formik.errors.hobbiesInterests
          }
        />
      </div>
      <div>
        <div className="text-base text-black">
          About me (Maximum 150 characters)
        </div>
        <input
          className="border bg-white rounded-lg p-3 pr-4 w-full h-32 text-black focus:border-purple-500 outline-none"
          id="description"
          name="description"
          placeholder="Enter your description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
    </div>
  );
};

export const ProfilePictures = ({
  formik,
  pictures,
  uploadSlots,
  sensors,
  handleDragEnd,
  handleRemoveUploadedPicture,
}) => {
  const SortableItem = ({ id, picture, index }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative ${isDragging ? "opacity-50" : ""}`}
      >
        <img
          src={
            picture.type === "uploaded"
              ? picture.url
              : URL.createObjectURL(picture.file)
          }
          alt={`Picture ${index + 1}`}
          className="relative w-[10.5rem] h-[10.5rem] object-cover rounded-lg"
        />
        <button
          type="button"
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 z-50"
          onMouseDown={() => handleRemoveUploadedPicture(picture, index)}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full text-2xl text-purple-500 pb-6">
        Profile pictures
        <div className="text-gray-800 text-base">Upload at least 2 photos</div>
      </div>
      <div className="flex gap-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pictures.map((picture) => picture.id)}
            strategy={horizontalListSortingStrategy}
          >
            {pictures.map((picture, index) => (
              <SortableItem
                key={picture.id}
                id={picture.id}
                picture={picture}
                index={index}
              />
            ))}
          </SortableContext>
        </DndContext>
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
        <p className="text-red-500">{formik.errors.profilePictures}</p>
      )}
    </div>
  );
};

import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authentication";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProfileModal from "../components/Modal/ProfileModal";
import AlertModal from "../components/Modal/AlertModal";
import Toast from "../components/Toast";
import {
  BasicInformation,
  IdentitiesInterests,
  ProfilePictures,
} from "../components/UpdataForm";

import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function UpdateProfilePage() {
  const { logout } = useAuth();
  const param = useParams();
  const [userData, setUserData] = useState({});
  const [country, setCountry] = useState([]);
  const [city, SetCity] = useState([]);
  const [gender, setGender] = useState([]);
  const [genderInterests, setGenderInterests] = useState([]);
  const [racial, setRacial] = useState([]);
  const [relation, setRelation] = useState([]);
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const [deletePictures, setDeletePictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const imgArray = [];

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
            let userAge = currentDate.getFullYear() - userDate.getFullYear();

            if (
              currentDate.getMonth() < userDate.getMonth() ||
              (currentDate.getMonth() === userDate.getMonth() &&
                currentDate.getDate() < userDate.getDate())
            ) {
              userAge--;
            }
            return userAge >= 18;
          }
        ),
      country: Yup.string().nullable(false).required("Required"),
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
        .min(1, "Must be at least 1 hobbies Interests")
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
      description: Yup.string().max(150, "Must be 150 characters or less"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("genderInterests", values.genderInterests);
      formData.append("racial", values.racial);
      formData.append("meeting", values.meeting);
      formData.append("hobbiesInterests", values.hobbiesInterests);
      formData.append("description", values.description);
      formData.append("uploadedPicture", JSON.stringify(uploadedPictures));
      formData.append("deletePictures", JSON.stringify(deletePictures));
      formData.append("userId", userData.id);
      formData.append("age", calculateAge(formik.values.dateOfBirth));
      values.profilePictures.forEach((file) => {
        formData.append("profilePictures", file, file.name);
      });
      formData.append("reorderedPictures", JSON.stringify(pictures));
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user/${param.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });
  const [pictures, setPictures] = useState([
    ...uploadedPictures.map((picture) => ({
      id: `uploaded-${picture}`,
      url: picture,
      type: "uploaded",
    })),
    ...formik.values.profilePictures.map((file) => ({
      id: file.name,
      file: file,
      type: "file",
    })),
  ]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openAlert = () => {
    setShowAlert(true);
  };
  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    getUserData();
    getData("country");
    getData("gender");
    getData("racial");
    getData("relation");
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
        meeting: userData.relation_id || null,
        hobbiesInterests: userData.hobbie_interest_array || [],
        description: userData.description || "",
        profilePictures: [],
      });
    }
  }, [userData]);
  useEffect(() => {
    getCity();
  }, [formik.values.country]);
  useEffect(() => {
    setPictures([
      ...uploadedPictures.map((picture) => ({
        id: `uploaded-${picture}`,
        url: picture,
        type: "uploaded",
      })),
      ...formik.values.profilePictures.map((file) => ({
        id: file.name,
        file: file,
        type: "file",
      })),
    ]);
  }, [uploadedPictures, formik.values.profilePictures]);
  useEffect(() => {
    if (Object.keys(formik.errors).length > 0) {
      setShowToastError(true);
      const timer = setTimeout(() => {
        setShowToastError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formik.errors]);

  const getUserData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user/${param.id}`
      );
      setUserData(result.data.userData[0]);
      setUploadedPictures(result.data.userData[0].image_url);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getData = async (dataType) => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_ENDPOINT
        }/user/data?dataType=${dataType}`
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

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  const handleOnDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_ENDPOINT}/user/${param.id}`,
        {
          data: {
            userId: userData.id,
            uploadedPicture: JSON.stringify(uploadedPictures),
          },
        }
      );
      logout();
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const totalPictures = pictures.length;
  const uploadSlots = Math.max(5 - totalPictures, 0);
  const handleRemoveUploadedPicture = (picture) => {
    if (picture.type === "uploaded") {
      const newUploadedPictures = uploadedPictures.filter(
        (p) => p !== picture.url
      );
      setUploadedPictures(newUploadedPictures);
      setDeletePictures([...deletePictures, picture.url]);
    } else {
      const newProfilePictures = formik.values.profilePictures.filter(
        (file) => file.name !== picture.file.name
      );
      formik.setFieldValue("profilePictures", newProfilePictures);
    }

    const newPictures = pictures.filter((p) => p.id !== picture.id);
    setPictures(newPictures);
  };

  const previewImg = formik.values.profilePictures.map((picture, index) => {
    imgArray.push(URL.createObjectURL(picture));
  });

  const previewData = {
    ...formik.values,
    country_name: country.find((c) => c.id === formik.values.country)
      ?.country_name,
    city_name: city.find((c) => c.value === formik.values.city)?.label,
    gender_name: gender.find((g) => g.id === formik.values.gender)?.name,
    gender_interest_name: genderInterests.find(
      (gi) => gi.id === formik.values.genderInterests
    )?.name,
    racial_name: racial.find((r) => r.id === formik.values.racial)?.name,
    relation_interest_name: relation.find((m) => m.id === formik.values.meeting)
      ?.name,
    age: calculateAge(formik.values.dateOfBirth),
    hobbie_interest_array: formik.values.hobbiesInterests,
    image_url: pictures.map((picture) => {
      if (picture.type === "uploaded") {
        return picture.url;
      } else if (picture.file) {
        return URL.createObjectURL(picture.file);
      }
      return null;
    }),
  };
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = pictures.findIndex(
        (picture) => picture.id === active.id
      );
      const newIndex = pictures.findIndex((picture) => picture.id === over.id);
      const newArray = arrayMove(pictures, oldIndex, newIndex);
      setPictures(newArray);
    }
  };

  return (
    <>
      <Navbar auth />
      <div className="flex flex-col items-center w-full h-full bg-main py-20 gap-20">
        <header className="flex w-[58.188rem] pb-20 pt-20 justify-evenly items-end">
          <ProfileModal
            isOpen={showModal}
            onClose={closeModal}
            profileData={previewData}
          />
          <AlertModal
            DeleteModal
            isOpen={showAlert}
            onClose={closeAlert}
            isConfirm={handleOnDelete}
          >
            Do you sure to delete accouct?
          </AlertModal>
          <div className="flex flex-col w-[32rem]">
            <div className=" text-beige-700 font-semibold">PROFILE</div>
            <div className=" text-purple-500 text-5xl font-extrabold">
              let's make profile <br />
              to let other know you
            </div>
          </div>
          <div className="flex gap-4">
            <Button secondary type="button" onClick={openModal}>
              Preview Profile
            </Button>
            <Button
              primary
              type="submit"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Update Profile
            </Button>
          </div>
        </header>
        <form className="flex flex-col gap-20" onSubmit={formik.handleSubmit}>
          <BasicInformation formik={formik} country={country} city={city} />
          <IdentitiesInterests
            formik={formik}
            gender={gender}
            genderInterests={genderInterests}
            racial={racial}
            relation={relation}
          />
          <ProfilePictures
            formik={formik}
            pictures={pictures}
            uploadSlots={uploadSlots}
            sensors={sensors}
            handleDragEnd={handleDragEnd}
            handleRemoveUploadedPicture={handleRemoveUploadedPicture}
          />
          <div className="flex justify-end">
            <button
              className=" py-1 px-2 font-bold text-gray-700 "
              type="button"
              onClick={openAlert}
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
      <Footer />
      {showToastError && (
        <Toast error text="Please fill in the complete information." />
      )}
      {showToast && <Toast success text="Update complete!!!" />}
    </>
  );
}
export default UpdateProfilePage;

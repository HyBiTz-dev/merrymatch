import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import sql from "../utils/db.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.get("/", async (req, res) => {
  const userQuery = req.query.userId;
  if (userQuery) {
    const { data: user_profile, error } = await supabase
      .from("user_profile_view")
      .select("*")
      .eq("user_id", userQuery);
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user_profile);
  } else {
    const { data: user_profile, error } = await supabase
      .from("user_profile_view")
      .select("*");
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user_profile);
  }
});

userRouter.get("/matching/:id", async (req, res) => {
  const { id } = req.params;
  const search = req.query;
  const { data: all_profile, error } = await supabase
    .from("user_profile_view")
    .select("*")
    .neq("role_name", "Admin");

  const { data: received_ids, error: error_like } = await supabase
    .from("like_user")
    .select("user_profile_id_received")
    .eq("user_profile_id_given", id);

  const matchUser = received_ids.map((item) => item.user_profile_id_received);

  const user_profile = all_profile.filter((item) => item.user_id !== id);

  const currentUser = all_profile.filter((item) => item.user_id === id);

  const result = user_profile.filter((item) => {
    if (
      search.default_interest &&
      search.gender_interest_1 &&
      search.gender_interest_2
    ) {
      return (
        !matchUser.includes(item.user_id) &&
        Number(search.age_range[0]) <= item.age &&
        item.age <= Number(search.age_range[1])
      );
    } else if (search.default_interest && search.gender_interest_1) {
      return (
        (!matchUser.includes(item.user_id) &&
          item.gender_name === search.default_interest) ||
        (item.gender_name === search.gender_interest_1 &&
          Number(search.age_range[0]) <= item.age &&
          item.age <= Number(search.age_range[1]))
      );
    } else if (search.default_interest && search.gender_interest_2) {
      return (
        (!matchUser.includes(item.user_id) &&
          item.gender_name === search.default_interest) ||
        (item.gender_name === search.gender_interest_2 &&
          Number(search.age_range[0]) <= item.age &&
          item.age <= Number(search.age_range[1]))
      );
    } else if (search.gender_interest_1 && search.gender_interest_2) {
      return (
        (!matchUser.includes(item.user_id) &&
          item.gender_name === search.gender_interest_1) ||
        (item.gender_name === search.gender_interest_2 &&
          Number(search.age_range[0]) <= item.age &&
          item.age <= Number(search.age_range[1]))
      );
    } else if (search.default_interest) {
      return (
        !matchUser.includes(item.user_id) &&
        item.gender_name === search.default_interest &&
        Number(search.age_range[0]) <= item.age &&
        item.age <= Number(search.age_range[1])
      );
    } else if (search.gender_interest_1) {
      return (
        !matchUser.includes(item.user_id) &&
        item.gender_name === search.gender_interest_1 &&
        Number(search.age_range[0]) <= item.age &&
        item.age <= Number(search.age_range[1])
      );
    } else if (search.gender_interest_2) {
      return (
        !matchUser.includes(item.user_id) &&
        item.gender_name === search.gender_interest_2 &&
        Number(search.age_range[0]) <= item.age &&
        item.age <= Number(search.age_range[1])
      );
    } else if (Object.keys(search).length !== 0) {
      return (
        !matchUser.includes(item.user_id) &&
        Number(search.age_range[0]) <= item.age &&
        item.age <= Number(search.age_range[1])
      );
    } else {
      return (
        !matchUser.includes(item.user_id) &&
        item.gender_name === currentUser[0].gender_interest_name
      );
    }
  });

  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json({ result });
});

userRouter.get("/data", async (req, res) => {
  const { dataType, country_id } = req.query;

  try {
    let data, error;
    switch (dataType) {
      case "country":
        ({ data, error } = await supabase.from("country").select("*"));
        break;
      case "city":
        if (!country_id) {
          return res
            .status(400)
            .json({ message: "Country ID is required for cities." });
        }
        ({ data, error } = await supabase
          .from("country_city_view_2")
          .select("city_name,city_id")
          .eq("id", country_id));
        break;
      case "gender":
        ({ data, error } = await supabase.from("gender").select("*"));
        break;
      case "racial":
        ({ data, error } = await supabase.from("racial").select("*"));
        break;
      case "relation":
        ({ data, error } = await supabase
          .from("relation_interest")
          .select("*"));
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid data type requested." });
    }

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json({ [dataType]: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { data: userData, error } = await supabase
      .from("user_profile_view")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
userRouter.put("/:id", upload.array("profilePictures", 5), async (req, res) => {
  const userUUId = req.params.id;
  try {
    const {
      email,
      name,
      dateOfBirth,
      country,
      city,
      username,
      gender,
      genderInterests,
      racial,
      meeting,
      hobbiesInterests,
      description,
      uploadedPicture,
      deletePictures,
      userId,
      age,
      reorderedPictures,
    } = req.body;
    const hobbiesInterestsArray = req.body.hobbiesInterests.split(",");
    let uploadPicArray = JSON.parse(req.body.uploadedPicture);
    const files = req.files;
    const reorderedPicturesArray = JSON.parse(req.body.reorderedPictures);
    reorderedPicturesArray.forEach((picture) => {
      if (picture.type === "file") {
        const fileDetails = files.find(
          (file) => file.originalname === picture.id
        );
        if (fileDetails) {
          picture.file = fileDetails;
        }
      }
    });
    const deletePicArray = JSON.parse(req.body.deletePictures);
    const { data: countryCity, error: countryCityError } = await supabase
      .from("country_city")
      .select("id")
      .eq("country_id", country)
      .eq("city_id", city);
    if (countryCityError) {
      return res.status(400).json({ message: countryCityError.message });
    }
    const { data: userProfile, error: profileError } = await supabase
      .from("user_profile")
      .update({
        name: name,
        gender_id: gender,
        country_city_id: countryCity[0].id,
        date_of_birth: dateOfBirth,
        gender_interest_id: genderInterests,
        username: username,
        description: description,
        age: age,
      })
      .eq("user_id", userUUId)
      .select();
    if (profileError) {
      return res.status(400).json({ message: profileError.message });
    }
    const { data: racialData, error: racialDataError } = await supabase
      .from("racial_user_profile")
      .update([{ racial_id: racial }])
      .eq("user_profile_id", userUUId)
      .select();
    if (racialDataError) {
      return res.status(400).json({ message: racialDataError.message });
    }
    const { data: relationData, error: relationDataError } = await supabase
      .from("relation_interest_user_profile")
      .update([
        {
          relation_id: meeting,
        },
      ])
      .eq("user_profile_id", userUUId)
      .select();
    if (relationDataError) {
      return res.status(400).json({ message: relationDataError.message });
    }
    const { data: hobbieData, error: hobbieDataError } = await supabase
      .from("hobbie_interest")
      .update([
        {
          hobbie_interest_array: hobbiesInterestsArray,
        },
      ])
      .eq("user_profile_id", userUUId)
      .select();
    if (hobbieDataError) {
      return res.status(400).json({ message: hobbieDataError.message });
    }
    const newPicArray = [];
    if (deletePicArray.length === 0 && req.files.length !== 0) {
      reorderedPicturesArray.map((item) => {
        if (item.type === "uploaded") {
          newPicArray.push(item.url);
        } else {
          const file = item.file;
          const fileExtension = file.originalname.split(".").pop();
          const fileName = `profile-${uuidv4()}.${fileExtension}`;
          const { data: ImageUpload, error: ImageUploadError } =
            supabase.storage
              .from("images/profile")
              .upload(fileName, file.buffer, {
                contentType: file.mimetype,
              });
          if (ImageUploadError) {
            return res.status(400).json({ message: ImageUploadError.message });
          }
          const { data } = supabase.storage
            .from("images/profile")
            .getPublicUrl(fileName);
          newPicArray.push(data.publicUrl);
        }
      });
    } else if (deletePicArray.length !== 0 && req.files.length !== 0) {
      reorderedPicturesArray.map((item) => {
        if (item.type === "uploaded") {
          newPicArray.push(item.url);
        } else {
          const file = item.file;
          const fileExtension = file.originalname.split(".").pop();
          const fileName = `profile-${uuidv4()}.${fileExtension}`;
          const { data: ImageUpload, error: ImageUploadError } =
            supabase.storage
              .from("images/profile")
              .upload(fileName, file.buffer, {
                contentType: file.mimetype,
              });
          if (ImageUploadError) {
            return res.status(400).json({ message: ImageUploadError.message });
          }
          const { data } = supabase.storage
            .from("images/profile")
            .getPublicUrl(fileName);
          newPicArray.push(data.publicUrl);
        }
      });
      for (let i = 0; i < deletePicArray.length; i++) {
        const imagePath = deletePicArray[i];
        const path = imagePath.replace(
          "https://dlceurosjrzecltovrjb.supabase.co/storage/v1/object/public/images/",
          ""
        );
        const { data: deleteImgData, error: deleteImgDataError } =
          await supabase.storage.from("images").remove([path]);
        if (deleteImgDataError) {
          return res
            .status(400)
            .json({ messagedeleteimg: deleteImgDataError.message });
        }
      }
    } else if (deletePicArray.length !== 0 && req.files.length === 0) {
      reorderedPicturesArray.map((item) => newPicArray.push(item.url));
      for (let i = 0; i < deletePicArray.length; i++) {
        const imagePath = deletePicArray[i];
        const path = imagePath.replace(
          "https://dlceurosjrzecltovrjb.supabase.co/storage/v1/object/public/images/",
          ""
        );
        const { data: deleteImgData, error: deleteImgDataError } =
          await supabase.storage.from("images").remove([path]);
        if (deleteImgDataError) {
          return res
            .status(400)
            .json({ messagedeleteimg: deleteImgDataError.message });
        }
      }
    } else if (deletePicArray.length === 0 && req.files.length === 0) {
      reorderedPicturesArray.map((item) => newPicArray.push(item.url));
    }
    const { data: userImage, error: userImageError } = await supabase
      .from("user_image")
      .update([{ image_url: newPicArray }])
      .eq("user_profile_id", userUUId)
      .select();
    if (userImageError) {
      return res.status(400).json({ message: userImageError.message });
    }
    return res.json({
      message: "Update complete",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const userUUId = req.params.id;
  try {
    const { userId, uploadedPicture } = req.body;
    let uploadPicArray = JSON.parse(uploadedPicture);

    const { data: deleteRacial, error: deleteRacialError } = await supabase
      .from("racial_user_profile")
      .delete()
      .eq("user_profile_id", userUUId);
    if (deleteRacialError) {
      return res.status(400).json({ message: deleteRacialError.message });
    }
    const { data: deleteRelation, error: deleteRelationError } = await supabase
      .from("relation_interest_user_profile")
      .delete()
      .eq("user_profile_id", userUUId);
    if (deleteRelationError) {
      return res.status(400).json({ message: deleteRelationError.message });
    }
    const { data: deletehobbie, error: deletehobbieError } = await supabase
      .from("hobbie_interest")
      .delete()
      .eq("user_profile_id", userUUId);
    if (deletehobbieError) {
      return res.status(400).json({ message: deletehobbieError.message });
    }
    for (let i = 0; i < uploadPicArray.length; i++) {
      const imagePath = uploadPicArray[i];
      const path = imagePath.replace(
        "https://dlceurosjrzecltovrjb.supabase.co/storage/v1/object/public/images/",
        ""
      );
      const { data: deleteImgData, error: deleteImgDataError } =
        await supabase.storage.from("images").remove([path]);
      if (deleteImgDataError) {
        return res
          .status(400)
          .json({ messagedeleteimg: deleteImgDataError.message });
      }
    }
    const { error: deleteUserImageError } = await supabase
      .from("user_image")
      .delete()
      .eq("user_profile_id", userUUId);
    if (deleteUserImageError) {
      return res.status(400).json({ message: deleteUserImageError.message });
    }
    const { error: deleteRoleError } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userUUId);
    if (deleteRoleError) {
      return res.status(400).json({ message: deleteRoleError.message });
    }
    const { error: deleteMerryMatchError } = await supabase
      .from("merry_limit")
      .delete()
      .eq("user_id", userUUId);
    if (deleteMerryMatchError) {
      return res.status(400).json({ message: deleteMerryMatchError.message });
    }
    const { data: deleteUserProfile, error: deleteUserProfileError } =
      await supabase.from("user_profile").delete().eq("id", userId);
    if (deleteUserProfileError) {
      res.status(400).json({ message: deleteUserProfileError.error });
    }
    return res.json({
      message: "Delete account successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/merry-limit/:id", async (req, res) => {
  const userId = req.params.id;
  const { data, error } = await supabase
    .from("merry_limit")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    res.status(401).json({ message: error });
  }
  res.status(200).json(data);
});

userRouter.post("/merry-limit/:id", async (req, res) => {
  const userId = req.params.id;
  const { data, error } = await supabase
    .from("merry_limit")
    .update({ daily_limit: req.body.daily_limit })
    .eq("user_id", userId);

  if (error) {
    res.status(401).json({ message: error });
  }
  res.status(200).json(data);
});

export default userRouter;

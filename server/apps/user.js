import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { auth } from "../middleware/auth.js";
import sql from "../utils/db.js";
import multer from "multer";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.get("/", async (req, res) => {
  const userQuery = req.query.userId;

  const { data: user_profile, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", userQuery);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json({ user_profile });
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
      .from("user_complete_profile")
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
    } = req.body;
    const hobbiesInterestsArray = req.body.hobbiesInterests.split(",");
    const uploadPicArray = req.body.uploadedPicture.split(",");
    const deletePicArray = req.body.deletePictures;
    console.log("upload", uploadPicArray, "delete", deletePicArray);
    // const { data: user, error: userError } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });
    // if (userError) {
    //   return res.status(400).json({ message: userError.message });
    // }
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
      })
      .eq("user_id", userUUId)
      .select();
    if (profileError) {
      return res.status(400).json({ message: profileError.message });
    }
    const { data: racialData, error: racialDataError } = await supabase
      .from("racial_user_profile")
      .update([{ racial_id: racial }])
      .eq("user_profile_id", userId)
      .select();
    if (racialDataError) {
      return res.status(400).json({ message: racialDataError.message });
    }
    const { data: relationData, error: relationDataError } = await supabase
      .from("relation_interest_user_profile")
      .update([
        {
          relation_interest_id: meeting,
        },
      ])
      .eq("user_profile_id", userId)
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
      .eq("user_profile_id", userId)
      .select();
    if (hobbieDataError) {
      return res.status(400).json({ message: hobbieDataError.message });
    }
    // const urlArray = [];
    // for (let i = 0; i < req.files.length; i++) {
    //   const file = req.files[i];
    //   const fileExtension = file.originalname.split(".").pop();
    //   const fileName = `profile-${uuidv4()}.${fileExtension}`;
    //   const { data: ImageUpload, error: ImageUploadError } =
    //     await supabase.storage
    //       .from("images/profile")
    //       .upload(fileName, file.buffer, {
    //         contentType: file.mimetype,
    //       });
    //   if (ImageUploadError) {
    //     return res.status(400).json({ message: ImageUploadError.message });
    //   }
    //   const { data } = supabase.storage
    //     .from("images/profile")
    //     .getPublicUrl(fileName);
    //   urlArray.push(data.publicUrl);
    // }
    // const { data: userImage, error: userImageError } = await supabase
    //   .from("user_image")
    //   .insert([{ user_profile_id: userProfile[0].id, image_url: urlArray }])
    //   .select();
    // if (userImageError) {
    //   return res.status(400).json({ message: userImageError.message });
    // }
    return res.json({
      message: "Update complete",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// userRouter.post("/", async (req, res) => {
//   const message = req.body;

//   const { error } = await supabase.from("messages").insert({
//     conversation_id: message.conversation_id,
//     sender_id: message.sender_id,
//     message_text: message.message_text,
//   });

//   if (error) {
//     return res.status(500).json(error);
//   }

//   return res.status(200).json({ message: "Send message Complete" });
// });

export default userRouter;

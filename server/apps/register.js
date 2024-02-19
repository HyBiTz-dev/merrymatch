import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const registerRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

registerRouter.get("/data", async (req, res) => {
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

registerRouter.post(
  "/",
  upload.array("profilePictures", 5),
  async (req, res) => {
    try {
      const {
        email,
        password,
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
        age,
      } = req.body;
      const hobbiesInterestsArray = req.body.hobbiesInterests.split(",");
      const { data: user, error: userError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (userError) {
        return res.status(400).json({ message: userError.message });
      }
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
        .insert({
          name: name,
          gender_id: gender,
          country_city_id: countryCity[0].id,
          date_of_birth: dateOfBirth,
          user_id: user.user.id,
          gender_interest_id: genderInterests,
          username: username,
          age: age,
        })
        .select();
      if (profileError) {
        return res.status(400).json({ message: profileError.message });
      }
      const { data: racialData, error: racialDataError } = await supabase
        .from("racial_user_profile")
        .insert([{ user_profile_id: user.user.id, racial_id: racial }])
        .select();
      if (racialDataError) {
        return res.status(400).json({ message: racialDataError.message });
      }
      const { data: relationData, error: relationDataError } = await supabase
        .from("relation_interest_user_profile")
        .insert([
          {
            user_profile_id: user.user.id,
            relation_id: meeting,
          },
        ])
        .select();
      if (relationDataError) {
        return res.status(400).json({ message: relationDataError.message });
      }
      const { data: hobbieData, error: hobbieDataError } = await supabase
        .from("hobbie_interest")
        .insert([
          {
            user_profile_id: user.user.id,
            hobbie_interest_array: hobbiesInterestsArray,
          },
        ])
        .select();
      if (hobbieDataError) {
        return res.status(400).json({ message: hobbieDataError.message });
      }
      const urlArray = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const fileExtension = file.originalname.split(".").pop();
        const fileName = `profile-${uuidv4()}.${fileExtension}`;
        const { data: ImageUpload, error: ImageUploadError } =
          await supabase.storage
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
        urlArray.push(data.publicUrl);
      }
      const { data: userImage, error: userImageError } = await supabase
        .from("user_image")
        .insert([{ user_profile_id: user.user.id, image_url: urlArray }])
        .select();
      if (userImageError) {
        return res.status(400).json({ message: userImageError.message });
      }
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .insert({
          role_id: 2,
        })
        .select();
      if (roleError) {
        return res.status(400).json({ message: roleError.message });
      }
      return res.json({
        message: "SignUp complete",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);
export default registerRouter;

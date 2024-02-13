import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const registerRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

registerRouter.get("/country", async (req, res) => {
  try {
    let { data: countries, error } = await supabase.from("country").select("*");
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.json({ countries });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
registerRouter.get("/city", async (req, res) => {
  try {
    const { data: cities, error } = await supabase
      .from("country_city_view_2")
      .select("city_name,city_id")
      .eq("id", req.query.country_id);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ cities });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

registerRouter.get("/gender", async (req, res) => {
  try {
    let { data: gender, error } = await supabase.from("gender").select("*");
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.json({ gender });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

registerRouter.get("/racial", async (req, res) => {
  try {
    let { data: racial, error } = await supabase.from("racial").select("*");
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.json({ racial });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

registerRouter.get("/relation", async (req, res) => {
  try {
    let { data: relation_interest, error } = await supabase
      .from("relation_interest")
      .select("*");
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.json({ relation_interest });
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
        })
        .select();
      if (profileError) {
        return res.status(400).json({ message: profileError.message });
      }
      const { data: racialData, error: racialDataError } = await supabase
        .from("racial_user_profile")
        .insert([{ user_profile_id: userProfile[0].id, racial_id: racial }])
        .select();
      if (racialDataError) {
        return res.status(400).json({ message: racialDataError.message });
      }
      const { data: relationData, error: relationDataError } = await supabase
        .from("relation_interest_user_profile")
        .insert([
          {
            user_profile_id: userProfile[0].id,
            relation_interest_id: meeting,
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
            user_profile_id: userProfile[0].id,
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
        .insert([{ user_profile_id: userProfile[0].id, image_file: urlArray }])
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

import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const merryListRouter = Router();

merryListRouter.get("/", async (req, res) => {
  try {
    return res.send("merrylist");
  } catch (error) {
    return res.send("this error messages");
  }
});

merryListRouter.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    // let { data: user_profile, error } = await supabase
    //   .from("user_profile")
    //   .select("id")
    //   .eq("user_id", user_id);

    // const { data: received_profile, error } = await supabase
    //   .from("user_profile")
    //   .select("id")
    //   .eq("user_id", user_id);

    // let merryReceivedList = await supabase
    // .from("like_user")
    // .select("user_profile_id_received")
    // .eq("user_profile_id_given", user_profile_id_given);

    const { data, error } = await supabase
      .from("like_user")
      .select("user_profile_id_received")
      .eq("user_profile_id_given", user_id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    // const userProfileData = user_profile[0];
    // return res.json({ userProfileData });
    const received_ids = data.map((item) => item.user_profile_id_received);

    // const receivedUserProfile = await supabase
    //   .from("user_profile")
    //   .select("name, date_of_birth")
    //   .in("user_id", received_ids);

    const allLikeUser = await supabase
      .from("like_user")
      .select("user_profile_id_given, user_profile_id_received");

    const matchedUser = await supabase
      .from("like_user")
      .select("user_profile_id_given, user_profile_id_received")
      .eq("user_profile_id_received", user_id);

    const matchedUser_ids = matchedUser.data.map(
      (item) => item.user_profile_id_given
    );

    const receivedUserProfile = await supabase
      .from("user_complete_profile")
      .select(
        `name, age,
        city:city_id(name),
        country:country_id(country_name),
        gender:gender_id (name),
        gender_interest_id:gender_interest_id (name),
        racial:racial_id(name),
        relation_interest_id:relation_interest(name),
        image_url:user_image(image_url)
        `
      )
      .in("user_id", received_ids, matchedUser_ids);

    // const received_id = data;
    return res.json({
      received_ids,
      receivedUserProfile,
      matchedUser_ids,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

merryListRouter.get("/:user_id/package", async (req, res) => {
  const { user_id } = req.params;
  try {
    let { data: limit, error } = await supabase
      .from("user_profile")
      .select(
        `package_id,
      packages:package_id(merry_limit)
      `
      )
      .eq("user_id", user_id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const packageLimit = limit[0];
    return res.json({ packageLimit });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// merryListRouter.get("/likeuser", async (req, res) => {
//   try {
//     let { data: like_user, error } = await supabase
//       .from("like_user")
//       .select("*");
//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }
//     const likeUserData = { like_user };
//     return res.json({ likeUserData });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

export default merryListRouter;

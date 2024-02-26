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
    const { data, error } = await supabase
      .from("like_user")
      .select("user_profile_id_received, created_at")
      .eq("user_profile_id_given", user_id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const received_ids = data.map((item) => item.user_profile_id_received);

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

    // const receivedUserProfile = await supabase
    //   .from("user_profile_view")
    //   .select(
    //     `user_id, name, age,
    //     city:city_id(name),
    //     country:country_id(country_name),
    //     gender:gender_id (name),
    //     gender_interest_id:gender_interest_id (name),
    //     racial:racial_id(name),
    //     relation_id:relation_interest(name),
    //     image_url:user_image(image_url)
    //     `
    //   )
    //   .in("user_id", received_ids, matchedUser_ids);

    const receivedUserProfile = await supabase
      .from("user_profile_view")
      .select("*")
      .in("user_id", received_ids, matchedUser_ids);

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

merryListRouter.delete("/:user_id/delete", async (req, res) => {
  const { user_id } = req.params;
  const receivedIds = req.query.receivedIds;
  const chatId = req.query.chatId;

  try {
    const { data } = await supabase
      .from("like_user")
      .select("id")
      .eq("user_profile_id_given", user_id)
      .eq("user_profile_id_received", receivedIds);

    if (data.length === 0) {
      return res.status(404).json({ message: "id not found" });
    }
    const deleteId = data[0].id;
    await supabase.from("like_user").delete().eq("id", deleteId);

    if (chatId) {
      await supabase.from("messages").delete().eq("conversation_id", chatId);
      await supabase.from("conversation").delete().eq("id", chatId);
    }

    return res.json({ message: "Unmerry Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

merryListRouter.post("/", async (req, res) => {
  const { user_id, receivedIds } = req.body;

  try {
    const { data, error } = await supabase.from("like_user").insert({
      user_profile_id_given: user_id,
      user_profile_id_received: receivedIds,
    });
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({ message: "Merry Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

merryListRouter.post("/:user_id/merrytoday", async (req, res) => {
  const { user_id } = req.params;
  const { today } = req.body;
  try {
    let { data: merryTodayListArray, error } = await supabase
      .from("like_user")
      .select("user_profile_id_received")
      .eq("user_profile_id_given", user_id)
      .gte("created_at", today);

    const merryTodayList = merryTodayListArray.map(
      (item) => item.user_profile_id_received
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.json({ merryTodayList });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default merryListRouter;

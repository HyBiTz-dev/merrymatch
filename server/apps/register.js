import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const registerRouter = Router();

registerRouter.get("/country", async (req, res) => {
  try {
    let { data: countries, error } = await supabase.from("country").select("*");
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const country_name = countries.map((array) => array.country_name);
    return res.json({ country_name });
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
    const gender_name = gender.map((array) => array.name);
    return res.json({ gender_name });
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
    const racial_name = racial.map((array) => array.name);
    return res.json({ racial_name });
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
    const relation_name = relation_interest.map((array) => array.name);
    return res.json({ relation_name });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

registerRouter.post("/", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      dateOfBirth,
      location,
      city,
      username,
      gender,
      genderInterests,
      racial,
      meeting,
      hobbiesInterests,
      profilePictures,
    } = req.body;
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { data, error: profileError } = await supabase
      .from("user_profile")
      .insert({
        user_name: name,
        date_of_birth: dateOfBirth,
        gender_id: gender,
        location_id: location,
      })
      .select();
    if (profileError) {
      return res.status(400).json({ message: profileError.message });
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
});
export default registerRouter;

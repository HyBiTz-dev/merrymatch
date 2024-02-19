import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
const authRouter = Router();

authRouter.post("/", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });
    if (error) {
      console.error("Login error:", error.message);
      return res
        .status(400)
        .json({ error: "The email address or password is incorrect." });
    } else {
      const { data: user_roles_view } = await supabase
        .from("user_roles_view")
        .select("roles")
        .eq("user_id", data.user.id);

      const { data: user_complete_profile } = await supabase
        .from("user_complete_profile")
        .select("*")
        .eq("user_id", data.user.id);

      let role = user_roles_view[0].roles[0];

      const token = jwt.sign(
        {
          id: data.user.id,
          email: data.user.email,
          name:
            user_complete_profile[0]?.name === null
              ? null
              : user_complete_profile[0]?.name,
          username:
            user_complete_profile[0]?.username === null
              ? null
              : user_complete_profile[0]?.username,
          proflie_images:
            user_complete_profile[0]?.image_url === null
              ? null
              : user_complete_profile[0]?.image_url[0],
          role: role,
        },
        process.env.SUPABASE_JWT_SECRET,
        {
          expiresIn: data.session.expires_in,
        }
      );

      // // Decode token
      // const decodedToken = jwtDecode(token);

      // // แสดงข้อมูลใน token
      // console.log(decodedToken);
      return res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.error("Unexpected error during login:", error.message);
    res.status(500).json({ error: "Unexpected error during login" });
  }
});

export default authRouter;

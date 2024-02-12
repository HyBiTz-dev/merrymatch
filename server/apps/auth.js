import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";

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
      // const user = await supabase
      //   .from("users")
      //   .select()
      //   .eq("email", email)
      //   .single();

      const { data: user_roles_view } = await supabase
        .from("user_roles_view")
        .select("roles")
        .eq("user_id", data.user.id);

      let role = user_roles_view[0].roles[0];

      const token = jwt.sign(
        { id: data.user.id, email: data.user.email, role: role },
        process.env.SUPABASE_JWT_SECRET,
        {
          expiresIn: data.session.expires_in,
        }
      );

      return res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.error("Unexpected error during login:", error.message);
    res.status(500).json({ error: "Unexpected error during login" });
  }
});

export default authRouter;

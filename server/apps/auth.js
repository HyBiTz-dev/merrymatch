import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return res
        .status(400)
        .json({ error: "The email address or password is incorrect." });
    } else {
      console.log("Login successful:", data);

      const user = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();
      const userRoles = await supabase
        .from("user_roles_view")
        .select("roles")
        .eq("user_id", user.id)
        .single();

      let redirectPath = "/";
      if (userRoles.roles[0] === "Admin") {
        redirectPath = "/admintest";
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3600000",
      });

      res.status(200).json({ token, redirectPath });
    }
  } catch (error) {
    console.error("Unexpected error during login:", error.message);
    res.status(500).json({ error: "Unexpected error during login" });
  }
});

export default authRouter;

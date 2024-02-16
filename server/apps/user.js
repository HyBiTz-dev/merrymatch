import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { auth } from "../middleware/auth.js";
import sql from "../utils/db.js";

const userRouter = Router();

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

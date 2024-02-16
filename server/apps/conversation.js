import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const conversationRouter = Router();

conversationRouter.get("/:userId", async (req, res) => {
  let { data: conversation, error } = await supabase
    .from("conversation")
    .select("*")
    .or(
      `sender_id.eq.${req.params.userId},receiver_id.eq.${req.params.userId}`
    );
  if (error) {
    return res.json({ message: error });
  }

  return res.json({ conversation });
});

conversationRouter.post("/", async (req, res) => {
  const { data, error } = await supabase
    .from("conversation")
    .insert([
      { sender_id: req.body.sender_id, receiver_id: req.body.receiver_id },
    ])
    .select();

  if (error) {
    return res.json({ message: error });
  }

  return res.json({ data: data });
});

export default conversationRouter;

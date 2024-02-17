import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { auth } from "../middleware/auth.js";

const messagesRouter = Router();

// messagesRouter.use(auth);

messagesRouter.get("/:conversationId", async (req, res) => {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", req.params.conversationId);

  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json({ messages, error });
});

messagesRouter.post("/", async (req, res) => {
  const message = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      message_text: message.message_text,
    })
    .select();
  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data);
});

export default messagesRouter;

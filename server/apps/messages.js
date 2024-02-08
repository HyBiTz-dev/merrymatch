import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { auth } from "../middleware/auth.js";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("messages").select("*");
    console.log(data);
    return res.send({ data });
  } catch (error) {
    console.log({ error });
    return res.send({ error });
  }
});

messagesRouter.post("/", auth, async (req, res) => {
  const data = req.body;

  const { error } = await supabase
    .from("messages")
    .insert({ content: data.content });

  if (error) {
    return res.json({ messages: error });
  }
  return res.json({ messages: "Send messages success" });
});

export default messagesRouter;

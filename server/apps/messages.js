import { Router } from "express";
import { supabase } from "../utils/db.js";

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

export default messagesRouter;

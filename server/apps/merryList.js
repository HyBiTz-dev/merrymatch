import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const merryListRouter = Router();

authRouter.get("/", async (req, res) => {
  try {
    return res.send("merrylist");
  } catch (error) {
    return res.send("this error messages");
  }
});

export default merryListRouter;

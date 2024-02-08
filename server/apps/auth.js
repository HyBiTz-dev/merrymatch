import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const authRouter = Router();

authRouter.get("/", async (req, res) => {
  try {
    return res.send("hello login");
  } catch (error) {
    return res.send("this error messages");
  }
});

export default authRouter;

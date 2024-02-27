import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import { supabase } from "../utils/supabaseClient.js";

const transactionRouter = Router();

transactionRouter.get("/", (req, res) => {
  return res.json("get transaction");
});
export default transactionRouter;

import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const complaintRouter = Router();

complaintRouter.post("/submit", async (req, res) => {
  const { userId, userName, issue, description } = req.body;

  try {
    console.log("Received request:", req.body);

    const { data, error } = await supabase.from("user_complaint").upsert({
      user_id: userId,
      user_name: userName,
      complaint_issue: issue,
      complaint_description: description,
    });

    if (error) {
      console.error("Error submitting complaint to Supabase:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Successfully submitting complaint to supabase.");
    return res.status(200).json({ success: "Success" });
  } catch (error) {
    console.error("Error submitting complaint to Supabase:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

complaintRouter.get("/admin/complaint-list", async (req, res) => {
  try {
    const { data, error } = await supabase.from("user_complaint").select("*");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Supabase:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default complaintRouter;

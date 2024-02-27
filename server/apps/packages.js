import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const packagesRouter = Router();

packagesRouter.post("/", async (req, res) => {
  const { packageName, price, merryLimit, packageIcon, details } = req.body;
  if (!packageName || price < 1 || !merryLimit || !packageIcon || !details) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }
  try {
    const data = {
      name: packageName,
      price,
      package_icon: packageIcon,
      merry_limit: merryLimit,
      details,
    };
    const { error } = await supabase.from("packages").insert(data);
    if (error) {
      throw error;
    } else {
      res
        .status(201)
        .json({ message: "package has been created successfully" });
    }
  } catch (error) {
    console.error("Error creating package:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

packagesRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { packageName, price, merryLimit, packageIcon, details } = req.body;
  if (!packageName || price < 1 || !merryLimit || !packageIcon || !details) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }
  try {
    const data = {
      name: packageName,
      price,
      package_icon: packageIcon,
      merry_limit: merryLimit,
      details,
    };
    const { error } = await supabase.from("packages").update(data).eq("id", id);
    if (error) throw error;
    res.json({ message: "Package has been updated" });
  } catch (error) {
    console.error("Error updating package:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

packagesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Package has deleted" });
  } catch (error) {
    console.log(error);
    console.error("Error deleting package:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

packagesRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("packages").select("*");
    console.log(data);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

packagesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .match({ id });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

export default packagesRouter;

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
    console.error("Error deleting package:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

packagesRouter.get("/", async (req, res) => {
  const query = req.query.search;
  try {
    if (query) {
      const { data, error } = await supabase.from("packages").select("*");
      const result = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      if (error) throw error;
      res.json(result);
    } else {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("index_number", { ascending: true });

      if (error) throw error;
      res.json(data);
    }
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

packagesRouter.put("/", async (req, res) => {
  const result = JSON.parse(req.body.data);
  try {
    for (let i = 0; i < result.length; i++) {
      const { data, error } = await supabase
        .from("packages")
        .update({ index_number: i + 1 })
        .eq("name", result[i].name);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

export default packagesRouter;

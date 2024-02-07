import { Router } from "express";
import { supabase } from "../utils/db.js";
import { allPackages } from "../data/packages.js";

const packagesRouter = Router();

packagesRouter.get("/", (req, res) => {
  res.json(allPackages);
});

packagesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const packages = allPackages.find((p) => p.id == id);
  if (!packages) {
    res.status(404).json({ error: "Package not found" });
  } else {
    res.json(packages);
  }
});

export default packagesRouter;

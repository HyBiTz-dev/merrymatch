import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";

const userRouter = Router();

userRouter.get("/data", async (req, res) => {
  const { dataType, country_id } = req.query;

  try {
    let data, error;
    switch (dataType) {
      case "country":
        ({ data, error } = await supabase.from("country").select("*"));
        break;
      case "city":
        if (!country_id) {
          return res
            .status(400)
            .json({ message: "Country ID is required for cities." });
        }
        ({ data, error } = await supabase
          .from("country_city_view_2")
          .select("city_name,city_id")
          .eq("id", country_id));
        break;
      case "gender":
        ({ data, error } = await supabase.from("gender").select("*"));
        break;
      case "racial":
        ({ data, error } = await supabase.from("racial").select("*"));
        break;
      case "relation":
        ({ data, error } = await supabase
          .from("relation_interest")
          .select("*"));
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid data type requested." });
    }

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json({ [dataType]: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { data: userData, error } = await supabase
      .from("user_complete_profile")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// userRouter.delete("/delete_image", async (req, res) => {
//   const { imagePath } = req.body;

//   if (!imagePath) {
//     return res.status(400).json({ message: "Image path is required." });
//   }

//   try {
//     const path = imagePath.replace(
//       "https://dlceurosjrzecltovrjb.supabase.co/storage/v1/object/public/",
//       ""
//     );

//     const { error } = await supabase.storage
//       .from("images/profile")
//       .remove([path]);

//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }

//     return res.status(200).json({ message: "Image deleted successfully." });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

export default userRouter;

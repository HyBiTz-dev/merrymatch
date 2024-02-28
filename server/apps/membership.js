import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import { supabase } from "../utils/supabaseClient.js";

const membershipRouter = Router();

membershipRouter.get("/:id", async (req, res) => {
  const userProfileId = req.params.id;

  const getPackageFromUser = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profile")
        .select("package_id")
        .eq("user_id", userProfileId);
      const package_id = data[0].package_id;
      return package_id;
    } catch (error) {
      return res.json(error);
    }
  };
  const getPackageDetails = async (package_id) => {
    let result;
    try {
      const { data, error } = await supabase
        .from("packages")
        .select()
        .eq("id", package_id);
      result = data[0];

      return result;
    } catch (error) {}
  };
  const getPaymentMethod = async (userProfileId) => {
    let result;
    try {
      const { data, error } = await supabase
        .from("customer")
        .select("payment_method")
        .eq("user_profile_id", userProfileId);
      result = data[0];
      return result;
    } catch (error) {}
  };
  try {
    let package_id = await getPackageFromUser();
    let packageData = await getPackageDetails(package_id);
    let paymentMethod = await getPaymentMethod(userProfileId);

    return res.json({ package: packageData, payment: paymentMethod });
  } catch (error) {
    console.log(error);
  }

  return res.json("get transaction");
});
export default membershipRouter;

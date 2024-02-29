import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import { supabase } from "../utils/supabaseClient.js";

const transactionRouter = Router();
const transDate = (date) => {
  let newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  day = editDayLowerTen(day);
  month = editDayLowerTen(month);
  let result = `${day}/${month}/${year}`;
  return result;
};
const transNextBill = (date) => {
  let newDate = new Date(date);
  let day = newDate.getDate();
  let month = newDate.getMonth() + 2;
  let year = newDate.getFullYear();

  day = editDayLowerTen(day);
  month = editDayLowerTen(month);
  let result = `${day}/${month}/${year}`;
  return result;
};
const editDayLowerTen = (number) => {
  let result;
  if (number < 10) {
    result = "0" + number;
  } else {
    result = number;
  }
  return result;
};
const transPrice = (price) => {
  let float = parseFloat(price / 100).toFixed(2);
  let stringPrice = float.toString();
  return stringPrice;
};
transactionRouter.get("/:id", async (req, res) => {
  const user_profile_id = req.params.id;
  let result = [];
  const { data, error } = await supabase
    .from("transaction")
    .select("created_at,package_price")
    .eq("user_profile_id", user_profile_id)
    .order("created_at", { ascending: false });
  result = [...data];

  result.map((item) => {
    item.nextBill = transNextBill(item.created_at);
    item.created_at = transDate(item.created_at);
    item.package_price = transPrice(item.package_price);
  });
  console.log(result);

  return res.json(result);
});
export default transactionRouter;

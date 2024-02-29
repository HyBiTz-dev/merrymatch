import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import { supabase } from "../utils/supabaseClient.js";

const payment1Router = Router();
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

payment1Router.get("/", (req, res) => {
  return res.json("test");
});

payment1Router.post("/create-payment1", express.json(), async (req, res) => {
  const { user, product } = req.body;
  const userProfileId = user.id;
  const userProfileName = user.name;
  const userProfileEmail = user.email;
  const productName = product.name;
  const productPrice = product.price;
  const productId = product.id;
  let newCustomer;
  let paymentData;
  const card = [
    "pm_card_visa",
    "pm_card_visa_debit",
    "pm_card_mastercard",
    "pm_card_mastercard_debit",
    "pm_card_visa_chargeDeclined",
  ];

  const haveUserProfileId = async () => {
    let alreadyProfileId;
    try {
      const { data, error } = await supabase
        .from("customer")
        .select("*")
        .eq("user_profile_id", userProfileId)
        .limit(1);

      alreadyProfileId = data.length == 0 ? false : true;

      if (alreadyProfileId) {
        const { data, error } = await supabase
          .from("customer")
          .select("customer_id")
          .eq("user_profile_id", userProfileId);
        let queryData = data[0].customer_id;
        if (queryData == null) {
          const customer = await stripe.customers.create({
            name: `${userProfileName}`,
            email: `${userProfileEmail}`,
          });
          newCustomer = customer.id;
          addCustomerId(newCustomer);
        }
        newCustomer = queryData;
      } else {
        const { data, error } = await supabase
          .from("customer")
          .insert({ user_profile_id: userProfileId })
          .select();
        const customer = await stripe.customers.create({
          name: `${user.name}`,
          email: `${user.email}`,
        });
        newCustomer = customer.id;
        addCustomerId(newCustomer);
      }
    } catch (error) {}

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method: `${card[1]}`,
        confirm: true,
        amount: `${productPrice}`,
        currency: "thb",
        payment_method_types: ["card"],
        description: `${productName}`,
        customer: `${newCustomer}`,
      });
      paymentData = paymentIntent;
      const { error } = await supabase
        .from("customer")
        .update({ payment_method: card[2] })
        .eq("customer_id", newCustomer);
    } catch (error) {
      return res.status(400).json(error);
    }

    if (paymentData.status === "succeeded") {
      try {
        const { data, error } = await supabase
          .from("user_profile")
          .update({ package_id: productId })
          .eq("user_id", userProfileId)
          .select();

        const resultRecord = await addTransaction(
          data[0],
          newCustomer,
          product
        );

        const merryLimitRecord = await updateMerryLimit(data[0], product);

        return res.json({
          status: paymentData.status,
          date: resultRecord.created_at,
        });
      } catch (error) {}
    } else {
      return res.json("");
    }
  };

  const addCustomerId = async (newCustomer) => {
    const { data, error } = await supabase
      .from("customer")
      .update({ customer_id: newCustomer })
      .eq("user_profile_id", userProfileId)
      .select();
  };

  const addTransaction = async (userProfileData, newCustomer, product) => {
    const createDate = new Date();
    let resultRecord;
    try {
      const { data, error } = await supabase
        .from("transaction")
        .insert({
          created_at: createDate,
          customer_id: newCustomer,
          user_profile_id: userProfileData.user_id,
          package_id: product.id,
          package_name: product.name,
          package_price: parseFloat(product.price).toFixed(2),
        })
        .select();
      resultRecord = data;
      return resultRecord[0];
    } catch (error) {}
  };

  const updateMerryLimit = async (userProfileData, product) => {
    let user_id = userProfileData.user_id;
    let package_id = product.id;
    let merry_limit;
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("merry_limit")
        .eq("id", package_id);
      merry_limit = data[0].merry_limit;
    } catch (error) {}
    try {
      const { error } = await supabase
        .from("merry_limit")
        .update({ max_merry_limit: merry_limit })
        .eq("user_id", user_id);
    } catch (error) {}
  };

  haveUserProfileId();
});

export default payment1Router;

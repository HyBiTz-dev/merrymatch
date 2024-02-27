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
      console.log(data);
      console.log(Array.isArray(data));
      console.log(data.length);
      alreadyProfileId = data.length == 0 ? false : true;

      //alreadyProfileId = Object.keys(queryData).length;
      if (alreadyProfileId) {
        console.log(
          `user_profile_id : ${userProfileId}  has been already in custom table`
        );
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
        console.log("not found user_profile_id customer table");
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
    } catch (error) {
      console.log(error);
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method: `${card[2]}`,
        confirm: true,
        amount: `${productPrice}`,
        currency: "thb",
        payment_method_types: ["card"],
        description: `${productName}`,
        customer: `${newCustomer}`,
      });
      paymentData = paymentIntent;
    } catch (error) {
      return res.status(400).json(error);
    }
    console.log(paymentData);
    if (paymentData.status === "succeeded") {
      try {
        const { data, error } = await supabase
          .from("user_profile")
          .update({ package_id: productId })
          .eq("user_id", userProfileId)
          .select();
        console.log(data);
        return res.json(paymentData.status);
      } catch (error) {
        console.log(error);
      }
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
    console.log(`Add customer :`, data);
  };

  haveUserProfileId();
});

export default payment1Router;

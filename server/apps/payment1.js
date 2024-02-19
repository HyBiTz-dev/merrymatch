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
  let newCustomer;
  let queryData;
  let paymentData;
  const card = [
    "pm_card_visa",
    "pm_card_visa_debit",
    "pm_card_mastercard",
    "pm_card_mastercard_debit",
  ];

  const haveUserProfileId = async () => {
    let alreadyProfileId;
    try {
      const { data, error } = await supabase
        .from("customer")
        .select("*")
        .eq("user_profile_id", userProfileId);
      queryData = data[0];
      newCustomer = queryData.customer_id;
      alreadyProfileId = Object.keys(queryData).length;
      if (alreadyProfileId) {
        console.log("user_profile_id has been already in custom table");
        const { data, error } = await supabase
          .from("customer")
          .select("customer_id")
          .eq("user_profile_id", userProfileId);
        queryData = data[0].customer_id;
        if (queryData == null) {
          const customer = await stripe.customers.create({
            name: `${user.name}`,
            email: `${user.email}`,
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
        amount: `${product.price}`,
        currency: "thb",
        payment_method_types: ["card"],
        description: `${product.name}`,
        customer: `${newCustomer}`,
      });
      paymentData = paymentIntent;
    } catch (error) {
      console.log(error);
    }
    return res.json(paymentData);
  };

  const addCustomerId = async (newCustomer) => {
    const { data, error } = await supabase
      .from("customer")
      .update({ customer_id: newCustomer })
      .eq("user_profile_id", userProfileId)
      .select();
    console.log(data);
  };

  haveUserProfileId();
});

export default payment1Router;
